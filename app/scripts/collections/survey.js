/*global define*/

define([
  'underscore',
  'backbone',
  'models/question'
], function (_, Backbone, QuestionModel) {
  'use strict';

  var SurveyCollection = Backbone.Collection.extend({
    model: QuestionModel,

    points: function () {
      return this.reduce(function (total, question) {
      var points = question.get('points');
      return total + points;
      }, 300);
  });

  return SurveyCollection;
});
