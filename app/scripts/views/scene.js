/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone) {
  'use strict';

  var SceneView = Backbone.View.extend({
    isValid: function () {
      return true;
    }
  });

  return SceneView;
});
