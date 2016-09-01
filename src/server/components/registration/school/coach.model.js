var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Coach = new Schema({
	schoolId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	updated: {type: Date, default: Date.now},
	contact_email: {
		type: String,
		required: true
	},
	street_address: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	zip: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('coaches', Coach);