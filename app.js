const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const environment = require('./util/environment');

const User = require('./models/user');

const {
  db: { user, password, dbName },
  port,
  sessionSecretSalt,
} = environment;

const PORT = port || 3001;

const MONGO_DB_URI = `mongodb+srv://${user}:${password}@cluster0.tueqxki.mongodb.net/${dbName}?w=majority`;

const app = express();
const store = new MongoDBStore({
  uri: MONGO_DB_URI,
  databaseName: dbName,
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: sessionSecretSalt,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Tower',
          email: 'tower@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
  })
  .catch((err) => console.error(err));
