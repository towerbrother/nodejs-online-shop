const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./util/database');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const environment = require('./util/environment');

const app = express();

const PORT = environment.port || 3001;

app.set('view engine', 'ejs');
app.set('views', 'views');

db.execute('SELECT * FROM products')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
