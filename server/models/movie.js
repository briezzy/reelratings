const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

Movie.associate = (models) => {
  Movie.belongsToMany(models.User, { through: models.MovieList, foreignKey: 'movieId' });
};

module.exports = Movie;
