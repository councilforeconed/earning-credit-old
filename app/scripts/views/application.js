/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'models/student',
  'templates',
], function ($, _, Backbone, StudentModel, JST) {
  'use strict';

  var ApplicationView = Backbone.View.extend({
    template: JST['app/scripts/templates/application.ejs'],

    el: '#content',

    tagName: 'div',

    className: 'col-md-12',

    initialize: function () {
      this.student = new StudentModel();
    },

    render: function (view) {
      if (view) {
        this.$el.html(view.render().el);
      } else {
        this.$el.html(this.template());
      }
      return this;
    }

  });

  return ApplicationView;
});
