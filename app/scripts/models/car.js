(function (EarningCredit) {
  
  EarningCredit.Car = Backbone.Model.extend({
    defaults: {
      name: 'Car',
      price: 15000,
      description: 'A standard car.'
    }
  });
  
})(EarningCredit);