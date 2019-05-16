import syncTables from './models';
import sequelize = require('sequelize');
const { main: MainConfig} = require('../../../config/').storage;

export const Main = initializeWith(MainConfig);

// Main.TArticle.associate(Main);
// Main.TUser.associate(Main);
// Main中得数据表关系定义
// 关系操作完全不行
// Main.TUser.hasMany(Main.TArticle, { foreignKey: 'author', targetKey: 'username', as: 'Article' });
// Main.TArticle.belongsTo(Main.TUser, { foreignKey: 'author', as: 'Article'});
// const conn = connect(MainConfig);
// export const TUser = conn.import('./models/main/tbl_user');
// export const TArticle = conn.import('./models/main/tbl_article');

// TArticle.belongsTo(TUser, { as: 'User', foreignKey: 'author', targetKey: 'username' });
// TUser.hasMany(TArticle, { as: 'Artilce', foreignKey: 'author' });

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
			logging: console.log,
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