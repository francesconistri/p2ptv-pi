import os
import json
import psutil

import tornado.web
import tornado.template

import conf

sopcast_process = None
mplayer_process = None


def filtered_processes(*terms):
    for proc in psutil.process_iter():
        for term in terms:
            try:
                if term in proc.name():
                    yield proc
                    break
            except psutil.NoSuchProcess:
                continue


def killgrep(*terms):
    for proc in filtered_processes(*terms):
        proc.kill()


class ConfigHandler(tornado.web.RequestHandler):

    def get(self):
        self.finish({
            'DEFAULT_STREAMING_PORT': conf.DEFAULT_STREAMING_PORT,
            'DEFAULT_STREAMING_HOST': conf.DEFAULT_STREAMING_HOST,
            'DEFAULT_COMMUNICATION_PORT': conf.DEFAULT_COMMUNICATION_PORT,
        })


class ProcessHandler(tornado.web.RequestHandler):
        PROCESS_TERMS = NotImplemented

        def get_global_process(self):
            raise NotImplementedError

        def set_global_process(self, proc):
            raise NotImplementedError

        def get(self):
            proc = self.get_global_process()
            if proc:
                return self.finish(proc.as_dict())
            for proc in filtered_processes(*self.PROCESS_TERMS):
                return self.finish(proc.as_dict())
            self.finish({})

        def post(self):
            self._delete()
            # TODO: run sopcast
            proc = psutil.Popen(self.get_command())
            self.set_global_process(proc)
            self.finish(proc.as_dict())

        def _delete(self):
            proc = self.get_global_process()
            if proc:
                proc.kill()
            else:
                killgrep(*self.PROCESS_TERMS)
            self.set_global_process(None)

        def delete(self):
            self._delete()
            self.finish({'status': 'ok'})

        def get_command(self):
            raise NotImplementedError


class SopcastHandler(ProcessHandler):

    PROCESS_TERMS = ['qemu', 'sopcast']

    def get_global_process(self):
        global sopcast_process
        return sopcast_process

    def set_global_process(self, proc):
        global sopcast_process
        sopcast_process = proc
        return sopcast_process

    def get_args(self):
        data = json.loads(self.request.body)
        params = ['url', 'stream_port', 'com_port']
        args = {k: data.get(k) or None for k in params}
        assert args['url']
        args['stream_port'] = args['stream_port'] or conf.DEFAULT_STREAMING_PORT
        args['com_port'] = args['com_port'] or conf.DEFAULT_COMMUNICATION_PORT
        return args

    def get_command(self):
        args = self.get_args()
        cmds = [
            os.path.join(conf.BASE_PATH, '..', 'sopcast/qemu-i386'),
            os.path.join(conf.BASE_PATH, '..', 'sopcast/lib/ld-linux.so.2'),
            '--library-path',
            os.path.join(conf.BASE_PATH, '..', 'sopcast/lib'),
            os.path.join(conf.BASE_PATH, '..', 'sopcast/sp-sc-auth'),
            args['url'],
            str(args['sopcast_port']),
            str(args['streaming_port'])
        ]
        return cmds


class MplayerHandler(ProcessHandler):

    PROCESS_TERMS = ['omxplayer', 'mplayer']

    def get_global_process(self):
        global mplayer_process
        return mplayer_process

    def set_global_process(self, proc):
        global mplayer_process
        mplayer_process = proc
        return mplayer_process

    def get_command(self):

        cmds = [
            'omxplayer',
            '--audio_fifo',
            '10',
            '--video_fifo',
            '1',
            '--audio_queue',
            '1',
            '--video_queue',
            '1',
            self.get_body_argument('url') or 'http://{host}:{port}/tv.asf'.format(host=conf.DEFAULT_STREAMING_HOST,
                                                                                  port=conf.DEFAULT_STREAMING_PORT),
        ]
        return cmds

handlers = (
    (r'/()', tornado.web.StaticFileHandler, {'path': os.path.join(conf.TEMPLATES_ROOT, 'index.html')}),
    (r'/api/config', ConfigHandler),
    (r'/api/sopcast', SopcastHandler),
    (r'/api/mplayer', MplayerHandler),
    (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': conf.STATIC_ROOT}),
)
