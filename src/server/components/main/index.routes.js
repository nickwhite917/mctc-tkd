var express = require('express');
var router = express.Router();

var Product = require('../registration/registration.model.js');


router.get('/', function(req, res, next) {
  return res.render("main/index_view", {
    user: req.user,
    message: req.flash('message')[0]
  });
});

module.exports = router;
