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

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) {
    return { type: 'NOT_FOUND', message: 'User does not exist' };
  }
  return { type: null, message: user };
};

module.exports = { 
  register, 
  getAll,
  getById,
};
