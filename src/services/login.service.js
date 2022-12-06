const { createToken } = require('../auth');
const { User } = require('../models');

const login = async (loginInfo) => {
  const { email, password } = loginInfo;

  if (!email || !password) {
    return { type: 'REQUIRED_FIELD', message: 'Some required fields are missing' };
  }

  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return { type: 'INVALID_FIELD', message: 'Invalid fields' };
  }

  const token = createToken(user.email);

  return { type: null, message: { token } };
};

module.exports = { login };