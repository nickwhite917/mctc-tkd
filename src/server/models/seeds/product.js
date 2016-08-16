var Product = require('../product');
var passport = require('passport');

var seedProduct = function() {

  Product.find({}, function(err, documents) {

    if(documents.length === 0){

      var prodArry = [
          {
              _id: "School",
              productName: 'School Registration',
              productAmount: 100,
              description: "Register your institution."
          },
          {
              _id: "Coach",
              productName: 'Coach Registration',
              productAmount: 20,
              description: "Register yourself as a coach."
          },
          {
              _id: "Black Belt",
              productName: 'Black Belt',
              productAmount: 30,
              description: "Register for the black belt individuals."
          },
          {
              _id: "Color Belt",
              productName: 'Color Belt',
              productAmount: 30,
              description: "Register for the colored belt individuals."
          }
      ];

      for (var i = 0; i < prodArry.length; i++) {
         var data = new Product(
          {
			_id: prodArry[i]._id,
              productName: prodArry[i].productName,
            amount: prodArry[i].productAmount,
              description: prodArry[i].description,
            currency: 'USD',
            forSale: true
          }
        );
        data.save();
      }

      console.log('Dummy products added!');
    }

  });

};

module.exports = seedProduct;