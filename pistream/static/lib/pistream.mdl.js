import angular from 'angular';
import 'video.js';
import 'video.js/dist/video-js.css!';

import PiStreamCtl from './pistream.ctl';

var pistream = angular.module('pistream', []);

pistream.controller('pistream.PiStreamCtl', PiStreamCtl);

export default pistream;