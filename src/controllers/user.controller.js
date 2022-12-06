const { userService } = require('../services');
const { mapError } = require('../utils/errorMap');

const register = async (req, res) => {
  const { type, message } = await userService.register(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = { register };