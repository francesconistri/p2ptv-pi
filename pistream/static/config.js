System.config({
  baseURL: "static",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.0",
    "angular-route": "github:angular/bower-angular-route@1.5.0",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "css": "github:systemjs/plugin-css@0.1.20",
    "traceur": "github:jmcriffey/bower-traceur@0.0.93",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.93",
    "video.js": "npm:video.js@5.7.1",
    "vjs-video": "npm:vjs-video@0.1.5",
    "github:angular/bower-angular-route@1.5.0": {
      "angular": "github:angular/bower-angular@1.5.0"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.2.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:define-properties@1.1.2": {
      "foreach": "npm:foreach@2.0.5",
      "object-keys": "npm:object-keys@1.0.9"
    },
    "npm:es5-shim@4.5.6": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:for-each@0.3.2": {
      "is-function": "npm:is-function@1.0.1"
    },
    "npm:global@4.3.0": {
      "process": "npm:process@0.5.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:is-function@1.0.1": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash-compat@3.10.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:object.assign@4.0.3": {
      "define-properties": "npm:define-properties@1.1.2",
      "function-bind": "npm:function-bind@1.1.0",
      "object-keys": "npm:object-keys@1.0.9"
    },
    "npm:parse-headers@2.0.1": {
      "for-each": "npm:for-each@0.3.2",
      "trim": "npm:trim@0.0.1"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:rust-result@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "individual": "npm:individual@2.0.0"
    },
    "npm:safe-json-parse@4.0.0": {
      "rust-result": "npm:rust-result@1.0.0"
    },
    "npm:tsml@1.0.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:video.js@5.7.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "global": "npm:global@4.3.0",
      "lodash-compat": "npm:lodash-compat@3.10.2",
      "object.assign": "npm:object.assign@4.0.3",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "safe-json-parse": "npm:safe-json-parse@4.0.0",
      "tsml": "npm:tsml@1.0.1",
      "videojs-font": "npm:videojs-font@1.5.1",
      "videojs-ie8": "npm:videojs-ie8@1.1.2",
      "videojs-swf": "npm:videojs-swf@5.0.1",
      "videojs-vtt.js": "npm:videojs-vtt.js@0.12.1",
      "xhr": "npm:xhr@2.2.0"
    },
    "npm:videojs-font@1.5.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:videojs-ie8@1.1.2": {
      "es5-shim": "npm:es5-shim@4.5.6",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:videojs-vtt.js@0.12.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vjs-video@0.1.5": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:xhr@2.2.0": {
      "global": "npm:global@4.3.0",
      "is-function": "npm:is-function@1.0.1",
      "once": "npm:once@1.1.1",
      "parse-headers": "npm:parse-headers@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "xtend": "npm:xtend@4.0.1"
    }
  }
});
