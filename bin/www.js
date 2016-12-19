
var http = require('http');
var https = require('https');

var app = require('../dist/app');
var config = require('../config');

var port = process.env.PORT || config.port;

// https.createServer({key: '',cert: ''}, app);
var server = http.createServer(app.callback());

server.on('error', onError);
server.on('listening', onListening);

server.listen(port);

function normalizePort (value) {
	const port = parseInt(value, 100);

	if (isNaN(port)) {
		return value;
	} else {
		return port;
	}
}

function onError () {}
function onListening () {
	console.log('the server is listen at ', port);
}