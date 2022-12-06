const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const { 
  validateNewPost, 
  validatePostUpdate, 
  validatePostAuth, 
} = require('./validations/inputValidations');

const register = async (blogPost) => {
  const error = await validateNewPost(blogPost);
  if (error.type) return error;

  const { categoryIds, ...post } = blogPost;

  const newPost = await BlogPost.create(post);
  newPost.id = newPost.null;

  await Promise.all(categoryIds.map(async (categoryId) => {
    const postCategory = { postId: newPost.id, categoryId };
    await PostCategory.create(postCategory);
  }));

  return { 
    type: null, 
    message: newPost, 
  };
};

const update = async (postId, userId, updateData) => {
  const error = await validatePostUpdate(postId, userId, updateData);
  if (error.type) return error;

  await BlogPost.update(updateData, { where: { id: postId } });

  const updatedPost = await await BlogPost.findByPk(postId, { 
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }], 
  });

  return { 
    type: null, 
    message: updatedPost, 
  };
};

const remove = async (postId, userId) => {
  const error = await validatePostAuth(postId, userId);
  if (error) return error;

  await BlogPost.destroy({ where: { id: postId } });

  return { 
    type: null, 
    message: '', 
  };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({ 
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }], 
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, { 
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }], 
  });
  if (!post) {
    return { type: 'NOT_FOUND', message: 'Post does not exist' };
  }
  return { type: null, message: post };
};

const getByQuery = async (query) => {
  const pattern = `%${query}%`;

  const posts = await BlogPost.findAll({ 
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }], 
    where: { [Op.or]: [
      { title: { [Op.like]: pattern } },
      { content: { [Op.like]: pattern } },
    ] },
  });
  
  return { type: null, message: posts };
};

module.exports = { 
  register,
  update,
  remove,
  getAll,
  getById,
  getByQuery,
};
