"use strict";
var sequelize_1 = require("sequelize");
var mysql = require('../config/database').default;
function init(DBConfig) {
    return new sequelize_1.default(DBConfig.database, DBConfig.user, DBConfig.password, {
        host: DBConfig.host,
        port: DBConfig.port,
        dialect: 'mysql',
        pool: {
            maxConnections: DBConfig.connectionLimit,
            maxIdleTime: 0
        },
        logging: function (result) {
        },
        sync: { force: true }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Main: init(mysql),
};
