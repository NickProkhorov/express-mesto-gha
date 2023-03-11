const UserNotFound = require('../errors/usernotfound');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  return User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: 'Ошибка по умолчанию' }))
};

module.exports.getUserById = (req, res) => {
  return User.findById(req.params.userId)
      .then((user) => {
        if(!user) {
          return res.status(404).send({ message: "Пользователь c указанным id не найден" })
        }
        res.status(200).send({ data: user })})
      .catch((err)=> {
        if (err.name === 'ValidationError') {
          return res.status(400).send({ message: "Переданы некорректные данные при обновлении профиля" })
        } else {
          res.status(500).send({message: 'Ошибка по умолчанию'})
        }
      })
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => {
      if ( err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные при создании пользователя'})
      } else {
        res.status(500).send({message: 'Ошибка по умолчанию'})
      }
    })
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate( req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => {
        if(!user) {
          return res.status(404).send({ message: "Пользователь c указанным id не найден" })
        }
        res.status(200).send({ data: user })})
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(400).send({ message: "Переданы некорректные данные при обновлении профиля" })
        } else {
          res.status(500).send({message: 'Ошибка по умолчанию'})
        }
      })
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate( req.user._id, { avatar }, { new: true })
      .then((user) => {
        if(!user) {
          return res.status(404).send({ message: "Пользователь c указанным id не найден" })
        }
        res.status(200).send({ data: user })})
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(400).send({ message: "Переданы некорректные данные при обновлении аватара профиля" })
        } else {
          res.status(500).send({message: 'Ошибка по умолчанию'})
        }
      })
};