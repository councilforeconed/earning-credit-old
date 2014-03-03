(function (EarningCredit) {
  
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
  
})(EarningCredit);