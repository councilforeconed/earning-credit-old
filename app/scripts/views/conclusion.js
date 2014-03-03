(function (EarningCredit) {
  
  EarningCredit.ConclusionView = Backbone.View.extend({
  
    className: 'conclusion',
  
    events: {
      'keyup #teacher-email-input': 'updateTeacherEmail',
    },
  
    updateTeacherEmail: function () {
      var $input = this.$('#teacher-email-input');
      EarningCredit.Student.set('teacherEmail', $input.val());
    },
  
    render: function () {
      this.$el.html($('#conclusion-template').html());
      this.$('.current-credit-score .panel-body').text(EarningCredit.preSurvey.points());
      this.$('.car-loan .panel-body').text(EarningCredit.InterestRate() + '%');
      this.$('.future-credit-score .panel-body').text(EarningCredit.postSurvey.points());
      this.$('#teacher-email-input').val(EarningCredit.Student.get('teacherEmail'));
      return this;
    }

  });
  
})(EarningCredit);