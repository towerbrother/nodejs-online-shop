const dotenv = require('dotenv').config().parsed;

module.exports = {
  env: dotenv.NODE_ENV,
  port: dotenv.PORT,
  db: {
    host: dotenv.SQL_DB_HOST,
    user: dotenv.SQL_DB_USER,
    database: dotenv.SQL_DB_DATABASE,
    password: dotenv.SQL_DB_PASSWORD,
  },
};
