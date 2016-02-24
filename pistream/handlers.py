import os
import json
import psutil

import tornado.web
import tornado.process
import tornado.template

import anydbm

import conf

sopcast_process = None
mplayer_process = None

pistream_db = anydbm.open(conf.DB_PATH, 'c')


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


class SopcastUrlHandler(tornado.web.RequestHandler):

    def get(self):

        self.finish({
            'data': [{'url': url, 'name': name}
                     for url, name in pistream_db.iteritems()]
        })


class ProcessHandler(tornado.web.RequestHandler):
        PROCESS_TERMS = NotImplemented

        def get_response(self, processes):
            return {
                'processes': [p.as_dict(['pid', 'cmdline']) for p in processes]
            }

        def get(self):
            response = self.get_response(filtered_processes(*self.PROCESS_TERMS))
            return self.finish(response)

        def post(self):
            killgrep(*self.PROCESS_TERMS)
            tornado.process.Subprocess(self.get_command())
            return self.finish({})

        def delete(self):
            killgrep(*self.PROCESS_TERMS)
            return self.finish({})

        def get_command(self):
            raise NotImplementedError


class SopcastHandler(ProcessHandler):

    PROCESS_TERMS = ['qemu', 'sopcast']

    def get_args(self):
        data = json.loads(self.request.body)
        params = ['url', 'streaming_port', 'sopcast_port']
        args = {k: data.get(k) or None for k in params}
        assert args['url']
        args['streaming_port'] = args['streaming_port'] or conf.DEFAULT_STREAMING_PORT
        args['sopcast_port'] = args['sopcast_port'] or conf.DEFAULT_COMMUNICATION_PORT
        return args

    def get_command(self):
        args = self.get_args()
        pistream_db[str(args['url'])] = str(args['url'])
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

    def get_command(self):
        data = json.loads(self.request.body)
        url = (
            data.get('mplayer_url', None) or
            'http://{host}:{port}/tv.asf'.format(host=conf.DEFAULT_STREAMING_HOST,
                                                 port=conf.DEFAULT_STREAMING_PORT)
        )
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
            url,
        ]
        return cmds


class KillHandler(tornado.web.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        pid = data.get('pid')
        if not pid:
            return self.finish({})
        try:
            psutil.Process(pid).kill()
        except psutil.NoSuchProcess:
            pass
        self.finish({})

handlers = (
    (r'/()', tornado.web.StaticFileHandler, {'path': os.path.join(conf.TEMPLATES_ROOT, 'index.html')}),
    (r'/api/config', ConfigHandler),
    (r'/api/sopcast', SopcastHandler),
    (r'/api/sopcast/url', SopcastUrlHandler),
    (r'/api/mplayer', MplayerHandler),
    (r'/api/kill', KillHandler),
    (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': conf.STATIC_ROOT}),
)
