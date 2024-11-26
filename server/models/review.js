const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  movieId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Movies',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Review.associate = (models) => {
  Review.belongsTo(models.User, { foreignKey: 'userId' });
  Review.belongsTo(models.Movie, { foreignKey: 'movieId' });
  Review.hasMany(models.Comment, { foreignKey: 'reviewId' });
};

module.exports = Review;
