const { userService } = require('../services');
const { mapError } = require('../utils/errorMap');

const register = async (req, res) => {
  const { type, message } = await userService.register(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const getAll = async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = { 
  register,
  getAll,
  getById,
};