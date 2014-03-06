/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var CarView = Backbone.View.extend({
    template: JST['app/scripts/templates/car.ejs']
  });

  return CarView;
});
