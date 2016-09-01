var Registration = require('./registration.model');
var passport = require('passport');

var seedRegistration = function () {

    Registration.find({}, function (err, documents) {

    if(documents.length === 0){

      var prodArry = [
          {
              _id: "School",
              amount: 100,
              description: "Register your institution."
          },
          {
              _id: "Coach",
              amount: 20,
              description: "Register yourself as a coach."
          },
          {
              _id: "Black Belt",
              amount: 30,
              description: "Register for the black belt individuals."
          },
          {
              _id: "Color Belt",
              amount: 30,
              description: "Register for the colored belt individuals."
          }
      ];

      for (var i = 0; i < prodArry.length; i++) {
          var data = new Registration(
          {
			_id: prodArry[i]._id,
              amount: prodArry[i].amount,
              description: prodArry[i].description,
            currency: 'USD',
            forSale: true
          }
        );
        data.save();
      }

        console.log('Dummy registrations added!');
    }

  });

};

module.exports = seedRegistration;