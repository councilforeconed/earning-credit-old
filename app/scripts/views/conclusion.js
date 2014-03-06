/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ConclusionView = Backbone.View.extend({
    template: JST['app/scripts/templates/conclusion.ejs']
  });

  return ConclusionView;
});
