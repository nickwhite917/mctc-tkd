var express = require('express');
var router = express.Router();

var Product = require('../models/registration.js');


router.get('/', function(req, res, next) {
  return res.render('index', {
    user: req.user,
    message: req.flash('message')[0]
  });
});

module.exports = router;
