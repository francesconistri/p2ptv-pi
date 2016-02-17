import os
import psutil

import tornado.web
import tornado.template

import conf


class SopcastHandler(tornado.web.RequestHandler):
    pass


class ProcessRootHandler(tornado.web.RequestHandler):

    def get(self):
        response = {
            'processes': []
        }
        for proc in psutil.process_iter():
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
