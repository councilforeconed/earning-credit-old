/*global define*/

define(function(require, exports, module) {
  'use strict';

  var Backbone = require('backbone');
  var Application = require('application');

  var Router = Backbone.Router.extend({

    routes: {
      '': 'introduction',
      'pre-survey': 'preSurvey',
      'credit-score': 'creditScore',
      'credit-score/:score': 'creditScore',
    },

    introduction: function() {
      Application.IntroductionView = Application.IntroductionView || new (require('views/introduction'))();
      Application.render(Application.IntroductionView);
    },

    preSurvey: function() {
      var PreSurvey = require('surveys/pre-survey');
      Application.PreSurvey = Application.PreSurvey || PreSurvey;
      Application.render(Application.PreSurvey.view);
    },

    creditScore: function() {
      var CreditScoreView = require('views/credit-score');
      Application.CreditScoreView = Application.CreditScoreView || new CreditScoreView();
      Application.render(Application.CreditScoreView);
    }
  });

  module.exports = Router;

});