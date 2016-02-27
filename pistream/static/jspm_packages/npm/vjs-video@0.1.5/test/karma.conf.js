/* */ 
(function(process) {
  module.exports = function(config) {
    'use strict';
    var configuration = {
      autoWatch: true,
      basePath: '../',
      frameworks: ['mocha', 'chai'],
      preprocessors: {'app/scripts/**/*.html': ['ng-html2js']},
      files: ['bower_components/jquery/dist/jquery.js', 'bower_components/angular/angular.js', 'bower_components/video.js/dist/video.min.js', 'bower_components/angular-mocks/angular-mocks.js', 'bower_components/sinonjs/sinon.js', 'bower_components/bootstrap-css/js/bootstrap.min.js', 'bower_components/angular-gist/angular-gist.min.js', 'app/scripts/**/*.js', 'test/mock/**/*.js', 'test/spec/**/*.js', 'app/scripts/**/*.html'],
      exclude: [],
      port: 8080,
      browsers: ['Chrome'],
      reporters: ['mocha'],
      singleRun: false,
      colors: true,
      logLevel: config.LOG_INFO,
      ngHtml2JsPreprocessor: {stripPrefix: 'app/'},
      customLaunchers: {Chrome_travis_ci: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }}
    };
    if (process.env.TRAVIS) {
      configuration.browsers = ['Chrome_travis_ci'];
    }
    config.set(configuration);
  };
})(require('process'));
