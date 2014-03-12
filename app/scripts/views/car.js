/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'numeral'
], function ($, _, Backbone, JST, numeral) {
  'use strict';

  var CarView = Backbone.View.extend({
    template: JST['app/scripts/templates/car.ejs'],

    className: 'car-info panel panel-default',

    render: function () {
      var formattedPrice = numeral(this.model.get('price')).format('$0,0');

      this.$el.html(this.template(this.model.toJSON()));
      this.$('.panel-body').append(this.model.loans.view.render().el);
      this.$('.price').html(formattedPrice);
      
      return this;
    }
  });

  return CarView;
});
