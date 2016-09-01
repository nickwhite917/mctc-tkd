var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Registration = new Schema({
  _id: String,
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

module.exports = mongoose.model('registrations', Registration);