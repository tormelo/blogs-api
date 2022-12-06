const { postService } = require('../services');
const { mapError } = require('../utils/errorMap');

const register = async (req, res) => {
  const { id: userId } = req.user;
  const postData = { userId, ...req.body };
  
  const { type, message } = await postService.register(postData);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const update = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  const { type, message } = await postService.update(postId, userId, req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  const { type, message } = await postService.remove(postId, userId);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(204).send();
};

const getAll = async (req, res) => {
  const posts = await postService.getAll();
  res.status(200).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const getByQuery = async (req, res) => {
  const { q } = req.query;
  const { message } = await postService.getByQuery(q);

  res.status(200).json(message);
};

module.exports = { 
  register,
  update,
  remove,
  getAll,
  getById,
  getByQuery,
};