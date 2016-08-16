var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
  _id: String,
  productName: String,
  description: String,
  amount: Number,
  currency: {
    type: String,
    default: 'USD'
  },
  forSale: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('products', Product);