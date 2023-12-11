const dotenv = require('dotenv').config().parsed;

module.exports = {
  env: dotenv.NODE_ENV,
  port: dotenv.PORT,
  db: {
    user: dotenv.MONGO_DB_USER,
    password: dotenv.MONGO_DB_PASSWORD,
  },
};
