/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/car'
], function ($, _, Backbone, JST, CarModel) {
  'use strict';

  var LoanSelectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/loan-selection.ejs'],

    initialize: function() {
      // TODO: Implement
      // this.listenTo(Application.student, 'change:loan', this.enableSubmission);
    },

    events: {
      'click .onward': 'continueToLoanSummary',
      'change input[name=loan]': 'enableSubmission'
    },

    render: function() {
      // TODO: Define the cars somewhere else.
      // An earlier version of this application allowed thst student to select
      // from multiple cars. We're not doing this anymore, but the original
      // architecture has been left in place. For now, it's simply a collection
      // with only one model in it.
      var car = new CarModel(
        {
          name: 'A sensible car for a sensible person',
          price: 20000,
          description: 'A very classy car for a very class person.'
        }
      );
      this.$el.html(car.view.render().el);
      this.$el.append(this.template());

      if ($('input[name=loan]:checked').length || Application.student.get('loan')) {
        this.enableSubmission();
      }

      return this;
    },

    enableSubmission: function() {
      if (Application.student.get('loan')) {
        this.$('.onward')
          .attr('disabled', false)
          .addClass('btn-primary');
      }
    },

    continueToLoanSummary: function() {
      Application.student.set({scene: 'loan-summary'});
      Application.render('loanSummary');
    }

  });

  return LoanSelectionView;
});
