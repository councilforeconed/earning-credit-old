/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var CarModel = Backbone.Model.extend({
    defaults: {
    }
  });

  return CarModel;
});
