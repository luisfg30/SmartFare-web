/*
	SmartFare webservice
*/

// Imports modules
var express = require('express');					// Express.js
var mongoose = require('mongoose');					// mongoose (MongoDB driver)
var bodyparser = require('body-parser');			// body-parser (parse HTTP request body)
var tripSchema = require('./schemas/trip');
var userSchema = require('./schemas/user');
var vehicleSchema = require('./schemas/vehicle');

// Connects mongoose to mongodb service
mongoose.connect('mongodb://localhost:27017/test');

// Creates mongoose models for each schema
// Parameters are: model name, schema, collection name
var Trip = mongoose.model('Trip', tripSchema, 'trips');
var User = mongoose.model('User', userSchema, 'users');
var Vehicle = mongoose.model('Vehicle', vehicleSchema, 'vehicle');

// Export API methods
module.exports = function() {
	// Creates and Express.js app
	var app = express();

	// Makes app able to use the body-parser module functionality
	app.use(bodyparser.json());

	/*
	// REQUEST HANDLER: Search flight
	app.get('/search/flight', function(req, res) {

		// Creates mongodb query based on request parameters (located on query string)
		var departFlightQuery = {
			origin: req.query.origin,
			destination: req.query.destination,
			departureDate: req.query.departureDate,
			availableSeats: { $gte: req.query.numberOfPassengers }
		}

		// Query the flight database and executes callback function passed
		// as parameter to send response after the query has been completed
		Flight.find(departFlightQuery, function(error, docs) {
			if (error) {
				console.log(error);
			}

			// Gets query results and send response in a JSON format
			var searchResults = require('util').inspect(docs);
			res.send(searchResults);
		});
	});

	// REQUEST HANDLER: Search hotel
	app.get('/search/hotel', function(req, res) {

		// Creates mongodb query based on request parameters (located on query string)
		var hotelQuery = {
			city: req.query.city,
			availableRooms: { $gte: req.query.numberOfGuests }
		}
		
		// Query the hotel database and executes callback function passed
		// as parameter to send response after the query has been completed
		Hotel.find(hotelQuery, function(error, docs) {
			if (error) {
				console.log(error);
			}

			// Gets query results and send response in a JSON format
			var searchResults = require('util').inspect(docs);
			res.send(searchResults);
		});
	});
	*/

	// REQUEST HANDLER: Update database
	app.post('/update', function(req, res) {
		console.log('REQUEST BODY: ');
		console.log(req.body);

		var tripDoc = new Trip({
			userId: req.body.userId,
			vehicleId: req.body.vehicleId,
			fare: req.body.fare,
			balance: req.body.balance,
			distance: req.body.distance,
			inOdometerMeasure: req.body.inOdometerMeasure,
			inTimestamp: req.body.inTimestamp,
			inLatitude: req.body.inLatitude,
			inLongitude: req.body.inLongitude,
			outOdometerMeasure: req.body.outOdometerMeasure,
			outTimestamp: req.body.outTimestamp,
			outLatitude: req.body.outLatitude,
			outLongitude: req.body.outLongitude
		});

		tripDoc.save(function(error) {
			if (error) {
				console.log(error);
				res.send('error');
			} else {
				res.send('ok');
			}
		});

		// Queries for user to be updated
		User.findOne( { userId: req.body.userId }, function(error, doc) {
			if (error) {
				console.log(error);
				res.send("User doesn't exist");
			} else {
				doc.balance = req.body.balance; // Or -= req.body.fare
				doc.save();
				res.send("ok");
			}

		});	

	});

	return app;
}
