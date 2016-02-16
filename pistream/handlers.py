import tornado.web
import circus.process

import conf


class IndexHandler(tornado.web.RequestHandler):

    def get(self):
        self.finish({'status': 'ok'})


class SopcastHandler(tornado.web.RequestHandler):

    def get(self):
        pass

    def get_process(self):
        cmd = ''
        process = circus.process.Process('sopcast')


handlers = (
    (r'/', IndexHandler),
    (r'/api/sopcast', IndexHandler),
    (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': conf.STATIC_ROOT}),
)
