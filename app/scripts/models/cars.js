(function (EarningCredit) {
  
  EarningCredit.Cars = Backbone.Collection.extend({
  
    model: EarningCredit.Car
  
  });
  
  EarningCredit.CarList = new EarningCredit.Cars([
      {name: 'Basic Car', price: 15000, description: 'A basic car'},
      {name: 'Mid-range Car', price: 20000, description: 'A midrange car'},
      {name: 'Luxury Car', price: 30000, description: 'Fancy, fancy'}
    ]);
  
})(EarningCredit);