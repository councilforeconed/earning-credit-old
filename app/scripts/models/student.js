(function (EarningCredit) {
  
  EarningCredit.Student = Backbone.Model.extend({
    defaults: {
      loanTerm: 5
    },
    loanTermInMonths: function () {
      return this.get('loanTerm') * 12;
    }
  });
  
  EarningCredit.Student = new EarningCredit.Student();
  
})(EarningCredit);