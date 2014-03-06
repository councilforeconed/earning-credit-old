/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var IntroductionView = Backbone.View.extend({
    template: JST['app/scripts/templates/introduction.ejs']
  });

  return IntroductionView;
});
