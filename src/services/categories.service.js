const { Category } = require('../models');
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

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = { 
  register, 
  getAll,
};
