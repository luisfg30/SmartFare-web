var mongoose = require('mongoose');
var tripSchema = require('./schemas/trip');
var userSchema = require('./schemas/user');
var vehicleSchema = require('./schemas/vehicle');

// Connects to mongoose
mongoose.connect('mongodb://localhost:27017/test');

// Parameters are: model name, schema, collection name
var Trip = mongoose.model('Trip', tripSchema, 'trips');
var User = mongoose.model('User', userSchema, 'users');
var Vehicle = mongoose.model('Vehicle', vehicleSchema, 'vehicle');

var doneTrips = false;
var doneUsers = false;
var doneVehicles = false;

User.find(function(error, userDocs) {
	if (error) {
		console.log(error);
		process.exit(1);
	}

	console.log('Created users: ');
	userDocs.forEach(function(userDoc) {
		console.log(JSON.stringify(userDoc));
	});

	doneUsers = true;
	if (doneTrips && doneUsers && doneVehicles) {
		process.exit(0);
	}
});

Trip.find(function(error, tripDocs) {
	if (error) {
		console.log(error);
		process.exit(1);
	}

	console.log('Created trips: ');
	tripDocs.forEach(function(tripDoc) {
		console.log(JSON.stringify(tripDoc));
	});

	doneTrips = true;
	if (doneTrips && doneUsers && doneVehicles) {
		process.exit(0);
	}
});

Vehicle.find(function(error, vehicleDocs) {
	if (error) {
		console.log(error);
		process.exit(1);
	}

	console.log('Created vehicles: ');
	vehicleDocs.forEach(function(vehicleDoc) {
		console.log(JSON.stringify(vehicleDoc));
	});

	doneVehicles = true;
	if (doneTrips && doneUsers && doneVehicles) {
		process.exit(0);
	}
});
