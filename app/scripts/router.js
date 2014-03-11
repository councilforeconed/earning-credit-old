/*global define*/

define(function(require, exports, module) {
  'use strict';

  var Backbone = require('backbone');
  var Application = require('application');

  var Router = Backbone.Router.extend({

    routes: {
      '': 'introduction',
      'error': 'error',
      'pre-survey': 'preSurvey',
      'credit-score': 'creditScore',
      'credit-score/:score': 'creditScore',
    },

    introduction: function() {
      Application.IntroductionView = Application.IntroductionView || new (require('views/introduction'))();
      Application.render(Application.IntroductionView);
    },

    error: function() {
      Application.ErrorView = Application.ErrorView || new (require('views/error'))();
      Application.render(Application.ErrorView);
    },

    preSurvey: function() {
      var PreSurvey = require('surveys/pre-survey');
      Application.PreSurvey = Application.PreSurvey || PreSurvey;
      Application.render(Application.PreSurvey.view);
    },

    creditScore: function(score) {
      var CreditScoreView = require('views/credit-score');
      Application.CreditScoreView = Application.CreditScoreView || new CreditScoreView();

      if (score) { Application.CreditScoreView.score = score; }

      if (!score && !Application.student.has('preSurvey')) {
        this.navigate('error', { trigger: true });
      } else {
        Application.render(Application.CreditScoreView);
      }
    }
  });

  module.exports = Router;

});