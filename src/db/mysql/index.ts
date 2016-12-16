import syncTables from './models';
import sequelize = require('sequelize');
const { Main: MainConfig} = require('../../../config/').storage;

export const Main = initializeWith(MainConfig);
function initializeWith (config: DBConfig) {
	const client = connect(config);
	return syncTables(client);
}

function connect(config :DBConfig): sequelize {
	const { port, host, username, password, database, connectionLimit } = config;

	return new sequelize(
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