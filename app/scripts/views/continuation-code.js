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
      if (Application.student.has('_id')) {
        this.$el.html(this.template(Application.student.toJSON()));
      } else {
        this.$el.html('');
      }
      
      return this;
    }
  });

  return ContinuationCodeView;
});
