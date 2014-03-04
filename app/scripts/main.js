/*global EarningCredit, $*/

EarningCredit.loadView = function (view, next) {
  view.on('advance', next);
  $('.content').append(view.render().el);
};

EarningCredit.init = function () {
  EarningCredit.loadView(new EarningCredit.IntroductionView(), function () {
    var survey = new EarningCredit.SurveyView({ collection: EarningCredit.preSurvey });
    EarningCredit.loadView(survey, function () {
      var view = new EarningCredit.LoanSelectionView();
      EarningCredit.loadView(view, function () {
        var survey = new EarningCredit.SurveyView({ collection: EarningCredit.postSurvey });
        EarningCredit.loadView(survey, function () {
          var view = new EarningCredit.ConclusionView();
          EarningCredit.loadView(view);
        });
      });
    });
  });
};

$(document).ready(function () {
  'use strict';
  EarningCredit.init();
});
