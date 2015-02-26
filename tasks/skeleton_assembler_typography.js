/*
 * grunt-skeleton-assembler-typography
 * https://github.com/ginetta/grunt-skeleton-assembler-typography
 *
 * Copyright (c) 2015 Ginetta
 * Licensed under the MIT license.
 */

"use strict";

var _ = require("lodash");
var theo = require("theo");



var THEO_ADAPTED_TMP_PATH = ".tmp/theo/adapters/";
var THEO_GENERATED_TMP_PATH = ".tmp/theo/generated/";
var CUSTOM_THEO_TEMPLATES_PATH = __dirname + "/custom-theo-templates";

module.exports = function(grunt) {

  grunt.registerTask("skeleton_assembler_typography", "Grunt task that converts skeleton typography definition file into sass classes.", function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      src: "",
      destFolder: "",
      destName: ""
    });

    // generateAdaptedColorsSpec(options);
    // generateSass(options);
  });

};
