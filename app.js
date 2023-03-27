const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const routes = require('./routes/router');
const errorHandler = require('./midllewares/error-handler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use(routes);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(PORT);
