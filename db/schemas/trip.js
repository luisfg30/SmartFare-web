var mongoose = require('mongoose');

var tripSchema = {
	timestamp: {
		type: String
	},
	vehicleId: {
		type: String
	},
	userId: {
		type: Number
	},
	eventType: {
		type: Number
	},
	balance: {
		type: Number
	},
	latitude: {
		type: String
	},
	longitude: {
		type: String
	}
};

module.exports = new mongoose.Schema(tripSchema);
module.exports.tripSchema = tripSchema;
