/*global define*/

define([
  'underscore',
  'backbone',
  'models/car'
], function (_, Backbone, CarModel) {
  'use strict';

  var CarsCollection = Backbone.Collection.extend({
    model: CarsModel
  });

  return CarsCollection;
});
