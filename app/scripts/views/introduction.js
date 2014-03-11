/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'application'
], function ($, _, Backbone, JST, Application) {
  'use strict';

  var IntroductionScene = Backbone.View.extend({
    template: JST['app/scripts/templates/introduction.ejs'],

    events: {
      'keyup input': 'validateInputs',
      'click .continue': 'nextScene',
      'change input.has-credit-score': 'displayCreditScoreInput'
    },

    render: function() {
      this.$el.html(this.template());

      if (Application.student.has('name')) {
        this.$('.first-name-input').val(Application.student.get('name'));
      }

      if (Application.student.has('studentId')) {
        this.$('.student-id-input').val(Application.student.get('studentId'));
      }

      if (Application.student.has('name') && Application.student.has('studentId')) {
        this.turnOnSubmitButton();
      }

      return this;
    },

    validateInputs: function() {
      this.studentName = this.$('.first-name-input').val();
      this.studentId = this.$('.student-id-input').val();

      if (this.studentName && this.studentId) {
        this.turnOnSubmitButton();
      } else {
        this.turnOffSubmitButton();
      }
    },

    displayCreditScoreInput: function() {
      if (this.$('.has-credit-score:checked').length) {
        this.$('.credit-score-field').removeClass('hidden');
      } else {
        this.$('.credit-score-field').addClass('hidden');
      }
    },

    turnOnSubmitButton: function() {
      this.$('.continue')
        .attr('disabled', false)
        .addClass('btn-primary');
      this.isValid = true;
    },

    turnOffSubmitButton: function() {
      this.$('.continue')
        .attr('disabled', true)
        .removeClass('btn-primary');
      this.isValid = false;
    },

    nextScene: function() {
      Application.student.set({
        name: this.studentName,
        studentId: this.studentId
      });

      Application.router.navigate('pre-survey', { trigger: true });
    }
  });

  return IntroductionScene;
});