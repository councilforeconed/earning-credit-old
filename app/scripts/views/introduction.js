/*global define, Application*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'application'
], function ($, _, Backbone, JST) {
  'use strict';

  var IntroductionScene = Backbone.View.extend({
    template: JST['app/scripts/templates/introduction.ejs'],
    
    events: {
      'keyup input': 'validateInputs',
      'click .new-user': 'newUserToSurvey',
      'click .continue': 'continue',
      'click .clear-data': 'removeStudentData'
    },

    render: function() {
      this.$el.html(this.template());

      // Fill in the form with data from the student model.
      // If this data doesn't exist, then these values will be `undefined`,
      // which is fine.
      this.$('.first-name-input').val(Application.student.get('studentName'));
      this.$('.student-id-input').val(Application.student.get('studentId'));

      if (Application.student.has('name') && Application.student.has('studentId')) {
        this.turnOnNewUserButton();
      }
      
      return this;
    },

    validateInputs: function() {
      var studentName = this.$('.first-name-input').val();
      var studentId = this.$('.student-id-input').val();
      var teacherEmail = this.$('.teacher-email-input').val();

      if (teacherEmail) {
        teacherEmail = teacherEmail.match(/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/)[0];
      }

      if (studentName && studentId && teacherEmail) {
        this.turnOnNewUserButton();
      } else {
        this.turnOffNewUserButton();
      }

      if (this.continuationCode()) {
        this.$('.continue')
          .attr('disabled', false)
          .addClass('btn-primary');
      } else {
        this.$('.continue')
          .attr('disabled', true)
          .removeClass('btn-primary');
      }
    },

    continuationCode: function() {
      var continuationCode = this.$('.continuation-code').val()
        .replace(/[\s-—–]/g, '').match(/\d{6}/);
      return continuationCode && continuationCode[0];
    },

    turnOnNewUserButton: function() {
      this.$('.new-user')
        .attr('disabled', false)
        .addClass('btn-primary');
      this.isValid = true;
    },

    turnOffNewUserButton: function() {
      this.$('.new-user')
        .attr('disabled', true)
        .removeClass('btn-primary');
      this.isValid = false;
    },
    
    turnOnClearDataButton: function() {
      this.$('.clear-data')
        .attr('disabled', false);
    },
    
    turnOffClearDataButton: function() {
      this.$('.clear-data')
        .attr('disabled', true);
    },

    newUserToSurvey: function() {
      var studentName = this.$('.first-name-input').val();
      var studentId = this.$('.student-id-input').val();
      var teacherEmail = this.$('.teacher-email-input').val();

      Application.student.set({
        studentName: studentName,
        studentId: studentId,
        teacherEmail: teacherEmail,
        createDate: +new Date(),
        scene: 'pre-survey'
      });

      Application.render('preSurvey');
    },

    continue: function() {
      Application.student.set('_id', this.continuationCode());
    },
    
    removeStudentData: function () {
      Application.student.clear();
      this.render();
    }
  });

  return IntroductionScene;
});