/* */ 
(function(process) {
  'use strict';
  module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
      useminPrepare: 'grunt-usemin',
      ngtemplates: 'grunt-angular-templates',
      cdnify: 'grunt-google-cdn'
    });
    var appConfig = {
      app: require('./bower.json!systemjs-json').appPath || 'app',
      dist: 'site_dist',
      srcDist: 'dist'
    };
    grunt.initConfig({
      yeoman: appConfig,
      watch: {
        bower: {
          files: ['bower.json'],
          tasks: ['wiredep']
        },
        js: {
          files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
          tasks: ['newer:jshint:all'],
          options: {livereload: '<%= connect.options.livereload %>'}
        },
        jsTest: {
          files: ['test/spec/{,*/}*.js'],
          tasks: ['newer:jshint:test', 'karma']
        },
        styles: {
          files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
          tasks: ['newer:copy:styles', 'autoprefixer']
        },
        gruntfile: {files: ['Gruntfile.js']},
        livereload: {
          options: {livereload: '<%= connect.options.livereload %>'},
          files: ['<%= yeoman.app %>/{,*/}*.html', '.tmp/styles/{,*/}*.css', '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}']
        }
      },
      connect: {
        options: {
          port: 9000,
          hostname: 'localhost',
          livereload: 35729
        },
        livereload: {options: {
            open: true,
            middleware: function(connect) {
              return [connect.static('.tmp'), connect().use('/bower_components', connect.static('./bower_components')), connect().use('/app/styles', connect.static('./app/styles')), connect.static(appConfig.app)];
            }
          }},
        test: {options: {
            port: 9001,
            middleware: function(connect) {
              return [connect.static('.tmp'), connect.static('test'), connect().use('/bower_components', connect.static('./bower_components')), connect.static(appConfig.app)];
            }
          }},
        dist: {options: {
            open: true,
            base: '<%= yeoman.dist %>'
          }}
      },
      browserSync: {dev: {
          bsFiles: {src: ['<%= yeoman.app %>/scripts/{,*/}*.js', '<%= yeoman.app %>/styles/{,*/}*.css', '<%= yeoman.app %>/{,*/}*.html']},
          options: {
            watchTask: true,
            server: {
              baseDir: '<%= yeoman.app %>',
              routes: {'/bower_components': './bower_components'}
            }
          }
        }},
      jshint: {
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
        },
        all: {src: ['Gruntfile.js', '<%= yeoman.app %>/scripts/{,*/}*.js']},
        test: {
          options: {jshintrc: 'test/.jshintrc'},
          src: ['test/spec/{,*/}*.js']
        }
      },
      clean: {
        dist: {files: [{
            dot: true,
            src: ['.tmp', '<%= yeoman.dist %>/{,*/}*', '!<%= yeoman.dist %>/.git{,*/}*']
          }]},
        server: '.tmp',
        srcDist: '<%= yeoman.srcDist %>'
      },
      autoprefixer: {
        options: {browsers: ['last 1 version']},
        server: {
          options: {map: true},
          files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }]
        },
        dist: {files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }]}
      },
      wiredep: {
        app: {
          src: ['<%= yeoman.app %>/index.html'],
          ignorePath: /\.\.\//
        },
        test: {
          devDependencies: true,
          src: '<%= karma.unit.configFile %>',
          ignorePath: /\.\.\//,
          fileTypes: {js: {
              block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {js: /'(.*\.js)'/gi},
              replace: {js: '\'{{filePath}}\','}
            }}
        }
      },
      filerev: {dist: {src: ['<%= yeoman.dist %>/scripts/{,*/}*.js', '<%= yeoman.dist %>/styles/{,*/}*.css', '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}', '<%= yeoman.dist %>/styles/fonts/*']}},
      useminPrepare: {
        html: '<%= yeoman.app %>/index.html',
        options: {
          dest: '<%= yeoman.dist %>',
          flow: {html: {
              steps: {
                js: ['concat', 'uglifyjs'],
                css: ['cssmin']
              },
              post: {}
            }}
        }
      },
      usemin: {
        html: ['<%= yeoman.dist %>/{,*/}*.html'],
        css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
        js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
        options: {
          assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images', '<%= yeoman.dist %>/styles'],
          patterns: {js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]}
        }
      },
      uglify: {
        options: {mangle: true},
        srcDist: {files: {'<%= yeoman.srcDist %>/vjs-video.min.js': ['app/scripts/directives/vjs.directive.js']}}
      },
      svgmin: {dist: {files: [{
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= yeoman.dist %>/images'
          }]}},
      htmlmin: {dist: {
          options: {
            collapseWhitespace: true,
            conservativeCollapse: true,
            collapseBooleanAttributes: true,
            removeCommentsFromCDATA: true
          },
          files: [{
            expand: true,
            cwd: '<%= yeoman.dist %>',
            src: ['*.html'],
            dest: '<%= yeoman.dist %>'
          }]
        }},
      ngtemplates: {dist: {
          options: {
            module: 'vjsVideoApp',
            htmlmin: '<%= htmlmin.dist.options %>',
            usemin: 'scripts/scripts.js'
          },
          cwd: '<%= yeoman.app %>',
          src: 'views/{,*/}*.html',
          dest: '.tmp/templateCache.js'
        }},
      ngAnnotate: {dist: {files: [{
            expand: true,
            cwd: '.tmp/concat/scripts',
            src: '*.js',
            dest: '.tmp/concat/scripts'
          }]}},
      cdnify: {dist: {html: ['<%= yeoman.dist %>/*.html']}},
      copy: {
        srcDist: {files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>/scripts/directives/',
            dest: '<%= yeoman.srcDist %>/',
            src: 'vjs.directive.js',
            rename: function(dest, src) {
              return dest + 'vjs-video.js';
            }
          }]},
        dist: {files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: ['*.{ico,png,txt}', '.htaccess', '*.html', 'images/{,*/}*.{webp}', 'styles/fonts/{,*/}*.*', 'assets/*.*', '../../bower_components/video.js/dist/video-js/font/']
          }, {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          }]},
        styles: {
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          dest: '.tmp/styles/',
          src: '{,*/}*.css'
        },
        bower: {
          expand: true,
          dest: '<%= yeoman.dist %>/styles',
          cwd: 'bower_components/video.js/dist/video-js/',
          dot: true,
          src: ['font/*.*']
        }
      },
      concurrent: {
        server: ['copy:styles'],
        test: ['copy:styles'],
        dist: ['copy:styles']
      },
      karma: {unit: {
          configFile: 'test/karma.conf.js',
          singleRun: true
        }},
      deploy_site: {ghPages: {
          options: {
            branch: 'gh-pages',
            commit_msg: 'deployment build',
            deploy_url: 'http://lonnygomes.github.io/vjs-video',
            verbose: true
          },
          base_path: '<%= yeoman.dist %>',
          remote_url: 'git@github.com:LonnyGomes/vjs-video.git'
        }},
      bump: {options: {
          files: ['package.json', 'bower.json'],
          updateConfigs: [],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: ['package.json', 'bower.json'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin',
          gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
          globalReplace: false,
          prereleaseName: false,
          regExp: false
        }}
    });
    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
      if (target === 'dist') {
        return grunt.task.run(['build_site', 'connect:dist:keepalive']);
      }
      grunt.task.run(['clean:server', 'wiredep', 'concurrent:server', 'autoprefixer:server', 'connect:livereload', 'watch']);
    });
    grunt.registerTask('browserServe', ['clean:server', 'wiredep', 'concurrent:server', 'autoprefixer:server', 'browserSync:dev', 'watch']);
    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
      grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
      grunt.task.run(['serve:' + target]);
    });
    grunt.registerTask('test', ['clean:server', 'wiredep', 'concurrent:test', 'autoprefixer', 'connect:test', 'karma']);
    grunt.registerTask('build', 'generate dist copy of source', function(target) {
      grunt.file.mkdir("<%= yeoman.dist %>");
      grunt.task.run(['clean:srcDist', 'copy:srcDist', 'uglify:srcDist']);
    });
    grunt.registerTask('build_site', ['clean:dist', 'wiredep', 'useminPrepare', 'concurrent:dist', 'autoprefixer', 'ngtemplates', 'concat', 'ngAnnotate', 'copy:dist', 'copy:bower', 'cdnify', 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin']);
    grunt.registerTask('deploy', ['build_site', 'deploy_site']);
    grunt.registerTask('default', ['newer:jshint', 'test', 'build_site']);
  };
})(require('process'));
