const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/router');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64065a18ed6efcd433c6d50e',
  };
  next();
});

app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('db connected');
  })
  .catch(() => {
    console.log('error db connection');
  });

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
