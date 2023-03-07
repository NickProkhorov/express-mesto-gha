// controllers/users.js

const User = require('../models/user');
// DONE
module.exports.getUsers = (req, res) => { //возвращает всех пользователей
  User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
};
// DONE
module.exports.getUser = (req, res) => { //возвращает пользователя по _id
  console.log(req.params.userId);
  User.findById(req.params.userId)
      .then(user => res.status(200).send({ data: user }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
};
// DONE
module.exports.createUser = (req, res) => { //создаёт пользователя
  const { name, about, avatar } = req.body; // получаем из объекта запроса имя, описание и аватар пользователя

  User.create({ name, about, avatar }) // создаем документ на основе пришедших данных
    .then(user => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'ошибка при создании пользователя' }))
};
// DONE
module.exports.updateUserProfile = (req, res) => { // обновим имя найденного по _id пользователя
  const { name, about } = req.body; // получаем из объекта запроса имя и описание профиля
  User.findByIdAndUpdate( req.user._id, { name, about }, { new: true })
      .then(user => res.status(200).send({ data: user }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка при обновлении пользователя' }));
};

// DONE
module.exports.updateUserAvatar = (req, res) => { //обновляет аватар пользователя
  const { avatar } = req.body; // получаем из объекта запроса аватар профиля
  User.findByIdAndUpdate( req.user._id, { avatar }, { new: true }) // создаем документ на основе пришедших данных
    .then(user => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'ошибка при создании пользователя' }))
};



