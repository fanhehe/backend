import Sequelize from 'sequelize';

const mysql = require('../config/database').default;

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

export default {
    Main: init(mysql),
};