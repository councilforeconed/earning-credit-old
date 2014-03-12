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
    
    initialize: function () {
      this.listenTo(Application.student, 'change', this.render);
    },
    
    events: {
      'keyup input': 'validateInputs',
      'click .continue': 'continueToSurvey',
      'click .clear-data': 'removeStudentData'
    },

    render: function() {
      this.$el.html(this.template());

      // Fill in the form with data from the student model.
      // If this data doesn't exist, then these values will be `undefined`,
      // which is fine.
      this.$('.first-name-input').val(Application.student.get('name'));
      this.$('.student-id-input').val(Application.student.get('studentId'));

      if (Application.student.has('name') && Application.student.has('studentId')) {
        this.turnOnSubmitButton();
        this.turnOnClearDataButton();
      }
      
      return this;
    },

    validateInputs: function() {
      this.studentName = this.$('.first-name-input').val();
      this.studentId = this.$('.student-id-input').val();

      if (this.studentName && this.studentId) {
        this.turnOnSubmitButton();
        this.turnOnClearDataButton();
      } else {
        this.turnOffSubmitButton();
        this.turnOffClearDataButton();
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
    
    turnOnClearDataButton: function() {
      this.$('.clear-data')
        .attr('disabled', false)
    },
    
    turnOffClearDataButton: function() {
      this.$('.clear-data')
        .attr('disabled', true)
    },

    continueToSurvey: function() {
      Application.student.set({
        name: this.studentName,
        studentId: this.studentId
      });

      Application.router.navigate('pre-survey', { trigger: true });
    },
    
    removeStudentData: function () {
      Application.student.clear();
    }
  });

  return IntroductionScene;
});