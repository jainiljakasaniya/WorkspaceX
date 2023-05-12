const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../../config');

const TOKEN_KEY = jwtSecretKey;

// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return next(new Error('BAD_REQUEST'));
    }
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    next(new Error('UNAUTHORIZED'));
  }
};

module.exports = verifyToken;
