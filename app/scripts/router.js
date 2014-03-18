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
      'loan-selection': 'loanSelection',
      'loan-summary': 'loanSummary',
      'post-survey': 'postSurvey',
      'post-credit-score': 'postCreditScore'
    },

    introduction: function () {
      var IntroductionView = require('views/introduction');
      Application.render(new IntroductionView());
    },

    error: function () {
      var ErrorView = new (require('views/error'))();
      Application.render(new ErrorView());
    },

    preSurvey: function () {
      var PreSurvey = require('surveys/pre-survey');
      Application.PreSurvey = Application.PreSurvey || PreSurvey;
      Application.render(Application.PreSurvey.view);
      // TODO: Figure out a way to fill out the survey based on the preSurvey model.
    },

    creditScore: function () {
      var CreditScoreView = require('views/credit-score');
      Application.render(new CreditScoreView());
    },

    loanSelection: function () {
      var LoanSelectionView = require('views/loan-selection');
      Application.render(new LoanSelectionView());
    },

    loanSummary: function () {
      var LoanSummaryView = require('views/loan-summary');
      Application.render(new LoanSummaryView());
    },

    postSurvey: function () {
      var PostSurvey = require('surveys/post-survey');
      Application.PostSurvey = Application.PostSurvey || PostSurvey;
      Application.render(Application.PostSurvey.view);
    },

    postCreditScore: function () {
      var CreditScoreView = require('views/post-credit-score');
      Application.render(new CreditScoreView());
    },
  });

  module.exports = Router;

});