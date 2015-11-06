var express = require('express');
var router = express.Router();
var path = require('path');
var System = require('../models/system');

router.route('/systems')
  .get(function(request, response) {
    System.find(function(err, systems) {
      if (err) {
        response.send(err);
      }
      response.json(systems);
    })
  })

  .post(function(request, response) {
    var system = new System();
    system.name = request.body.name;

    system.save(function(err) {
      if (err) {
        response.send(err);
      }

      System.find(function(err, systems) {
        if (err) {
          response.send(err);
        }
        response.json(systems);
      })
    });
  });

router.route('/systems/:system_id')
  .get(function(request, response) {
    System.findById(request.params.system_id, function(err, system) {
      if (err) {
        response.send(err);
      }
      response.json(system);
    })
  });

module.exports = router;