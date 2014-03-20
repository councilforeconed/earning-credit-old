/*global define, Application*/

define([
  'backbone',
  'templates'
], function (Backbone, JST) {
  'use strict';

  var ContinuationCodeView = Backbone.View.extend({
    template: JST['app/scripts/templates/continuation-code.ejs'],

    el: '#continuation-code',

    render: function () {
      this.$el.html(this.template(Application.student.toJSON()));
      
      return this;
    }
  });

  return ContinuationCodeView;
});
