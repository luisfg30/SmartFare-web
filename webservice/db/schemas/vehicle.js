var mongoose = require('mongoose');

var vehicleSchema = {
	vehicleId: {
		type: String
	},
	routeId: {
		type: String
	},
	routeName: {
		type: String
	},
	startDate: {
		type: Date
	},
	endDate: {
		type: Date
	}
};

module.exports = new mongoose.Schema(vehicleSchema);
module.exports.vehicleSchema = vehicleSchema;
