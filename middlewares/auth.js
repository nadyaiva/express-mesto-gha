const jwt = require('jsonwebtoken');
const UnautorizedError = require('../utils/UnautorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { jwtToken } = req.cookies;

  if (!jwtToken) {
    throw new UnautorizedError('Необходима авторизация');
  }

  const token = jwtToken;
  let payload;

  try {
    payload = jwt.verify(token, 'secret_key');
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
