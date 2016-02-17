import 'bootstrap'

import angular from 'angular';

import pistream from './pistream.mdl';

angular.element(document).ready(function() {
    angular.bootstrap(document, [pistream.name]);
});