const { createToken } = require('../auth');
const { User } = require('../models');
const { validateNewUser } = require('./validations/inputValidations');

const register = async (userInfo) => {
  const error = await validateNewUser(userInfo);
  if (error.type) return error;

  const newUser = await User.create(userInfo);

  const token = createToken(newUser.email);

  return { type: null, message: { token } };
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

module.exports = { 
  register, 
  getAll,
};
