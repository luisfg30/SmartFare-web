var mongoose = require('mongoose');

var eventSchema = {
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

module.exports = new mongoose.Schema(eventSchema);
module.exports.eventSchema = eventSchema;
