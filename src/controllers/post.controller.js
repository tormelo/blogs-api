const { postService } = require('../services');
const { mapError } = require('../utils/errorMap');

const register = async (req, res) => {
  const { id: userId } = req.user;
  const postData = { userId, ...req.body };
  
  const { type, message } = await postService.register(postData);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const getAll = async (req, res) => {
  const posts = await postService.getAll();
  res.status(200).json(posts);
};

module.exports = { 
  register,
  getAll,
};