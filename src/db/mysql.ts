import Sequelize = require('sequelize');

const mysql = require('../../config/database').default;

module.exports = {
	Main: init(mysql),
};

function init(DBConfig) {
	return new Sequelize(
		DBConfig.database,
		DBConfig.user,
		DBConfig.password,
		{
		  host: DBConfig.host,
		  port: DBConfig.port,
		  dialect: 'mysql',
		  pool: {
			maxConnections: DBConfig.connectionLimit, 
			maxIdleTime: 0
		},
		logging:function(result){
		},
		sync: { force: true }
	  }
	)
}