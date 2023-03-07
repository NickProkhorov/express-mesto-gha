// controllers/users.js

const User = require('../models/user');

module.exports.getUsers = (req, res) => { //возвращает всех пользователей
  User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
};

module.exports.getUser = (req, res) => { //возвращает пользователя по _id
  console.log(req.params.userId);
  User.findById(req.params.userId)
      .then(user => res.status(200).send({ data: user }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
};

module.exports.createUser = (req, res) => { //создаёт пользователя
  const { name, about, avatar } = req.body; // получаем из объекта запроса имя, описание и аватар пользователя

  User.create({ name, about, avatar }) // создаем документ на основе пришедших данных
    .then(user => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'ошибка при создании пользователя' }))
};

