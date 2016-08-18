var express = require('express');
var router = express.Router();

var Product = require('../models/product.js');


router.get('/', function(req, res, next) {
  return res.render('index', {
    user: req.user,
    message: req.flash('message')[0]
  });
});

router.get('/registration', function (req, res, next) {
  return Product.find({}, function (err, data) {
    if (err) {
      return next(err);
    } else {
      return res.render('registration', {
        products: data,
        user: req.user,
        message: req.flash('message')[0]
      });
    }
  });
});

module.exports = router;
