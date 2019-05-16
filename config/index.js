var fs = require('fs');
var path = require('path');

var config = require('./deploy.json');

var env = process.env.NODE_ENV || 'product';
var dev = env === 'development';

if (dev && fs.existsSync(path.join(__dirname, 'local.json'))) {
    config = require('./local.json');
    process.env.NODE_ENV = 'development';
}

module.exports = config[env];
