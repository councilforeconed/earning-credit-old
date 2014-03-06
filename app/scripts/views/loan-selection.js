/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var LoanSelectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/loan-selection.ejs']
  });

  return LoanSelectionView;
});
