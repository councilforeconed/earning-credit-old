/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SurveyView = Backbone.View.extend({
    template: JST['app/scripts/templates/survey.ejs']
  });

  return SurveyView;
});
