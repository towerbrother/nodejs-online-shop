const dotenv = require('dotenv').config().parsed;

module.exports = {
  env: dotenv.NODE_ENV,
  port: dotenv.PORT,
  // // Sequelize
  // db: {
  //   host: dotenv.SQL_DB_HOST,
  //   user: dotenv.SQL_DB_USER,
  //   database: dotenv.SQL_DB_DATABASE,
  //   password: dotenv.SQL_DB_PASSWORD,
  // },
  // MongoDB
  db: {
    user: dotenv.MONGO_DB_USER,
    password: dotenv.MONGO_DB_PASSWORD,
  },
};
