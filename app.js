const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  res.send('<h1>Home Page</h1>');
});

app.listen(3000, () => console.log(`Listening to port 3000`));
