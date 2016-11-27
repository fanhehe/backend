var fs = require('fs');
var path = require('path');
var config = require('./deploy.json');

var env = process.env.NODE_ENV || 'product';
var dev = env === 'development';

if (dev || fs.existsSync('./local.json')) {
    env = 'development';
    config = require('./local.json');
}

module.exports = config[env];
