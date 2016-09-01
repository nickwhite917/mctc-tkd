var express = require('express');
var router = express.Router();
var helpers = require('../../../lib/helpers');

var School = require('./school.model');

//todo

router.get('/', helpers.ensureAuthenticated, function (req, res, next) {
    return res.render('registration/school/index', {
        user: req.user,
        message: req.flash('message')[0]
    });
});

router.get('/school', helpers.ensureAuthenticated, function (req, res, next) {
    return res.render('registration/school/school', {
        user: req.user,
        message: req.flash('message')[0]
    });
});

router.get('/coach', helpers.ensureAuthenticated, function (req, res, next) {
    School.find({}, 'school_name', function (err, schoolNames) {
        if (err) { next(err); }
        console.log(schoolNames);
        var options = schoolNames;
        options.push({school_name: "No school"});
        return res.render('registration/school/coach', {
            user: req.user,
            message: req.flash('message')[0],
            options: options
        });
    });
});

module.exports = router;