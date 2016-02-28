import os

from fabric.api import cd
from fabric.api import run
from fabric.api import env
from fabric.api import sudo
from fabric.api import roles

from fabric.api import prefix

env.user = 'pi'

env.roledefs = {
    'pi': ['192.168.1.104'],
}


APPLICATION_NAME = 'p2ptv-pi'
HOME = '/home/pi'
VIRTUALENV_PATH = env.VIRTUALENV_PATH = os.path.join(HOME, APPLICATION_NAME, '.ve')
APPLICATION_PATH = env.APPLICATION_PATH = os.path.join(HOME, APPLICATION_NAME)

VIRTUALENV_ACTIVATE = env.VIRTUALENV_ACTIVATE = 'source {0}'.format(os.path.join(env.VIRTUALENV_PATH, 'bin', 'activate'))
PYTHON = os.path.join(VIRTUALENV_PATH, 'bin', 'python')
MAIN = os.path.join(APPLICATION_PATH, 'pistream', 'main.py')

DEB_PACKAGES = [
    'git',
    'omxplayer',
    'python-m2crypto',
    'python-apsw',
    'virtualenv',
    'python-virtualenv',
    'python-dev',
    'screen',
    'dtach'
]


@roles('pi')
def deploy():
    sudo('apt-get update -qq')
    sudo('apt-get upgrade -yqq')
    sudo('apt-get install -yqq ' + ' '.join(DEB_PACKAGES))
    with prefix(env.VIRTUALENV_ACTIVATE):
        with cd(env.APPLICATION_PATH):
            run('git reset --hard')
            run('git pull origin master')
            run('pip install pip --upgrade -q')
            run('pip install -r requirements.txt -q')
            run(r"find . -name '*\.pyc' -delete")
    run('screen -S pistream -p 0 -X quit || /bin/true')
    run("screen -dmS pistream '{} {}'".format(PYTHON, MAIN))


@roles('pi')
def fast_deploy():
    with prefix(env.VIRTUALENV_ACTIVATE):
        with cd(env.APPLICATION_PATH):
            run('git reset --hard')
            run('git pull origin master')
            run(r"find . -name '*\.pyc' -delete")
    run('pkill {} || /bin/true'.format(PYTHON, MAIN))
    run('dtach -n /tmp/pistream.dtach {} {}'.format(PYTHON, MAIN))


###########
# ALIASES #
###########
d = deploy
fd = fast_deploy
