const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const environment = require('./util/environment');

const User = require('./models/user');

const {
  db: { user, password },
  port,
} = environment;

const PORT = port || 3001;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65771963f2af414a41ba9115')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.error(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://${user}:${password}@cluster0.tueqxki.mongodb.net/shop?retryWrites=true&w=majority`
  )
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
  .catch((err) => {
    console.error(err);
  });
