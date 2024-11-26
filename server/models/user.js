const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure your Sequelize instance is exported here

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.associate = (models) => {
  User.hasMany(models.MovieList, { foreignKey: 'userId' });
  User.belongsToMany(models.User, { as: 'Followers', through: 'Followers', foreignKey: 'userId', otherKey: 'followerId' });
};

module.exports = User;
