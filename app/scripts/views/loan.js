/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'application'
], function ($, _, Backbone, JST, Application) {
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
      Application.student.set('loan', this.model);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      if (Application.student.get('preSurveyPoints') < this.model.get('creditScore')) {
        this.$el.addClass('ineligible');
        this.$('input[type=radio]').attr('disabled', true);
      }

      if (this.model.monthlyPayments() > 450) {
        this.$el.addClass('overbudget');
        this.$('input[type=radio]').attr('disabled', true); 
      }

      if (Application.student.get('loan').cid === this.model.cid) {
        debugger;
        this.$('input[type=radio]').attr('checked', true); 
      }

      return this;
    }
  });

  return LoanView;
});
