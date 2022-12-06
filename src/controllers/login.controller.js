const { loginService } = require('../services');
const { mapError } = require('../utils/errorMap');

const login = async (req, res) => {
  const { type, message } = await loginService.login(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = { login };