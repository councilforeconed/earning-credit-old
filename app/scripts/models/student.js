/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var StudentModel = Backbone.Model.extend({
    defaults: {
    }
  });

  return StudentModel;
});
