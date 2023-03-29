const jwt = require('jsonwebtoken');
const UnautorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'extra-secret-key');
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация_2');
  }
  req.user = payload;
  return next();
};
