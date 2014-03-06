/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var CarsView = Backbone.View.extend({
    template: JST['app/scripts/templates/cars.ejs']
  });

  return CarsView;
});
