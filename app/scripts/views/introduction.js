/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'views/scene',
  'templates',
  'application',
  'surveys/pre-survey'
], function ($, _, Backbone, SceneView, JST, Application, PreSurvey) {
  'use strict';

  var IntroductionScene = SceneView.extend({
    template: JST['app/scripts/templates/introduction.ejs'],

    events: {
      'keyup input': 'validateInputs',
      'click .continue': 'nextScene'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    validateInputs: function() {
      this.studentName = this.$('.first-name-input').val();
      this.studentID = this.$('.student-id-input').val();

      if (this.studentName && this.studentID) {
        this.$('.continue')
          .attr('disabled', false)
          .addClass('btn-primary');
        this.isValid = true;
      } else {
        this.$('.continue')
          .attr('disabled', true)
          .removeClass('btn-primary');
        this.isValid = false;
      }
    },

    nextScene: function() {
      Application.student.set({
        name: this.studentName,
        id: this.studentID
      });

      Application.router.navigate('pre-survey', { trigger: true });
    }
  });

  return IntroductionScene;
});