var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var shortid = require('shortid');
var tripSchema = require('./schemas/trip');
var userSchema = require('./schemas/user');
var vehicleSchema = require('./schemas/vehicle');
var SchemaTypes = mongoose.Schema.Types;

// Connects to mongoose
mongoose.connect('mongodb://localhost:27017/test');

// Parameters are: model name, schema, collection name
var Trip = mongoose.model('Trip', tripSchema, 'trips');
var User = mongoose.model('User', userSchema, 'users');
var Vehicle = mongoose.model('Vehicle', vehicleSchema, 'vehicle');

var doneTrips = false;
var doneUsers = false;
var doneVehicles = false;

// Create hotels
var usersArray = [
	new User({
		uid: '001',
		balance: 200.00,
		name: 'Diego',
		email: 'diego@email.com',
		phone: '4199999999'
	}),
	new User({
		uid: '002',
		balance: 10.00,
		name: 'Diogo',
		email: 'dggf.93@gmail.com',
		phone: '4198272100'
	}),
	new User({
		uid: '003',
		balance: 100.00,
		name: 'Luis',
		email: 'luis@email.com',
		phone: '4199999990'
	})
];

usersArray.forEach(function(userDoc) {
	userDoc.save(function(error) {
		if (error) {
			console.log(error);
			process.exit(1);
		}
	});
});

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


var tripsArray = [
	new Trip({
		userId: '002',
		vehicleId: 'BC018',
		fare: 3.70,
		balance: 10.00,
		distance: 3,
		inOdometerMeasure: 12345,
		inTimestamp: '2016-09-04T08:00:00',
		inLatitude: '-25.408451',
		inLongitude: '-49.276289',
		outOdometerMeasure: 12348,
		outTimestamp: '2016-09-04T08:15:00',
		outLatitude: '-25.432964',
		outLongitude: '-49.276430'
	}),
	new Trip({
		userId: '002',
		vehicleId: 'BC003',
		fare: 3.70,
		balance: 10.00,
		distance: 3,
		inOdometerMeasure: 23456,
		inTimestamp: '2016-09-05T08:00:00',
		inLatitude: '-25.408451',
		inLongitude: '-49.276289',
		outOdometerMeasure: 23459,
		outTimestamp: '2016-09-05T08:16:00',
		outLatitude: '-25.432965',
		outLongitude: '-49.276431'
	})
];

tripsArray.forEach(function(tripDoc) {
	tripDoc.save(function(error) {
		if (error) {
			console.log(error);
			process.exit(1);
		}
	});
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

var vehiclesArray = [
	new Vehicle({
		vehicleId: 'BC018',
		routeId: '207',
		routeName: 'Cabral/Osorio',
		startDate: '2016-09-04T06:00:00',
		endDate: '2016-09-04T23:55:00'
	})
];

vehiclesArray.forEach(function(vehicleDoc) {
	vehicleDoc.save(function(error) {
		if (error) {
			console.log(error);
			process.exit(1);
		}
	});
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
