// const Sequelize = require('sequelize');

// const environment = require('./environment');

// const {
//   db: { database, host, user, password },
// } = environment;

// const sequelize = new Sequelize(database, user, password, {
//   dialect: 'mysql',
//   host,
// });

// module.exports = sequelize;

const environment = require('./environment');

const {
  db: { user, password },
} = environment;

const { MongoClient } = require('mongodb');

// underscore signifies only that it is an internal variable
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${user}:${password}@cluster0.tueqxki.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('Connected to MongoDB');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No DB found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
