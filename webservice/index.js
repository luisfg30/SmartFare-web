/*
	Server startup file
*/

// Imports the implemented RESTful API
var smartfare = require('./smartfare');

// Starts server on port 3000
smartfare().listen(3000);
console.log('Server listening on port 3000');
