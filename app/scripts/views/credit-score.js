/*global define, Application*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
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
      Application.render('loanSelection');
      Application.router.navigate('loan-selection');
    }
  });

  return CreditScoreView;
});
