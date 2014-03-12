/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/car',
  'views/cars',
  'application'
], function ($, _, Backbone, JST, CarCollection, CarsView, Application) {
  'use strict';

  var LoanSelectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/loan-selection.ejs'],

    initialize: function() {
      this.listenTo(Application.student, 'change:loan', this.enableSubmission);
    },

    events: {
      'click .onward': 'continueToLoanSummary'
    },

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
      this.$el.append(this.template());

      if (Application.student.has('loan')) {
        this.enableSubmission();
      }

      return this;
    },

    enableSubmission: function() {
      this.$('.onward')
        .attr('disabled', false)
        .addClass('btn-primary');
    },

    continueToLoanSummary: function() {
      Application.router.navigate('loan-summary', { trigger: true });
    }

  });

  return LoanSelectionView;
});
