/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'application',
], function ($, _, Backbone, JST, Application) {
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
      this.validateSurvey();
      return this;
    },

    submitSurvey: function () {
      if (this.submissionIsValid()) {
        var type = this.collection.type;
        Application.student.set(type + 'Points', this.collection.points());
        Application.student.set(type, this.collection.toJSON());
        
        if (type === 'preSurvey') {
          Application.router.navigate('/credit-score', { trigger: true });
        } else if (type === 'postSurvey') {
          Application.router.navigate('/', { trigger: true });
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
