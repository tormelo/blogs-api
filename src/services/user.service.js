const { createToken } = require('../auth');
const { User } = require('../models');
const { validateNewUser } = require('./validations/inputValidations');

const register = async (userInfo) => {
  const error = await validateNewUser(userInfo);
  if (error.type) return error;

  const newUser = await User.create(userInfo);

  const payload = {
    id: newUser.null,
    email: newUser.email,
  };

  const token = createToken(payload);

  return { type: null, message: { token } };
};

const selfDestruct = async (userId) => {
  await User.destroy({ where: { id: userId } });
  // return { type: null, message: '' };
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
  selfDestruct,
  getAll,
  getById,
};
