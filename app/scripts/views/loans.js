/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var LoansView = Backbone.View.extend({
    template: JST['app/scripts/templates/loans.ejs'],

    tagName: 'table',

    className: 'table loan-table',

    render: function() {
      this.$el.html(this.template());
      this.collection.each(function(loan) {
        this.$el.append(loan.view.render().el);
      }, this);
      return this;
    }
  });

  return LoansView;
});
