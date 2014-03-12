/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'application'
], function ($, _, Backbone, JST, Application) {
  'use strict';

  var CreditScoreView = Backbone.View.extend({
    template: JST['app/scripts/templates/credit-score.ejs'],

    events: {
      'click .onward': 'continueToLoanSelection'
    },

    render: function() {
      var score = Application.student.get('preSurveyPoints') || this.score;
      this.$el.html(this.template({
        score: score,
        percentage: score * 850/100
      }));
      return this;
    },

    continueToLoanSelection: function() {
      Application.router.navigate('loan-selection', {trigger: true});
    }
  });

  return CreditScoreView;
});
