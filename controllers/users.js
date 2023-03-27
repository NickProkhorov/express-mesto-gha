const http2 = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const StatusConflictError = require('../errors/status-conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const UnautorizedError = require('../errors/unauthorized-err');

module.exports.getUsers = (req, res, next) => User.find({}) // done
  .then((users) => res.status(http2.constants.HTTP_STATUS_OK).send({ data: users }))
  .catch(next);

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным id не найден');
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(http2.constants.HTTP_STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new StatusConflictError('Пользователь с такими данными уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные пользователя'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'extra-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        next(new UnautorizedError('Неправильные почта или пароль'));
      }
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Пользователь c указанным id не найден'); })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным id не найден');
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send({ data: user });
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным id не найден');
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send({ data: user });
    })
    .catch(next);
};
