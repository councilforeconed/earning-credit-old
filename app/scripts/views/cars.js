(function (EarningCredit) {

  EarningCredit.CarsView = Backbone.View.extend({

    className: 'car-list',

    events: {
      'change input[type=radio]': 'selectLoan'
    },

    selectLoan: function () {
      var selection = JSON.parse(decodeURI(this.$('input[type=radio]:checked').val()));
      EarningCredit.Student.set('loanSelected', selection);
    },

    render: function () {
      var view = this;

      this.collection.each(function (car) {
        var carView = new EarningCredit.CarView({ model: car });
        view.$el.append(carView.render().el);
      }, this);

      return this;

    }

  });

  EarningCredit.CarListView = new EarningCredit.CarsView({ collection: EarningCredit.CarList });

})(EarningCredit);
