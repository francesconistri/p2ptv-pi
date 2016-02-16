import argparse


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', '-p', default=8000, type=int,
                        help='Start the streaming server on this port')
    parser.add_argument('--bind', '-b', default='0.0.0.0', type=str,
                        help='Binding address')
    parser.add_argument('--debug', default=True, type=bool,
                        help='Start the server in debug mode')
    return parser.parse_args()


if __name__ == "__main__":
    import tornado
    from handlers import handlers
    args = get_args()
    application = tornado.web.Application(handlers=handlers, debug=args.debug,
                                          autoreload=args.debug)
    application.listen(port=args.port, address=args.bind)
    tornado.ioloop.IOLoop.instance().start()
