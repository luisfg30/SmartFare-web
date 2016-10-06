var mongoose = require('mongoose');

var userSchema = {
	uid: {
		type: String,
		required: true
	},
	balance: {
		type: Number,
		required: true
	},
	name: {
		type: String
	},
	email: {
		type: String,
		match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
	},
	phone: {
		type: String
	}
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;
