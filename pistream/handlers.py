import os
import psutil

import tornado.web
import tornado.template

import conf

loader = tornado.template.Loader(os.path.join(conf.BASE_PATH, 'templates'))


class IndexHandler(tornado.web.RequestHandler):

    def get(self):
        self.finish(loader.load('index.html').generate())


class SopcastHandler(tornado.web.RequestHandler):
    pass


class ProcessRootHandler(tornado.web.RequestHandler):

    def get(self):
        response = {
            'contents': []
        }
        for proc in psutil.process_iter():
            response['contents'].append(proc.as_dict())
        self.finish(response)


class ProcessHandler(tornado.web.RequestHandler):

    def get(self, pid):
        pid = int(pid)
        process = psutil.Process(pid)
        self.finish(process.as_dict())


handlers = (
    (r'/', IndexHandler),
    (r'/api/process', ProcessRootHandler),
    (r'/api/process/([0-9]+)', ProcessHandler),
    (r'/api/sopcast', SopcastHandler),
    (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': conf.STATIC_ROOT}),
)
