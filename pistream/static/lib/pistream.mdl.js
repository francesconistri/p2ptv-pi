import angular from 'angular';
import 'video.js';
import 'video.js/dist/video-js.css!';
import vjs from 'vjs-video';

import PiStreamCtl from './pistream.ctl';

var pistream = angular.module('pistream', ['vjs.video']);

pistream.controller('pistream.PiStreamCtl', PiStreamCtl);

export default pistream;