/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var CarView = Backbone.View.extend({
    template: JST['app/scripts/templates/car.ejs'],

    className: 'car-info panel panel-default',

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$('.panel-body').append(this.model.loans.view.render().el);
      return this;
    }
  });

  return CarView;
});
