/*global define*/

define([
  'underscore',
  'backbone',
  'models/question',
  'views/survey'
], function (_, Backbone, QuestionModel, SurveyView) {
  'use strict';

  var SurveyCollection = Backbone.Collection.extend({
    model: QuestionModel,

    initialize: function() {
      this.view = new SurveyView({ collection: this });
    },

    points: function () {
      return this.reduce(function (total, question) {
        var points = question.get('points');
        return total + points;
      }, 300);
    }
  });

  return SurveyCollection;
});
