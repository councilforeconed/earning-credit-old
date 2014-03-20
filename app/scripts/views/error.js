/*global define, Application*/

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

    render: function(options) {
      this.$el.html(this.template());
      console.log(options);
      if (options.error === 404) {
        this.$('.error-reason').text('That\'s not a valid continuation code. Try again (or you can start over with as a new student)!');
      }
      return this;
    },

    startOver: function() {
      sessionStorage.removeItem('student');
      Application.render('introduction');
      Application.router.navigate('');
    }
  });

  return ErrorView;
});
