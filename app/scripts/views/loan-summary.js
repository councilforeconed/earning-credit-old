/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'application'
], function ($, _, Backbone, JST, Application) {
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
      console.log('Move on to post survey.');
      Application.router.navigate('/post-survey', { trigger: true });
    }
  });

  return LoanSummaryView;
});
