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
mongoose.connect('mongodb://smartfare:5m4r7f4r3@ds053216.mlab.com:53216/smartfare');

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
		console.log('REQUEST BODY: ');
		console.log(req.body);

		var receivedEvent = new Event({
			timestamp: req.body.timestamp,
			vehicleId: req.body.vehicleId,
			userId: req.body.userId,
			eventType: req.body.eventType,
			balance: req.body.balance,
			latitude: req.body.latitude,
			longitude: req.body.longitude
		});

		console.log(receivedEvent);

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

		// Queries for user to be updated
		User.findOne( { uid: req.body.userId }, function(error, doc) {
			if (error) {
				console.log(error);
				//res.send("User doesn't exist");
			} else {
				console.log(doc);
				doc.balance = req.body.balance; // Or -= req.body.fare
				doc.save();
				console.log('Saved new balance!');
				//res.send("ok");
			}

		});	

	});

	/* =====================FRONT END ROUTES=====================*/

	// Index page
	app.get('/', function(req, res) {
        res.sendFile('/public/index.html'); // load our public/index.html file
    });

    app.get('/admin/trips', function(req, res) {
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
