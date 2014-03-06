/*global define*/

define([
  'underscore',
  'backbone',
  'models/car'
], function (_, Backbone, CarModel) {
  'use strict';

  var CarCollection = Backbone.Collection.extend({
    model: CarModel
  });

  return CarCollection;
});
