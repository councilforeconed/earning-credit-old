/*global define*/

define([
  'backbone',
  'underscore',
  'application',
  'views/introduction',
  'surveys/pre-survey'
], function (Backbone, _, Application, IntroductionView, PreSurvey) {
  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '': 'introduction',
      'pre-survey': 'preSurvey',
      'credit-score': 'creditScore'
    },

    introduction: function() {
      Application.IntroductionView = Application.IntroductionView || new IntroductionView();
      Application.render(Application.IntroductionView);
    },

    preSurvey: function() {
      Application.PreSurveyView = Application.PreSurveyView || PreSurvey.view;
      Application.render(Application.PreSurveyView);
    },

    creditScore: function() {
      Application.render();
    }
  });

  return Router;
});
