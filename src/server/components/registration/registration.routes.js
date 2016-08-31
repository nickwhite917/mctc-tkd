var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));

var passport = require('../../lib/auth');
var helpers = require('../../lib/helpers');
var Registration = require('../../models/registration');


// ** products ** //

// get ALL products
router.get('/registrations', helpers.ensureAdminJSON,
  function(req, res, next) {
    Registration.findQ()
        .then(function (registrations) {
    res.status(200)
    .json({
      status: 'success',
      data: registrations,
      message: 'Retrieved registrations.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// get SINGLE product
router.get('/registration/:id', helpers.ensureAdminJSON,
  function(req, res, next) {
    Registration.findByIdQ(req.params.id)
  .then(function(product) {
    res.status(200)
    .json({
      status: 'success',
      data: product,
      message: 'Retrieved product.'
    });
  })
  .catch(function(err) {
    return next(err);
  })
  .done();
});

// add new product
router.post('/registration', helpers.ensureAdminJSON,
  function(req, res, next) {
    var registration = new Registration({
    name: req.body.name,
    amount: req.body.amount
  });
    registration.saveQ()
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Created product.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});

// update SINGLE product
router.put('/registration/:id', helpers.ensureAdminJSON,
  function(req, res, next) {
  var id = req.params.id;
  var update = req.body;
  var options = {new:true, upsert:true};
    Registration.findByIdAndUpdateQ(id, update, options)
  .then(function(result) {
    res.status(200)
    .json({
      status: 'success',
      data: result,
      message: 'Updated product.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});

// delete SINGLE product
router.delete('/registration/:id', helpers.ensureAdminJSON,
  function(req, res, next) {
    Registration.findByIdAndRemoveQ(req.params.id)
  .then(function(product) {
    res.status(200)
    .json({
      status: 'success',
      data: product,
      message: 'Removed product.'
    });
  })
  .catch(function(err) {
    res.send(err);
  })
  .done();
});


module.exports = router;