const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const environment = require('./util/environment');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');

const app = express();

const PORT = environment.port || 3001;

/**
 * When running "npm start" each one of these middlewares are only
 * registered as functions but they are not executed.
 * They are executed only when an incoming request comes.
 */

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user; // sequelize object - we will be able to call sequelized methods on the object now stored in the request
      next();
    })
    .catch((err) => console.error(err));
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); // user creates a product
User.hasMany(Product);

sequelize
  // .sync({ force: true }) // ONLY DEVELOPMENT
  .sync()
  .then(() => {
    return User.findByPk(1); // dummy user
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Tower', email: 'tower@email.com' });
    }

    return Promise.resolve(user);
  })
  .then((user) => {
    console.log(`User ${user}`);
    // we want to run our application only if the connection to the DB is successful
    // and if a user is there - currently only dummy user with no authentication
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
  })
  .catch((err) => console.error(err));
