/*global EarningCredit, $*/

window.EarningCredit = {};

EarningCredit.Question = Backbone.Model.extend({
  defaults: {
    points: 0
  }
});

EarningCredit.QuestionView = Backbone.View.extend({
  
  tagName: 'fieldset',
  
  className: 'question',
  
  events: {
    'change input': 'adjustPoints'
  },
  
  adjustPoints: function (e) {
    var points = this.$('input[type=radio]:checked').val();
    this.model.set('points', parseInt(points, 10));
  },
  
  render: function () {
    var that = this;
    var model = this.model;
    this.$el.append('<legend>' + this.model.get('question') + '</legend>');
    this.model.get('answers').forEach(function (answer) {
      that.$el.append('<input type="radio" name="' + model.get('number') + 
        '" value="' + answer.value + '" />' + answer.text +'<br />');
    });
    return this;
  }
  
});

EarningCredit.Survey = Backbone.Collection.extend({
  model: EarningCredit.Question,
  
  points: function () {
    return this.reduce(function (total, question) {
      var points = question.get('points');
      return total + points;
    }, 0);
  }
  
});

EarningCredit.SurveyView = Backbone.View.extend({
  
  tagName: 'form',
  
  className: 'survey',
  
  render: function () {
    var survey = this;
    survey.collection.forEach(function (question) {
      var questionView = new EarningCredit.QuestionView({ model: question });
      survey.$el.append(questionView.render().el);
    });
    return this;
  }
  
});

$.getJSON('./surveys/pre-survey.json').done(function (response) {
  EarningCredit.preSurvey = new EarningCredit.Survey(response);
  var survey = new EarningCredit.SurveyView({ collection: EarningCredit.preSurvey });
  $('body').append(survey.render().el);
});

$.getJSON('./surveys/post-survey.json').done(function (response) {
  EarningCredit.postSurvey = new EarningCredit.Survey(response);
});

$(document).ready(function () {
    'use strict';
});
