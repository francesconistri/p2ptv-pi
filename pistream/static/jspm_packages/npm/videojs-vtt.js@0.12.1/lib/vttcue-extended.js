/* */ 
(function(process) {
  if (typeof module !== "undefined" && module.exports) {
    this.VTTCue = this.VTTCue || require('./vttcue').VTTCue;
  }
  (function(root) {
    root.VTTCue.prototype.toJSON = function() {
      var cue = {},
          self = this;
      Object.keys(this).forEach(function(key) {
        if (key !== "getCueAsHTML" && key !== "hasBeenReset" && key !== "displayState") {
          cue[key] = self[key];
        }
      });
      return cue;
    };
    root.VTTCue.create = function(options) {
      if (!options.hasOwnProperty("startTime") || !options.hasOwnProperty("endTime") || !options.hasOwnProperty("text")) {
        throw new Error("You must at least have start time, end time, and text.");
      }
      var cue = new root.VTTCue(options.startTime, options.endTime, options.text);
      for (var key in options) {
        if (cue.hasOwnProperty(key)) {
          cue[key] = options[key];
        }
      }
      return cue;
    };
    root.VTTCue.fromJSON = function(json) {
      return this.create(JSON.parse(json));
    };
  }(this));
})(require('process'));
