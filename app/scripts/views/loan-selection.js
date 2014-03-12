/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/car',
  'views/cars'
], function ($, _, Backbone, JST, CarCollection, CarsView) {
  'use strict';

  var LoanSelectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/loan-selection.ejs'],

    render: function() {
      // TODO: Define the cars somewhere else.
      var cars = new CarCollection([
        {
          name: 'Ol\' Rusty (Jalopy)',
          price: 10000,
          description: 'It has four wheels and it\'s pretty much held together by rust. Good luck with this one.'
        },
        {
          name: 'A Standard Four-Door Sedan',
          price: 15000,
          description: 'A standard, respectable car. It will get you where you\'re going.'
        },
        {
          name: 'A Luxury Vehicle',
          price: 20000,
          description: 'A very classy car for a very class person.'
        }
      ]);
      var view = new CarsView({ collection: cars });
      this.$el.html(view.render().el);
      return this;
    }
  });

  return LoanSelectionView;
});
