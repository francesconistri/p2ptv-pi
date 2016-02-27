/* */ 
if (typeof module !== "undefined" && module.exports) {
  this.VTTRegion = require('./vttregion').VTTRegion;
}
(function(root) {
  root.VTTRegion.create = function(options) {
    var region = new root.VTTRegion();
    for (var key in options) {
      if (region.hasOwnProperty(key)) {
        region[key] = options[key];
      }
    }
    return region;
  };
  root.VTTRegion.fromJSON = function(json) {
    return this.create(JSON.parse(json));
  };
}(this));
