/*global define, Application*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SurveyView = Backbone.View.extend({
    template: JST['app/scripts/templates/survey.ejs'],

    tagName: 'form',

    className: 'survey',

    events: {
      'change input': 'validateSurvey',
      'click .submit-survey': 'submitSurvey',
      'submit': 'submitSurvey'
    },

    render: function () {
      this.$el.html(this.template());
      this.collection.each(function (question) {
        this.$('.questions').append(question.view.render().el);
      }, this);
      this.delegateEvents(this.events);
      this.validateSurvey();
      return this;
    },

    submitSurvey: function () {
      if (this.submissionIsValid()) {
        var type = this.collection.type;
        var surveyResults = {};
        surveyResults[type + 'Points'] = this.collection.points();
        surveyResults[type] = this.collection.toJSON();
        if (type === 'preSurvey') {
          Application.student.set(_.extend(surveyResults, {scene: 'credit-score'}));
          Application.render('creditScore');
        } else if (type === 'postSurvey') {
          Application.student.set(_.extend(surveyResults, {scene: 'post-credit-score'}));
          Application.render('postCreditScore');
        } else {
          throw new Error('The survey submitted is neither a pre- or a post-survey. Weird.');
        }

        // Disable all of the options upon submission.
        // This way, students can't just hit back and change their answers.
        // TODO: Store this data in sessionStorage so that refreshing doesn't help either.
        this.$('.question').attr('disabled', true);
      } else {
        _.each(this.$('.question'), function (question) {
          var valid = !!$(question).find('input[type=radio]:checked').length;
          if (!valid) { $(question).addClass('has-error'); }
        });
      }
    },

    submissionIsValid: function () {
      var $questions = this.$('.question');
      return _.reduce($questions, function (result, question) {
        if (!result) {
          result = false;
        } else {
          result = !!$(question).find('input[type=radio]:checked').length;
        }
        return result;
      }, true);
    },

    validateSurvey: function() {
      var $submitSurveyButton = this.$('.submit-survey');
      if (this.submissionIsValid()) {
        $submitSurveyButton.attr('disabled', false).addClass('btn-primary');
      }
    }
  });

  return SurveyView;
});
