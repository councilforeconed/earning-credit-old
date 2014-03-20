/*global define, Application*/

define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  var StudentModel = Backbone.Model.extend({
    initialize: function() {

      this.bind('change',function() {
        if (this.hasChanged('_id')) {
          if (this.has('_id')) {
            Application.continuationCode.render();
            this.fetch({ redirect: true });
          } else {
            Application.continuationCode.render();
            Application.render('introduction');
            Application.router.navigate('');
          }
        } else {
          if (!this.has('_id')) {
            this.generateID();
          }
          this.save();
        }
      });

    },

    generateID: function () {
      var id =  (+new Date() * Math.random()).toString().slice(0, 6);
      this.set('_id', id, {silent: true});
      return id;
    },

    sync: function (method, model, options) {
      var database = 'https://councilforeconed.cloudant.com/earning-credit/';

      console.log(method);

      if (method === 'read') {
        console.log('I am reading from the database');
        return $.getJSON(database + model.get('_id'))
          .done(function (resp) {
            model.set(resp, {silent: true});
            if (options.redirect) {
              Application.router.navigate(resp.scene, {trigger: true});
            }
          })
          .fail(function (resp) {
            Application.render('error', { error: resp.status });
          });
      }

      if (method === 'create') {
        console.log('I am going to try to put this into the database:', model.attributes);
        if (!model.has('_id')) {
          model.generateID();
        }
        $.ajax({
          type: 'POST',
          url: database,
          data: JSON.stringify(model.toJSON()),
          dataType: 'json',
          contentType: 'application/json'
        }).done(function(resp) {
          Application.router.navigate('student/' + model.get('_id'));
          model.set('_rev', resp.rev, {silent: true});
        });
      }

      if (method === 'update') {
        console.log('I am updating a model in the database.');
      }

      if (method === 'destroy') {
        console.log('I don\'t want to destroy any records!');
      }
    }
  });

  return StudentModel;
});
