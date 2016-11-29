import app from '../src/app';
const http = require('http');
const https = require('https');

const config = require('../config');

const port = process.env.PORT || config.port;


// https.createServer({key: '',cert: ''}, app);
http.createServer(app.callback()).listen(port, function () {
    console.log(`the server is listening on port ${port}`);
});

function normalizePort (value) {
    const port = parseInt(value, 100);

    if (isNaN(port)) {
        return value;
    } else {
        return port;
    }
}
