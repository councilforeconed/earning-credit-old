/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var QuestionView = Backbone.View.extend({
    template: JST['app/scripts/templates/question.ejs'],

    tagName: 'fieldset',

    className: 'question',

    events: {
      'change input': 'adjustPoints',
    },

    adjustPoints: function (e) {
      var points = this.$('input[type=radio]:checked').val();
      this.model.set('points', parseInt(points, 10));
      this.$el.removeClass('has-error').addClass('has-success');
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return QuestionView;
});
