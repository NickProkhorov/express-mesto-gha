const express = require('express'); // express import
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/users');
const { PORT = 3000 } = process.env;
const app = express(); //возвращает функцию конструктор с методами get, listen, use и др.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64065a18ed6efcd433c6d50e'
  };
  next();
});
app.use(routes);



mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() =>{
    console.log('connected');
  })
  .catch(()=>{
    console.log('error db connection');
  })

app.get('/', (req, res) => { // логика обработки запроса
  res.send('hello world!');
});

app.listen(PORT, () => { // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
