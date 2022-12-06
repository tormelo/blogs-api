const { BlogPost, PostCategory, User, Category } = require('../models');
const { validateNewPost, validatePostUpdate } = require('./validations/inputValidations');

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

module.exports = { 
  register,
  update,
  getAll,
  getById,
};
