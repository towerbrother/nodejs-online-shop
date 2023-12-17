const dotenv = require('dotenv').config().parsed;

module.exports = {
  env: dotenv.NODE_ENV,
  port: dotenv.PORT,
  sessionSecretSalt: dotenv.SESSION_SECRET_SALT,
  db: {
    user: dotenv.MONGO_DB_USER,
    password: dotenv.MONGO_DB_PASSWORD,
  },
};
