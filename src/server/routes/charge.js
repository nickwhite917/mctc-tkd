var express = require('express');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var helpers = require('../lib/helpers');
var User = require('../models/user.js');
var Registration = require('../models/registration.js');
var School = require('../models/school.js');


router.get('/registration', function (req, res, next) {
  return Product.find({}, function(err, data) {
    if (err) {
      return next(err);
    } else {
      return res.render('products', {products: data, user: req.user});
    }
  });
});

//todo
router.post('/registrations', function (req, res, next) {
  return Product.find({}, function (err, data) {
    if (err) {
      return next(err);
    } else {
      return res.render('products', {products: data, user: req.user});
    }
  });
});
router.get('/registration/:id', function (req, res, next) {
  var productID = req.params.id;
  Product.findById(productID, function(err, data) {
    if(err) {
      return next(err);
    } else {
      if(!req.user) {
        req.flash('message', {
          status: 'danger',
          value: 'Please login to enable registration.'
        });
      }
      return res.render('product', {
        product: data,
        user: req.user,
        message: req.flash('message')[0]
      });
    }
  });
});

//todo
router.get('/register/school', helpers.ensureAuthenticated, function (req, res, next) {
	Registration.findById("School", function (err, reg) {
		if (err) {
			return next(err);
		} else {
			return res.render('school_charge', {user: req.user, registration: reg});
		}
	});
});


router.get('/stripe', function(req, res, next) {
  res.send("Scram!");
});

router.post('/stripe', helpers.ensureAuthenticated, function(req, res, next) {
	// Obtain StripeToken
	var stripeToken = req.body.stripeToken;
	var userID = req.user._id;
	var body = req.body;
	//console.log(req.body);
	//return res.json(req.body);
	// Simple validation
	Registration.findById(req.body._id, function (err, data) {
		if (err) {
			return next(err);
		} else {
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
							return res.redirect('/register/school');
						} else {
							req.flash('message', {
								status: 'success',
								value: 'Successfully registered ' + req.body.schoolName + "!"
							});
						}
					});
					var charge = {
						amount: parseInt(req.body.amount) * 100,
						currency: 'USD',
						card: stripeToken,
						description: "Charge for: " + req.user.email + " for registration of: " + req.body.name + ".",
						receipt_email: req.user.email
					};
					stripe.charges.create(charge, function (err, charge) {
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