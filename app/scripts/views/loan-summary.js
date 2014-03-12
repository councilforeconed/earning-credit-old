/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var LoanSummaryView = Backbone.View.extend({
    template: JST['app/scripts/templates/loan-summary.ejs'],

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return LoanSummaryView;
});
