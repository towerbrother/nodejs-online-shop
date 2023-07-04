const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="product" /><button type="submit">Add Product</button></form>'
  );
});

app.post('/product', (req, res, next) => {
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Home Page</h1>');
});

app.listen(3000, () => console.log(`Listening to port 3000`));
