/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var LoanView = Backbone.View.extend({
    template: JST['app/scripts/templates/loan.ejs'],

    tagName: 'tr',

    className: 'loan',

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return LoanView;
});
