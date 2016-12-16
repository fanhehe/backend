import Sequelize = require('sequelize');
const { Main } = require('../../../config/').storage;

module.exports = {
	Main: initialize(Main),
};

function initialize(config :DBConfig) {
	const { port, host, username, password, database, connectionLimit } = config;

	return new Sequelize(
		database,
		username,
		password,
		{
			host,
			port,
			dialect: 'mysql',
			pool: {
				maxConnections: connectionLimit, 
				maxIdleTime: 0
			},
			logging:function(result){},
			sync: { force: true },
		}
	);
}

interface DBConfig {
	host: string;
	username: string;
	password: string;
	database: string;
	port: string | number;
	connectionLimit: string | number;
};