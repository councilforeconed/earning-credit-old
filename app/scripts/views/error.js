/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ErrorView = Backbone.View.extend({
    template: JST['app/scripts/templates/error.ejs'],

    events: {
      'click .start-over': 'startOver'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    startOver: function() {
      sessionStorage.removeItem('student');
      Application.router.navigate('', {trigger: true})
    }
  });

  return ErrorView;
});
