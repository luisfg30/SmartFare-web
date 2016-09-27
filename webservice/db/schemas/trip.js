var mongoose = require('mongoose');

var tripSchema = {
	userId: {
		type: String
	},
	vehicleId: {
		type: String
	},
	fare: {
		type: Number
	},
	balance: {
		type: Number
	},
	distance: {
		type: Number
	},
	inOdometerMeasure: {
		type: Number
	},
	inTimestamp: {
		type: Date
	},
	inLatitude: {
		type: String
	},
	inLongitude: {
		type: String
	},
	outOdometerMeasure: {
		type: Number
	},
	outTimestamp: {
		type: Date
	},
	outLatitude: {
		type: String
	},
	outLongitude: {
		type: String
	}
};

/*
// fare getter
tripSchema.path('fare').get(function(num) {
	return (num / 100).toFixed(2);
});

// fare setter
tripSchema.path('fare').set(function(num) {
	return num * 100;
});

// balance getter
tripSchema.path('balance').get(function(num) {
	return (num / 100).toFixed(2);
});

// balance setter
tripSchema.path('balance').set(function(num) {
	return num * 100;
});
*/
module.exports = new mongoose.Schema(tripSchema);
module.exports.tripSchema = tripSchema;
