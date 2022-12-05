const login = require('../services/login.service');
const { mapError } = require('../utils/errorMap');

module.exports = async (req, res) => {
  const { type, message } = await login(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};