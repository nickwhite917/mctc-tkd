var express = require('express');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var helpers = require('../../lib/helpers');
var User = require('../user/user.model.js');
var Registration = require('../registration/registration.model.js');
var School = require('../registration/school/school.model.js');
var Coach = require('../registration/school/coach.model.js');
var StripeLog = require('./stripeLog.model.js');

router.get('/stripe', function (req, res, next) {
    res.send("API Not found. Beep boop.");
});

router.post('/stripe', helpers.ensureAuthenticated, function (req, res, next) {
    // Obtain StripeToken
    var stripeToken = req.body.stripeToken;
    var userID = req.user._id;
    var body = req.body;

    // Simple validation
    Registration.findById(req.body._id, function (err, data) {
        if (err) { return next(err); }
        else {
            var reg = data;
            if (parseInt(req.body.amount) !== data.amount) {
                req.flash('message', {
                    status: 'danger',
                    value: 'Error!'
                });
                return res.redirect('/');
            } else {
                // Get registration details
                User.findById(userID, function (err, data) {
                    if (err) {
                        return next(err);
                    } else {
                        data.registrations.push({
                            token: stripeToken,
                            _id: reg._id,
                            raw_object: req.body
                        });
                        data.save();
                    }
                });
                if (req.body._id == "School") {
                    var newSchool = new School({
                        school_name: body.schoolName,
                        contact_email: body.schoolEmail,
                        street_address: body.schoolAddress,
                        city: body.schoolCity,
                        state: body.schoolState,
                        zip: body.schoolZip,
                        website: body.schoolWebsite || "None provided",
                        instructor_email: req.user.email,
                        instructor_name: body.instructorName,
                        phone: body.instructorPhone
                    });
                    newSchool.save(function (err, results) {
                        if (err) {
                            req.flash('message', {
                                status: 'danger',
                                value: 'Failed to save school.'
                            });
                            return res.redirect('/registration/school');
                        } else {
                            req.flash('message', {
                                status: 'success',
                                value: 'Successfully registered ' + req.body.schoolName + "!"
                            });
                        }
                    });
                    var schoolCharge = {
                        amount: parseInt(req.body.amount) * 100,
                        currency: 'USD',
                        card: stripeToken,
                        description: "Charge for: " + req.user.email + " for registration of: " + req.body.schoolName + ". " + "Registration type: " + req.body._id,
                        receipt_email: req.user.email
                    };
                    stripe.charges.create(schoolCharge, function (err, strpResult) {
                        if (err) {
                            //Rollback product
                            User.findById(userID, function (err, data) {
                                if (err) {
                                    return next(err);
                                } else {
                                    if (data.registrations && data.registrations.length > 0) {
                                        data.registrations.pop();
                                        data.save();
                                    }
                                }
                            });
                            return next(err);
                        } else {
                            var stripeLog = new StripeLog({
                                log: strpResult
                            });
                            stripeLog.save(function (err, data) {
                                if (err) console.log(err);
                            });
                            req.flash('message', {
                                status: 'success',
                                value: 'Thanks for registering! You now have registration for ' + req.body.name + '!'
                            });
                            res.redirect('auth/profile');
                        }
                    });
                } else if (req.body._id == "Coach") {
                    var coach = new Coach({
                        schoolId: body.schoolId,
                        name: body.coachName,
                        contact_email: body.schoolEmail,
                        street_address: body.schoolAddress,
                        city: body.schoolCity,
                        state: body.schoolState,
                        zip: body.schoolZip,
                        phone: body.instructorPhone
                    });
                    coach.save(function (err, results) {
                        if (err) {
                            req.flash('message', {
                                status: 'danger',
                                value: 'Failed to save coach.'
                            });
                            return res.redirect('/registration/school/coach');
                        } else {
                            req.flash('message', {
                                status: 'success',
                                value: 'Successfully registered ' + req.body.coachName + "!"
                            });
                        }
                    });
                    var coachCharge = {
                        amount: parseInt(req.body.amount) * 100,
                        currency: 'USD',
                        card: stripeToken,
                        description: "Charge for: " + req.user.email + " for registration of: " + req.body.coachName + ". " + "Registration type: " + req.body._id,
                        receipt_email: req.user.email
                    };
                    stripe.charges.create(coachCharge, function (err, strpResult) {
                        if (err) {
                            //Rollback product
                            User.findById(userID, function (err, data) {
                                if (err) {
                                    return next(err);
                                } else {
                                    if (data.registrations && data.registrations.length > 0) {
                                        data.registrations.pop();
                                        data.save();
                                    }
                                }
                            });
                            return next(err);
                        } else {
                            var stripeLog = new StripeLog({
                                log: strpResult
                            });
                            stripeLog.save(function (err, data) {
                                if (err) console.log(err);
                            });
                            req.flash('message', {
                                status: 'success',
                                value: 'Thanks for registering! You now have registration for ' + req.body.name + '!'
                            });
                            res.redirect('auth/profile');
                        }
                    });
                }
            }
        }
    });
});

module.exports = router;