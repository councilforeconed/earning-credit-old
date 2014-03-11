/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var StudentModel = Backbone.Model.extend({
    initialize: function() {
      if (sessionStorage.getItem('student')) {
        this.set(JSON.parse(sessionStorage.getItem('student')));
      }

      this.on('change', function() {
        sessionStorage.setItem('student', JSON.stringify(this.attributes));
      }, this);
    }
  });

  return StudentModel;
});
