/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ApplicationView = Backbone.View.extend({
    template: JST['app/scripts/templates/application.ejs'],

    el: '#content',

    tagName: 'div',

    className: 'col-md-12',

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return ApplicationView;
});
