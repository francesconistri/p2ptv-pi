import os
import argparse
import urlparse
import subprocess

BASEDIR = os.path.dirname(os.path.abspath(__file__))


def url_type(uri):
    u = uri.strip()
    if not u:
        raise TypeError('Invalid uri: ', uri)
    u = urlparse.urlsplit(uri)
    if u.scheme.lower() not in ('http', 'https', 'sop'):
        raise TypeError('Invalid uri: ', uri)
    return u.geturl()


def get_sopcast_command(args):
    cmds = [
        os.path.join(BASEDIR, 'sopcast/qemu-i386'),
        os.path.join(BASEDIR, 'sopcast/lib/ld-linux.so.2'),
        '--library-path',
        os.path.join(BASEDIR, 'sopcast/lib'),
        os.path.join(BASEDIR,  'sopcast/sp-sc-auth'),
        args.uri,
        str(args.sopcast_port),
        str(args.streaming_port)
    ]

    return cmds


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--version', help='Show version')
    parser.add_argument('--streaming-port', default=3333, type=int,
                        help='Start the streaming server on this port')
    parser.add_argument('--sopcast-port', default=10100, type=int,
                        help='Start the streaming server on this port')
    parser.add_argument('uri', help='The uri of the sopcast/acestream channel',
                        type=url_type)
    return parser.parse_args()


def main():
    args = get_args()
    cmd = get_sopcast_command(args)
    subprocess.check_call(cmd)


if __name__ == '__main__':
    main()
