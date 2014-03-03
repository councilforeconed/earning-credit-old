(function (EarningCredit) {
  
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
  
})(EarningCredit);