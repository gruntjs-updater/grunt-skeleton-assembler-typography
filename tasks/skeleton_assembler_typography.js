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


  function generateAdaptedTypographySpec (options) {
    var original = grunt.file.readJSON(options.src);
    var colors = grunt.file.readJSON(options.colorsSrc);

    // We have palettes, let"s merge them into one single object
    if (_.isObject(_.values(colors))) {
      var colorsTmp = {};
      _.each(_.values(colors), function (palette) {
        colorsTmp = _.merge(colorsTmp, palette);
      });
      colors = colorsTmp;
    }

    var adapted = _.map(original, function (properties, name) {
      return _.merge({
        name: name,
        category: "typography",
        colorValue: colors[properties.color],
        value: "The quick brown fox jumps over the lazy dog"}, properties);
    });

    var typographyOriginal = { theme: { properties: adapted } };

    grunt.file.write(THEO_ADAPTED_TMP_PATH + options.destName + ".json", JSON.stringify(typographyOriginal, undefined, 2));
  }

  function generateSass (options) {
    theo.convert( THEO_ADAPTED_TMP_PATH + options.destName + ".json", THEO_GENERATED_TMP_PATH,
      {
        templates: ["scss"],
        templatesDirectory: CUSTOM_THEO_TEMPLATES_PATH
      }
    );

    var sassContents = grunt.file.read(THEO_GENERATED_TMP_PATH + options.destName + ".scss");
    grunt.file.write(options.destFolder + options.destName + ".scss", sassContents);
  }

  grunt.registerTask("skeleton_assembler_typography", "Grunt task that converts skeleton typography definition file into sass classes.", function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      src: "",
      colorsSrc: "",
      destFolder: "",
      destName: ""
    });

    grunt.log.writeln("options are", options);

    generateAdaptedTypographySpec(options);
    generateSass(options);
  });

};
