/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
    numeral: '../bower_components/numeral/numeral'
  }
});

require([
  'backbone',
  'application',
  'router'
], function (Backbone, Application, Router) {
  window.Application = Application;
  Application.router = new Router();
  Backbone.history.start();
});