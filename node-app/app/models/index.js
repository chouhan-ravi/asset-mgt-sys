const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DATABASE_URL, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: '1',
  protocol: dbConfig.PROTOCOL,
  //logging: true,
  pool: {
    max: dbConfig.POOL.max,
    min: dbConfig.POOL.min,
    acquire: dbConfig.POOL.acquire,
    idle: dbConfig.POOL.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.assets = require("./asset.model.js")(sequelize, Sequelize);

module.exports = db;