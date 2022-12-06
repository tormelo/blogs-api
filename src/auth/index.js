const jwt = require('jsonwebtoken');

const { JWT_SECRET: secret } = process.env;

const config = {
  expiresIn: '1h',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, config);
  return token;
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    return { isInvalid: true, error };
  }
};

module.exports = { createToken, verifyToken };