import angular from 'angular';

import PiStreamCtl from './pistream.ctl';

var pistream = angular.module('pistream', []);

pistream.controller('pistream.PiStreamCtl', PiStreamCtl);

export default pistream;