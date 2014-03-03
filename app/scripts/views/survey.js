(function (EarningCredit) {
  
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
  
})(EarningCredit);