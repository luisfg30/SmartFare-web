/*
	SmartFare webservice
*/

// Imports modules
var express = require('express');					// Express.js
var mongoose = require('mongoose');					// mongoose (MongoDB driver)
var bodyparser = require('body-parser');			// body-parser (parse HTTP request body)
var eventSchema = require('./db/schemas/event');
var userSchema = require('./db/schemas/user');
var vehicleSchema = require('./db/schemas/vehicle');

// Connects mongoose to mongodb service
mongoose.connect('mongodb://smartfare:smart2018@ds155490.mlab.com:55490/smartfare-web');

// Creates mongoose models for each schema
// Parameters are: model name, schema, collection name
var Event = mongoose.model('Event', eventSchema, 'events');
var User = mongoose.model('User', userSchema, 'users');
var Vehicle = mongoose.model('Vehicle', vehicleSchema, 'vehicles');

// Export API methods
module.exports = function() {
	// Creates and Express.js app
	var app = express();

	// Makes app able to use the body-parser module functionality
	app.use(bodyparser.json());

	convertGPS = function(latLon){
		// console.log(latLon);
		var number = latLon.split(' ');
		var tempLatLon = number[0].toString();
		tempLatLon = tempLatLon.split('.');
		// console.log(tempLatLon[0]);
		var tempLatLonLastTwo = tempLatLon[0].slice(-2)+'.'+ tempLatLon[1];
		tempLatLonLastTwo = (Number(tempLatLonLastTwo)*100)/100;
		var tempLatLonFirst = parseInt(tempLatLon[0].slice(0,-2));
		// console.log(tempLatLonFirst);
		var initValue = tempLatLonFirst+(tempLatLonLastTwo/60);
		if(number[1] == 'S' || number[1] == 'W') {
			initValue = (-1) * initValue;
		}
	
		return initValue;
	}

app.use(express.static(__dirname + '/public'));

	// REQUEST HANDLER: Return events
	app.get('/api/trips', function(req, res) {

		// Creates mongodb query based on request parameters (located on query string)
		/*var departFlightQuery = {
			origin: req.query.origin,
			destination: req.query.destination,
			departureDate: req.query.departureDate,
			availableSeats: { $gte: req.query.numberOfPassengers }
		}*/

		// Query the trip database and executes callback function passed
		// as parameter to send response after the query has been completed
		Event.find({}, function(error, docs) {
			if (error) {
				console.log(error);
			}

			// Gets query results and send response in a JSON format
			res.send(docs);
		});
	});

	// REQUEST HANDLER: Return trips
	app.get('/api/vehicles', function(req, res) {

		// Creates mongodb query based on request parameters (located on query string)
		/*var departFlightQuery = {
			origin: req.query.origin,
			destination: req.query.destination,
			departureDate: req.query.departureDate,
			availableSeats: { $gte: req.query.numberOfPassengers }
		}*/

		// Query the trip database and executes callback function passed
		// as parameter to send response after the query has been completed
		Vehicle.find({}, function(error, docs) {
			if (error) {
				console.log(error);
			}

			// Gets query results and send response in a JSON format
			var searchResults = require('util').inspect(docs);//JSON.stringify(
			res.send(docs);
		});
	});

	// REQUEST HANDLER: Return trips
	app.get('/api/users', function(req, res) {

		// Creates mongodb query based on request parameters (located on query string)
		/*var departFlightQuery = {
			origin: req.query.origin,
			destination: req.query.destination,
			departureDate: req.query.departureDate,
			availableSeats: { $gte: req.query.numberOfPassengers }
		}*/

		// Query the trip database and executes callback function passed
		// as parameter to send response after the query has been completed
		User.find({}, function(error, docs) {
			if (error) {
				console.log(error);
			}

			// Gets query results and send response in a JSON format
			var searchResults = require('util').inspect(docs);
			res.send(docs);
		});
	});

	// REQUEST HANDLER: Update database
	app.post('/api/update', function(req, res) {
		// console.log('REQUEST BODY: ');
		// console.log(req.body);
		
		var lat = convertGPS(req.body.latitude);
		var long = convertGPS(req.body.longitude);

		// console.log(lat);
		// console.log(long);

		var receivedEvent = new Event({
			timestamp: req.body.timestamp,
			vehicleId: req.body.vehicleId,
			userId: req.body.userId,
			eventType: req.body.eventType,
			balance: req.body.balance / 100 , // Value in cents
			latitude: lat,
			longitude: long
		});

		// console.log(receivedEvent);

		receivedEvent.save(function(error) {
			if (error) {
				console.log(error);
				res.send('error');
			} else {
				res.send('ok');
				console.log('Saved event!');
				//res.send("ok");
			}
		});

		// // Queries for user to be updated
		// User.findOne( { uid: req.body.userId }, function(error, doc) {
		// 	if (error) {
		// 		console.log(error);
		// 		res.send("User doesn't exist");
		// 	} else {
		// 		console.log(doc);
		// 		doc.balance = req.body.balance; // Or -= req.body.fare
		// 		doc.save();
		// 		console.log('Saved new balance!');
		// 		res.send("ok");
		// 	}

		// });	

	});

	/* =====================FRONT END ROUTES=====================*/

	// Index page
	app.get('/', function(req, res) {
        res.sendFile('/public/index.html'); // load our public/index.html file
    });

    app.get('/admin/events', function(req, res) {
        res.sendFile(__dirname + '/public/views/tripsView.html');
    });

    app.get('/admin/users', function(req, res) {
        res.sendFile(__dirname + '/public/views/usersView.html');
    });

    app.get('/admin/vehicles', function(req, res) {
        res.sendFile(__dirname + '/public/views/vehiclesView.html');
    });

	return app;
}
