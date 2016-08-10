var Product = require('../product');
var passport = require('passport');

var seedProduct = function() {

  Product.find({}, function(err, documents) {

    if(documents.length === 0){

      var prodArry = [
        {_id: "School", productName: 'School Registration', productAmount: 100}
      ];

      for (var i = 0; i < prodArry.length; i++) {
         var data = new Product(
          {
			_id: prodArry[i]._id,
            name: prodArry[i].productName,
            amount: prodArry[i].productAmount,
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