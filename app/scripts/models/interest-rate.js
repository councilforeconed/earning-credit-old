(function (EarningCredit) {
  
  EarningCredit.InterestRate = function (score) {
    score = score || EarningCredit.preSurvey.points();
  
    if (score > 720) return 2.5;
    if (score > 690) return 4.5;
    if (score > 660) return 6.5;
    if (score > 630) return 8.5;
    if (score > 600) return 10.5;
    if (score > 570) return 12.5;
    if (score > 540) return 14.5;
    if (score > 510) return 16.5;
    if (score > 480) return 18.5;
  
    return 20;
  };
  
  EarningCredit.InterestRate.rates = [
    [720, 2.5],
    [690, 4.5],
    [660, 6.5],
    [630, 8.5],
    [600, 10.5],
    [570, 12.5],
    [540, 14.5],
    [510, 16.5],
    [480, 18.5],
    [300, 20]
  ]
  
})(EarningCredit);