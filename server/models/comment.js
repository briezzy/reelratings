const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  reviewId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Reviews',
      key: 'id'
    }
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Comment.associate = (models) => {
  Comment.belongsTo(models.User, { foreignKey: 'userId' });
  Comment.belongsTo(models.Review, { foreignKey: 'reviewId' });
};

module.exports = Comment;
