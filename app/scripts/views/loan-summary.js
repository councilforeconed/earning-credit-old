/*global define, Application*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var LoanSummaryView = Backbone.View.extend({
    template: JST['app/scripts/templates/loan-summary.ejs'],

    events: {
      'click .onward': 'continueToPostSurvey'
    },

    render: function () {
      var $template = $(this.template());
      $template.find('.car-name').text(Application.student.get('loan').car.name);
      this.$el.html($template);
      return this;
    },

    continueToPostSurvey: function () {
      Application.student.set({scene: 'post-survey'});
      Application.render('postSurvey');
    }
  });

  return LoanSummaryView;
});
