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
    'keyup #first-name-input': 'updateFirstName',
    'keyup #student-id-input': 'updateStudentId',
    'keyup #current-age-input': 'updateCurrentAge',
    'keyup #teacher-email-input': 'updateTeacherEmail',
    'click .continue': 'continue',
    'submit': 'continue'
  },
  
  updateFirstName: function () {
    var $input = $('#first-name-input');
    EarningCredit.StudentInformation.set('firstName', $input.val());
    if (EarningCredit.StudentInformation.get('firstName')) {
      this.$('.continue').attr('disabled', false);
      $input.parent().removeClass('has-error').addClass('has-success');
    } else {
      this.$('.continue').attr('disabled', true);
      $input.parent().removeClass('has-success').addClass('has-error');
    }
  },
  
  updateStudentId: function () {
    var $input = $('#student-id-input');
    EarningCredit.StudentInformation.set('studentId', $input.val());
  },
  
  updateCurrentAge: function () {
    var $input = $('#current-age-input');
    if ($input.val().match(/\d+/) || !$input.val()) {
      EarningCredit.StudentInformation.set('currentAge', $input.val());
      $input.parent().removeClass('has-error');
    } else {
      $input.parent().removeClass('has-success').addClass('has-error');
    }
  },
  
  updateTeacherEmail: function () {
    var $input = $('#teacher-email-input');
    EarningCredit.StudentInformation.set('teacherEmail', $input.val());
  },
  
  continue: function () {
    var view = this;
    
    if (this.$('.has-error').length) {
      return alert('Please make sure none of the fields have errors.');
    }
    
    if (!EarningCredit.StudentInformation.get('firstName')) {
      return alert('Make sure you enter your first name.');
    }
    
    this.$el.fadeOut('fast', function () {
      window.scrollTo(0,0);
      view.trigger('advance');
      view.$el.remove();
    });
    
  },
  
  render: function () {
    this.$el.html($('#introduction-template').html());
    return this;
  }
  
});

EarningCredit.LoanSelectionView = Backbone.View.extend({
  
  className: 'loan-selection',
  
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
    this.$el.html($('#loan-selection-template').html());
    this.$('.current-credit-score .panel-body').text(EarningCredit.preSurvey.points());
    return this;
  }
  
});

EarningCredit.ConclusionView = Backbone.View.extend({
  
  className: 'conclusion',
  
  events: {
    'keyup #teacher-email-input': 'updateTeacherEmail',
  },
  
  updateTeacherEmail: function () {
    var $input = this.$('#teacher-email-input');
    EarningCredit.StudentInformation.set('teacherEmail', $input.val());
  },
  
  render: function () {
    this.$el.html($('#conclusion-template').html());
    this.$('.current-credit-score .panel-body').text(EarningCredit.preSurvey.points());
    this.$('.car-loan .panel-body').text(EarningCredit.InterestRate() + '%');
    this.$('.future-credit-score .panel-body').text(EarningCredit.postSurvey.points());
    this.$('#teacher-email-input').val(EarningCredit.StudentInformation.get('teacherEmail'));
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

EarningCredit.StudentInformation = Backbone.Model.extend({});

EarningCredit.StudentInformation = new EarningCredit.StudentInformation();

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
