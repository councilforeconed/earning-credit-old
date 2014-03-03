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
    'change input': 'adjustPoints',
  },
  
  adjustPoints: function (e) {
    var points = this.$('input[type=radio]:checked').val();
    this.model.set('points', parseInt(points, 10));
    this.$el.removeClass('has-error').addClass('has-success');
  },
  
  render: function () {
    var that = this;
    var model = this.model;
    this.$el.append('<legend>' + this.model.get('question') + '</legend>');
    this.model.get('answers').forEach(function (answer) {
      that.$el.append('<div class="radio"><label><input type="radio" name="' + model.get('number') + 
        '" value="' + answer.value + '" />' + answer.text +'</label></div>');
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
    }, 300);
  }
  
});

EarningCredit.SurveyView = Backbone.View.extend({
  
  tagName: 'form',
  
  className: 'survey',
  
  events: {
    'click .submit-survey': 'submitSurvey',
    'submit': 'submitSurvey'
  },
  
  submitSurvey: function () {
    if (this.submissionIsValid()) {
      var view = this;
      this.$el.fadeOut('fast', function () {
        window.scrollTo(0,0);
        view.trigger('advance');
      });
    } else {
      _.each(this.$('.question'), function (question) {
        var valid = !!$(question).find('input[type=radio]:checked').length;
        if (!valid) {
          $(question).addClass('has-error');
        }
      });
    }
  },
  
  submissionIsValid: function () {
    var $questions = this.$('.question');
    return _.reduce($questions, function (result, question) {
      if (!result) return false;
      return result = !!$(question).find('input[type=radio]:checked').length;
    }, true);
  },
  
  render: function () {
    var survey = this;
    survey.collection.forEach(function (question) {
      var questionView = new EarningCredit.QuestionView({ model: question });
      survey.$el.append(questionView.render().el);
    });
    this.$el.append('<button type="button" class="submit-survey btn btn-primary btn-lg btn-block">Submit Survey</button>')
    return this;
  }
  
});

EarningCredit.IntroductionView = Backbone.View.extend({
  
  className: 'introduction',
  
  events: {
    'click .continue': 'continue',
    'submit': 'continue'
  },
  
  continue: function () {
    var view = this;
    this.$el.fadeOut('fast', function () {
      window.scrollTo(0,0);
      view.trigger('advance');
    });
  },
  
  render: function () {
    this.$el.append('<p>Introduction</p>');
    this.$el.append('<button type="button" class="continue btn btn-primary btn-lg btn-block">Begin</button>')
    return this;
  }
  
});

EarningCredit.LoanSelectionView = Backbone.View.extend({
  
  className: 'loan-selection',
  
  events: {
    'click .submit-selection': 'submitSelection',
    'submit': 'submitSelection'
  },
  
  submitSelection: function () {
    var view = this;
    this.$el.fadeOut('fast', function () {
      window.scrollTo(0,0);
      view.trigger('advance');
    });
  },
  
  render: function () {
    this.$el.append('<p>Car Loan Selection View</p>');
    this.$el.append('<button type="button" class="submit-selection btn btn-primary btn-lg btn-block">Select Car Loan</button>');
    return this;
  }
  
});

EarningCredit.ConclusionView = Backbone.View.extend({
  
  className: 'conclusion',
  
  render: function () {
    this.$el.append('<p>Conclusion</p>');
    return this;
  }
  
});

EarningCredit.InterestRate = function (score) {
  score = score || EarningCredit.preSurvey.points();
  
  if (score > 720) return 2.5;
  if (score > 690) return 4.5;
  if (score > 660) return 6.5;
  if (score > 630) return 8.5;
  if (score > 600) return 10.5;
  if (score > 570) return 12.5;
  if (score > 540) return 14.5;
  if (score > 510) return 16.5;
  if (score > 480) return 18.5;
  
  return 20;
};

EarningCredit.loadView = function (view, next) {
  view.on('advance', next);
  $('.content').append(view.render().el);
};

EarningCredit.init = function () {
  
  $.getJSON('./surveys/pre-survey.json').done(function (response) {
    EarningCredit.preSurvey = new EarningCredit.Survey(response);
    
    $.getJSON('./surveys/post-survey.json').done(function (response) {
      EarningCredit.postSurvey = new EarningCredit.Survey(response);
      
      EarningCredit.loadView(new EarningCredit.IntroductionView(), function () {
        var survey = new EarningCredit.SurveyView({ collection: EarningCredit.preSurvey });
        EarningCredit.loadView(survey, function () {
          var view = new EarningCredit.LoanSelectionView();
          EarningCredit.loadView(view, function () {
            var survey = new EarningCredit.SurveyView({ collection: EarningCredit.postSurvey });
            EarningCredit.loadView(survey, function () {
              var view = new EarningCredit.ConclusionView();
              EarningCredit.loadView(view);
            });
          });
        });
      });
      
    });
    
  });
};

$(document).ready(function () {
  'use strict';
  EarningCredit.init();
});
