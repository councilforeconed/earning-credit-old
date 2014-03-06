/*global define*/

define([
  'underscore',
  'backbone',
  'collections/loan',
  'views/car'
], function (_, Backbone, LoanCollection, CarView) {
  'use strict';

  var CarModel = Backbone.Model.extend({
    defaults: {
      name: 'Car',
      price: 15000,
      description: 'A standard car.'
    },

    initialize: function () {
      var creditScores = [ 720, 690, 660, 630, 660, 570, 540, 510, 480, 300 ];
      var loanTemplate = { basePrice: this.get('basePrice') };
      var loans = _.map(creditScores, function (score) {
        return _.extend(loanTemplate, { creditScore: score });
      });
      this.loans = new LoanCollection(loans);
      this.view = new CarView({ model: this });
    },

    toJSONWithLoans: function () {
      var json = _.clone(this.attributes);
      json.loans = this.loans.toJSON();
      return json;
    }
  });

  return CarModel;
});
