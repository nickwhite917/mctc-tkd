var express = require('express');
var router = express.Router();
var helpers = require('../lib/helpers');

var School = require('../models/school.js');

//todo

router.get('/', helpers.ensureAuthenticated, function (req, res, next) {
	return res.render('school', {
		user: req.user,
		message: req.flash('message')[0]
	});
});

module.exports = router;