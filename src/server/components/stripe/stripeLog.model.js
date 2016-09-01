var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var StripeLog = new Schema({
    log: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('stripeLogs', StripeLog);