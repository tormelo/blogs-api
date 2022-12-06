const { userSchema, categorySchema, postSchema, updatePostSchema } = require('./schemas');
const { User, Category, BlogPost } = require('../../models');

const validateNewUserInfo = (userInfo) => {
  const { error } = userSchema.validate(userInfo);

  if (error) { 
    const { message } = error;
    return { type: 'INVALID_FIELD', message }; 
  }
};

const validateNewUserEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    return { type: 'ALREADY_IN_DB', message: 'User already registered' }; 
  }
};

const validateNewUser = async (userInfo) => {
  const dataError = validateNewUserInfo(userInfo);
  if (dataError) return dataError;

  const emailError = await validateNewUserEmail(userInfo.email);
  if (emailError) return emailError;

  return { type: null, message: '' };
};

const validateNewCategory = (category) => {
  const { error } = categorySchema.validate(category);

  if (error) { 
    const { message } = error;
    return { type: 'INVALID_FIELD', message }; 
  }

  return { type: null, message: '' };
};

const validateNewPostData = (post) => {
  const { error } = postSchema.validate(post);

  if (error) { 
    return { type: 'INVALID_FIELD', message: 'Some required fields are missing' }; 
  }
};

const validateNewPostCategories = async (categories) => {
  let notFound = false;

  await Promise.all(categories.map(async (categoryId) => {
    const category = await Category.findByPk(categoryId);
    if (!category) notFound = true;
  }));

  if (notFound) return { type: 'INVALID_FIELD', message: 'one or more "categoryIds" not found' };
};

const validateNewPost = async (post) => {
  const dataError = validateNewPostData(post);
  if (dataError) return dataError;

  const categoriesError = await validateNewPostCategories(post.categoryIds);
  if (categoriesError) return categoriesError;

  return { type: null, message: '' };
};

const validatePostUpdateData = (updateData) => {
  const { error } = updatePostSchema.validate(updateData);

  if (error) { 
    return { type: 'INVALID_FIELD', message: 'Some required fields are missing' }; 
  }
};

const validatePostAuth = async (postId, userId) => {
  const post = await BlogPost.findByPk(postId);

  if (!post) {
    return { type: 'NOT_FOUND', message: 'Post does not exist' };
  }

  if (post.userId !== userId) {
    return { type: 'UNAUTHORIZED', message: 'Unauthorized user' }; 
  } 
};

const validatePostUpdate = async (postId, userId, updateData) => {
  const dataError = validatePostUpdateData(updateData);
  if (dataError) return dataError;

  const authError = await validatePostAuth(postId, userId);
  if (authError) return authError;

  return { type: null, message: '' };
};

module.exports = { 
  validateNewUser, 
   validateNewCategory,
   validateNewPost,
   validatePostUpdate,
   validatePostAuth,
};
