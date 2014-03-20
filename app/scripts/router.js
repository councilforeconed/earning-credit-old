/*global define*/

define(function(require, exports, module) {
  'use strict';

  var Backbone = require('backbone');
  var Application = require('application');

  var Router = Backbone.Router.extend({

    routes: {
      '': 'introduction',
      'student(/:student)': 'loadStudent',
      'error(/:error)': 'error',
      'pre-survey': 'preSurvey',
      'credit-score': 'creditScore',
      'loan-selection': 'loanSelection',
      'loan-summary': 'loanSummary',
      'post-survey': 'postSurvey',
      'post-credit-score': 'postCreditScore'
    },

    introduction: function () {
      Application.render('introduction');
    },

    loadStudent: function (student) {
      Application.student.set('_id', student);
    },

    error: function (error) {
      Application.render('error', { error: error });
    },

    preSurvey: function () {
      if (!Application.student.has('_rev')) { this.navigate('/', {trigger: true}); }
      Application.render('preSurvey');
      this.navigate('student/' + Application.student.get('_id'));
    },

    creditScore: function () {
      if (!Application.student.has('_rev')) { this.navigate('/', {trigger: true}); }
      Application.render('creditScore');
      this.navigate('student/' + Application.student.get('_id'));
    },

    loanSelection: function () {
      if (!Application.student.has('_rev')) { this.navigate('/', {trigger: true}); }
      Application.render('loanSelection');
      this.navigate('student/' + Application.student.get('_id'));
    },

    loanSummary: function () {
      if (!Application.student.has('_rev')) { this.navigate('/', {trigger: true}); }
      Application.render('loanSummary');
      this.navigate('student/' + Application.student.get('_id'));
    },

    postSurvey: function () {
      if (!Application.student.has('_rev')) { this.navigate('/', {trigger: true}); }
      Application.render('postSurvey');
      this.navigate('student/' + Application.student.get('_id'));
    },

    postCreditScore: function () {
      if (!Application.student.has('_rev')) { this.navigate('/', {trigger: true}); }
      Application.render('postCreditScore');
      this.navigate('student/' + Application.student.get('_id'));
    }

  });

  module.exports = Router;
});