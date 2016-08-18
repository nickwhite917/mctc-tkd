var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var School = new Schema({
	school_name: {
		type: String,
		required: true
	},
	updated: {type: Date, default: Date.now},
	coaches: {
		type: []
	},
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
	website: {
		type: String,
		required: true
	},
	instructor_email: {
		type: String,
		required: true
	},
	instructor_name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('schools', School);