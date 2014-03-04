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

        var loanInformation = _.extend(car.toJSON(), {
          creditScore: creditScore,
          rate: rate,
          totalCost: totalCost,
          monthlyPrice: monthlyPrice
        });
        var loanInformationEncoded = encodeURI(JSON.stringify(loanInformation));

        var $loan = $('<tr class="loan-information">' +
                        '<td><div class="radio"><input type="radio" name="loan" value="' + loanInformationEncoded + '"></div></td>' +
                        '<td class="loan-base-price">$' + numeral(basePrice).format('0,0') + '</td>' +
                        '<td class="loan-loan-term">' + loanTermInMonths + ' months</td>' +
                        '<td class="loan-interest-rate">' + rate + '%</td>' +
                        '<td class="loan-credit-score">' + creditScore + '</td>' +
                        '<td class="loan-total-cost">$' + numeral(totalCost).format('0,0') + '</td>' +
                        '<td class="loan-monthly-price">$' + numeral(monthlyPrice).format('0,0') + '</td>' +
                      '</tr>');

        if (EarningCredit.preSurvey.points() < creditScore) {
          $loan.find('input[type=radio]').attr('disabled', true);
          $loan.addClass('disabled');
        }

        if (monthlyPrice > 600) {
          $loan.find('input[type=radio]').attr('disabled', true);
          $loan.addClass('overbudget');
        }

        $loans.append($loan);
      });

      return this;
    }

  });

})(EarningCredit);
