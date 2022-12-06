const { userSchema, categorySchema } = require('./schemas');
const { User } = require('../../models');

const validateNewUserEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    return { type: 'ALREADY_IN_DB', message: 'User already registered' }; 
  }
};

const validateNewUserInfo = (userInfo) => {
  const { error } = userSchema.validate(userInfo);

  if (error) { 
    const { message } = error;
    return { type: 'INVALID_FIELD', message }; 
  }
};

const validateNewUser = async (userInfo) => {
  const dataError = validateNewUserInfo(userInfo);
  if (dataError) return dataError;

  const emailError = await validateNewUserEmail(userInfo.email);
  if (emailError) return emailError;

  return { type: null, message: '' };
};

const validateNewCategory = async (category) => {
  const { error } = categorySchema.validate(category);

  if (error) { 
    const { message } = error;
    return { type: 'INVALID_FIELD', message }; 
  }

  return { type: null, message: '' };
};

module.exports = { 
  validateNewUser, 
   validateNewCategory,
};
