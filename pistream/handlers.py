import os
import json
import psutil

import tornado.web
import tornado.template

import conf


def filtered_processes(*terms):
    for proc in psutil.process_iter():
        for term in terms:
            try:
                if term in proc.name():
                    yield proc
                    break
            except psutil.NoSuchProcess:
                continue


class SopcastHandler(tornado.web.RequestHandler):

    def post(self):
        url = json.loads(self.request.body).get('url')
        for proc in filtered_processes('sc-sp', 'sopcast', 'qemu', 'mplayer'):
            proc.kill()

        self.finish({'url': url})


class ProcessRootHandler(tornado.web.RequestHandler):

    def get(self):
        response = {
            'processes': []
        }
        for proc in filtered_processes('sc-sp', 'sopcast', 'qemu', 'mplayer'):
            if self.is_python(proc):
                response['processes'].append(proc.as_dict(['cmdline']))
        self.finish(response)

    def is_python(self, proc):
        try:
            return 'python' in proc.name()
        except psutil.NoSuchProcess:
            return False


class ProcessHandler(tornado.web.RequestHandler):

    def get(self, pid):
        pid = int(pid)
        process = psutil.Process(pid)
        self.finish(process.as_dict())


handlers = (
    (r'/()', tornado.web.StaticFileHandler, {'path': os.path.join(conf.TEMPLATES_ROOT, 'index.html')}),
    (r'/api/process/?', ProcessRootHandler),
    (r'/api/process/([0-9]+)', ProcessHandler),
    (r'/api/sopcast', SopcastHandler),
    (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': conf.STATIC_ROOT}),
)
