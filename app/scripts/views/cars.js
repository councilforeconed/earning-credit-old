/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'application'
], function ($, _, Backbone, JST, Application) {
  'use strict';

  var CarsView = Backbone.View.extend({
    template: JST['app/scripts/templates/cars.ejs'],

    className: 'car-list',

    render: function () {
      this.collection.each(function (car) {
        this.$el.append(car.view.render().el);
      }, this);
      return this;
    }
  });

  return CarsView;
});
