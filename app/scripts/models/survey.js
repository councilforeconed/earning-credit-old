(function (EarningCredit) {
  
  EarningCredit.Survey = Backbone.Collection.extend({
  
    model: EarningCredit.Question,
  
    points: function () {
      return this.reduce(function (total, question) {
        var points = question.get('points');
        return total + points;
      }, 300);
    }
  
  });
  
})(EarningCredit);