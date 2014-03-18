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

    render: function() {
      var $template = $(this.template());
      $template.find('.car-name').text(Application.student.get('loan').car.name);
      this.$el.html($template);
      return this;
    }
  });

  return LoanSummaryView;
});
