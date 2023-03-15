const http2 = require('http2');
const User = require('../models/user');

module.exports.getUsers = (req, res) => User.find({})
  .then((users) => res.status(http2.constants.HTTP_STATUS_OK).send({ data: users }))
  .catch(() => res.status(http2.constants.NGHTTP2_INTERNAL_ERROR).send({ message: 'Ошибка по умолчанию' }));

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при запросе пользователя' });
      } else {
        res.status(http2.constants.NGHTTP2_INTERNAL_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(http2.constants.HTTP_STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(http2.constants.NGHTTP2_INTERNAL_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(http2.constants.NGHTTP2_INTERNAL_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара профиля' });
      }
      return res.status(http2.constants.NGHTTP2_INTERNAL_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};
