import os

BASE_PATH = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(BASE_PATH, 'static')
TEMPLATES_ROOT = os.path.join(BASE_PATH, 'templates')

DEFAULT_STREAMING_PORT = 3333
DEFAULT_COMMUNICATION_PORT = 10100
DEFAULT_STREAMING_HOST = '127.0.0.1'

DB_PATH = os.path.join(BASE_PATH, 'pistream.db')
