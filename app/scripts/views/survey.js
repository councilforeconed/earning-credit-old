/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'application',
  'views/scene'
], function ($, _, Backbone, JST, Application, SceneView) {
  'use strict';

  var SurveyView = SceneView.extend({
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
      return this;
    },

    submitSurvey: function () {
      if (this.submissionIsValid()) {
        var type = this.collection.type;
        Application.student[type] = this.collection.points;
        if (type === 'pre-survey') {
          Application.router.navigate('/credit-score', { trigger: true });
        } else if (type === 'post-survey') {
          Application.router.navigate('/', { trigger: true });
        } else {
          throw new Error('The survey submitted is neither a pre- or a post-survey. Weird.');
        }
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
