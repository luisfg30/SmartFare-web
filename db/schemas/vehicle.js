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
	capacity:{
		type: Number
	},
	onBoardUsers:{
		type: Number
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
