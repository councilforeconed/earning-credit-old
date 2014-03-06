/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var StudentModel = Backbone.Model.extend({
    defaults: {
      loanTerm: 5
    },
    loanTermInMonths: function () {
      return this.get('loanTerm') * 12;
    }
  });

  return StudentModel;
});
