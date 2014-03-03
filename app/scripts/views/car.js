(function (EarningCredit) {
  
  EarningCredit.CarView = Backbone.View.extend({
    
    className: 'car-info',
    
    render: function () {
      var car = this.model;
      var template = _.template($('#car-template').html());

      this.$el.html(template(car.toJSON()));
      
      var $loans = $(this.$('.loan-list').get(0));
      var basePrice = car.get('price');
      var loanTermInMonths = EarningCredit.Student.loanTermInMonths();
      var loanTermInYears = EarningCredit.Student.get('loanTerm');
      
      EarningCredit.InterestRate.rates.forEach(function (pair) {
        var creditScore = pair[0];
        var rate = pair[1];
        var totalCost = basePrice * (1 + (rate / 100) * loanTermInYears);
        var monthlyPrice = totalCost / loanTermInMonths;
        
        $loans.append('<tr>' + 
                        '<td>$' + numeral(basePrice).format('0,0') + '</td>' +
                        '<td>' + loanTermInMonths + ' months</td>' +
                        '<td>' + rate + '%</td>' +
                        '<td>' + creditScore + '</td>' +
                        '<td>$' + numeral(totalCost).format('0,0') + '</td>' +
                        '<td>$' + numeral(monthlyPrice).format('0,0') + '</td>' +
                      '</tr>');
      });
      
      return this;
    }
    
  });
  
})(EarningCredit);