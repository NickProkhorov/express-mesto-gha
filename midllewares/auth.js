const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация _1' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'extra-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация_2' });
  }
  req.user = payload;
  return next();
};
