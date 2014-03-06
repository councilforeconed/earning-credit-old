/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var CarsView = Backbone.View.extend({
    template: JST['app/scripts/templates/cars.ejs'],

    className: 'car-list',

    events: {
      'change input[type=radio]': 'selectLoan'
    },

    selectLoan: function () {
      var selection = JSON.parse(decodeURI(this.$('input[type=radio]:checked').val()));
      console.log(selection);
    },

    render: function () {
      var view = this;

      this.collection.each(function (car) {
        var carView = new EarningCredit.CarView({ model: car });
        view.$el.append(carView.render().el);
      }, this);

      return this;

    }
  });

  return CarsView;
});
