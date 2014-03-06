/*global define*/

define([
  'underscore',
  'backbone',
  'models/loan',
  'views/loans'
], function (_, Backbone, LoanModel, LoansView) {
  'use strict';

  var LoanCollection = Backbone.Collection.extend({
    model: LoanModel,

    initialize: function() {
      this.view = new LoansView({ collection: this });
    }
  });

  return LoanCollection;
});
