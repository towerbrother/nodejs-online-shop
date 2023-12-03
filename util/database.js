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

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${user}:${password}@cluster0.tueqxki.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('Connected to MongoDB');
      callback(client);
    })
    .catch((err) => console.error(err));
};

module.exports = mongoConnect;
