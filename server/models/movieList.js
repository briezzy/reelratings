const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MovieList = sequelize.define('MovieList', {
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
  }
});

module.exports = MovieList;
