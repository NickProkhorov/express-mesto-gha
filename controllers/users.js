const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  return User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch((err) => res.status(err.status).send(err.message))
};

module.exports.getUserById = (req, res) => {

  return User.findById(req.params.userId)
      .then(user => res.status(200).send({ data: user }))
      .catch((err)=> res.status(err.status).send(err.message))
};

module.exports.createUser = (req, res) => { //err.name = 'ValidationError'
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => {
      if ( err.name === 'ValidationError') {
        res.status(400).send('Переданы некорректные данные при создании пользователя')
      } else {
        res.status(500).send('Ошибка по умолчанию')
      }
    })
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate( req.user._id, { name, about }, { new: true, runValidators: true })
      .then(user => res.status(200).send({ user }))
      .catch(() => res.status(400).send({ message: 'Произошла ошибка при обновлении пользователя' }));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate( req.user._id, { avatar }, { new: true })
    .then(user => res.status(200).send({ data: user }))
    .catch(() => res.status(400).send({ message: 'ошибка при создании пользователя' }))
};