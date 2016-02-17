System.config({
  baseURL: "static",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "jspm_packages/github/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.0",
    "angular-route": "github:angular/bower-angular-route@1.5.0",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "css": "github:systemjs/plugin-css@0.1.20",
    "traceur": "github:jmcriffey/bower-traceur@0.0.93",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.93",
    "github:angular/bower-angular-route@1.5.0": {
      "angular": "github:angular/bower-angular@1.5.0"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.2.0"
    }
  }
});
