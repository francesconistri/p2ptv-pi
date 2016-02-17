import angular from 'angular';

import PiStreamCtl from './pistream.ctl';

var pistream = angular.module('pistream', []);

pistream.controller(PiStreamCtl);

export default pistream;