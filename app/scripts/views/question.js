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

    className: 'question panel panel-primary',

    events: {
      'change input': 'adjustPoints',
    },

    adjustPoints: function () {
      this.points = this.$('input[type=radio]:checked').val();
      this.model.set('points', parseInt(this.points, 10));
      this.$el
        .removeClass('has-error')
        .addClass('has-success')
        .removeClass('panel-primary')
        .addClass('panel-default');

    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));

      if (this.points) {
        this.$(':radio[value=' + this.points +']').attr('checked', true);
      }

      return this;
    }
  });

  return QuestionView;
});
