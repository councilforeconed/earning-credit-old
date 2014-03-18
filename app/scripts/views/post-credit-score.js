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
      'click .onward': 'startOver'
    },

    render: function() {
      var score = Application.student.get('postSurveyPoints') || this.score;
      var $template = $(this.template({
        score: score,
        percentage: score * 850/100
      }));

      $template.find('.credit-score-explanation')
        .text('Your future credit score is based on your predicted future behavior. You can make decisions now that will impact this score and impact your ability to borrow for major life purchases. You should establish a credit history, but when you apply for credit, use it wisely. Do not take on too much debt, and always make payments on time. Remember, you are building your reputation.');

      $template.find('.onward')
        .text('All Done!')
        .addClass('btn-danger')
        .removeClass('btn-success');

      this.$el.html($template);
      return this;
    },

    startOver: function () {
      Application.router.navigate('/', { trigger: true });
    }

  });

  return CreditScoreView;
});
