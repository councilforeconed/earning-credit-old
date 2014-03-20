/*global define*/

define(function(require, exports, module) {
  'use strict';

  var Backbone = require('backbone');
  var StudentModel = require('models/student');
  var ContinuationCodeView = require('views/continuation-code');

  var ApplicationView = Backbone.View.extend({

    el: '#content',

    tagName: 'div',

    className: 'col-md-12',

    student: new StudentModel(),
    continuationCode: new ContinuationCodeView(),

    initialize: function () {
      this.scenes.introduction = new (require('views/introduction'))(),
      this.scenes.preSurvey = require('surveys/pre-survey').view,
      this.scenes.creditScore = new (require('views/credit-score'))(),
      this.scenes.loanSelection = new (require('views/loan-selection'))(),
      this.scenes.loanSummary = new (require('views/loan-summary'))(),
      this.scenes.postSurvey = require('surveys/post-survey').view,
      this.scenes.postCreditScore = new (require('views/post-credit-score'))(),
      this.scenes.error = new (require('views/error'))()
    },

    scenes: {},

    render: function(scene, options) {
      scene = this.scenes[scene];
      if (!scene) { throw 'You must render a valid scene from ApplicationView.'; }
      scene.delegateEvents();
      this.$el.html(scene.render(options).el);
    }

  });

  module.exports = ApplicationView;
});
