const { BlogPost, PostCategory } = require('../models');
const { validateNewPost } = require('./validations/inputValidations');

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

module.exports = { 
  register,
};
