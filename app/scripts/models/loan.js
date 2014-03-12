/*global define*/

define([
  'underscore',
  'backbone',
  'views/loan',
  'numeral'
], function (_, Backbone, LoanView, numeral) {
  'use strict';

  var LoanModel = Backbone.Model.extend({
    defaults: {
      basePrice: 15000,
      loanTermInMonths: 60,
      creditScore: 500
    },

    initialize: function() {
      this.view = new LoanView({ model: this });
    },

    rate: function () {
      var score =  this.get('creditScore');

      if (score >= 720) { return 2.5; }
      if (score >= 690) { return 4.5; }
      if (score >= 660) { return 6.5; }
      if (score >= 630) { return 8.5; }
      if (score >= 600) { return 10.5; }
      if (score >= 570) { return 12.5; }
      if (score >= 540) { return 14.5; }
      if (score >= 510) { return 16.5; }
      if (score >= 480) { return 18.5; }

      return 20;
    },

    totalCost: function () {
      var loanTermInYears = this.get('loanTermInMonths') / 12;
      var interestRate = this.rate() / 100;
      return this.get('basePrice') * (1 + interestRate * loanTermInYears);
    },

    monthlyPayments: function () {
      return this.totalCost() / this.get('loanTermInMonths');
    },

    _encoded: function() {
      var json = _.clone(this.attributes);
      return escape(JSON.stringify(json));
    },

    toJSON: function () {
      var json = _.clone(this.attributes);
      json.basePrice = numeral(this.get('basePrice')).format('$0,[.]00');
      json.rate = this.rate() + '%';
      json.totalCost = numeral(this.totalCost()).format('$0,[.]00');
      json.monthlyPayments = numeral(this.monthlyPayments()).format('$0,[.]00');
      json._encoded = this._encoded;
      return json;
    }
  });

  return LoanModel;
});
