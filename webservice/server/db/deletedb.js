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


// Delete all previous entries
User.remove({}, function(){
	doneUsers = true;
	if (doneTrips && doneUsers && doneVehicles) {
		process.exit(0);
	}
});

Trip.remove({}, function(){
	doneTrips = true;
	if (doneTrips && doneUsers && doneVehicles) {
		process.exit(0);
	}
});

Vehicle.remove({}, function(){
	doneVehicles = true;
	if (doneTrips && doneUsers && doneVehicles) {
		process.exit(0);
	}
});