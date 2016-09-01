var express = require('express');
var router = express.Router();

// var Product = require('../models/competitors.js');

router.get('/', function (req, res, next) {
	return res.render('competitor', {
		user: req.user,
		message: req.flash('message')[0]
	});
});

module.exports = router;