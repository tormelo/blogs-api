// const { createToken } = require('../auth');
const { Category } = require('../models');
// const { validateNewUser } = require('./validations/inputValidations');

const { validateNewCategory } = require('./validations/inputValidations');

const register = async (category) => {
  const error = await validateNewCategory(category);
  if (error.type) return error;

  const newCategory = await Category.create(category);

  return { 
    type: null, 
    message: {
      id: newCategory.null,
      name: newCategory.name,
    }, 
  };
};

module.exports = { 
  register, 
};
