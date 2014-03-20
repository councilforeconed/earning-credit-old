/*global define, Application*/

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

    className: function() {
      return 'loan ' + this.model.cid;
    },

    events: {
      'change input[type=radio]': 'selectLoan'
    },

    selectLoan: function () {
      Application.student.set('loan', this.model.toJSON());
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      if (Application.student.get('preSurveyPoints') < this.model.get('creditScore')) {
        this.$el.addClass('ineligible');
        this.$('input[type=radio]').attr('disabled', true);
      }

      // Right now, Martha and Mush only want one car listed. So it doesn't
      // make sense to enforce a budget.
      // if (this.model.monthlyPayments() > 450) {
      //   this.$el.addClass('overbudget');
      //   this.$('input[type=radio]').attr('disabled', true);
      // }

      return this;
    }
  });

  return LoanView;
});
