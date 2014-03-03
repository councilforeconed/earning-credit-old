(function (EarningCredit) {
  
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
  
})(EarningCredit);