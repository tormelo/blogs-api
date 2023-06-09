const { categoriesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const register = async (req, res) => {
  const { type, message } = await categoriesService.register(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const getAll = async (req, res) => {
  const users = await categoriesService.getAll();
  res.status(200).json(users);
};

module.exports = { 
  register,
  getAll,
};