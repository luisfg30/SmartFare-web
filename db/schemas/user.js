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
	}
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;
