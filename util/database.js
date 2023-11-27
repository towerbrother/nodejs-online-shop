const Sequelize = require('sequelize');

const environment = require('./environment');

const {
  db: { database, host, user, password },
} = environment;

const sequelize = new Sequelize(database, user, password, {
  dialect: 'mysql',
  host,
});

module.exports = sequelize;
