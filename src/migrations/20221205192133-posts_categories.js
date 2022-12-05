'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
      },
      category_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface) => queryInterface.dropTable('posts_categories'),
};
