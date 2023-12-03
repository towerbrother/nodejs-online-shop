const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const environment = require('./util/environment');
// const sequelize = require('./util/database');
const mongoConnect = require('./util/database');

// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

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

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     // sequelize object
  //     // we call call sequelize methods on the object now stored in the request
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.error(err));
});

// TEMP
// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); // user creates a product
// User.hasMany(Product);

// Cart.belongsTo(User);
// User.hasOne(Cart);

// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });

// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   // .sync({ force: true }) // ONLY DEVELOPMENT
//   .sync()
//   .then(() => {
//     return User.findByPk(1); // dummy user
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: 'Tower', email: 'tower@email.com' });
//     }

//     return Promise.resolve(user); // not strictly necessary
//   })
//   .then((user) => {
//     console.log(`Created User ${user}`);
//     return user.createCart();
//   })
//   .then((cart) => {
//     console.log(`Created cart`);
//     // we want to run our application only if the connection to the DB is successful
//     // and if a user is there - currently only dummy user with no authentication
//     app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
//   })
//   .catch((err) => console.error(err));

mongoConnect((client) => {
  console.log(client);
  // we want to run our application only if the connection to the DB is successful
  // and if a user is there - currently only dummy user with no authentication
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});
