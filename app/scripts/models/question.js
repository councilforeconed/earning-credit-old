/*global define*/

define([
  'underscore',
  'backbone',
  'views/question'
], function (_, Backbone, QuestionView) {
  'use strict';

  var QuestionModel = Backbone.Model.extend({
    defaults: {
      points: 0
    },

    initialize: function() {
      this.view = new QuestionView({ model: this });
    }
  });

  return QuestionModel;
});
