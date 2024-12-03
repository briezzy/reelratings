const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables

// Set up Sequelize connection
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',  // Use the .env or fallback to localhost
  username: process.env.DB_USERNAME || 'username',  // Your DB username
  password: process.env.DB_PASSWORD || 'password',  // Your DB password
  database: process.env.DB_NAME || 'reelratings',  // Your DB name
  logging: false // Disable SQL logging (optional)
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Movie = require('./Movie')(sequelize, Sequelize.DataTypes);
const Review = require('./Review')(sequelize, Sequelize.DataTypes);
const MovieList = require('./MovieList')(sequelize, Sequelize.DataTypes);
const Comment = require('./Comment')(sequelize, Sequelize.DataTypes);

// Define associations
User.associate = (models) => {
  User.hasMany(models.MovieList, { foreignKey: 'userId' });
  User.belongsToMany(models.User, { as: 'Followers', through: 'Followers', foreignKey: 'userId', otherKey: 'followerId' });
};

Movie.associate = (models) => {
  Movie.belongsToMany(models.User, { through: models.MovieList, foreignKey: 'movieId' });
};

Review.associate = (models) => {
  Review.belongsTo(models.User, { foreignKey: 'userId' });
  Review.belongsTo(models.Movie, { foreignKey: 'movieId' });
  Review.hasMany(models.Comment, { foreignKey: 'reviewId' });
};

Comment.associate = (models) => {
  Comment.belongsTo(models.User, { foreignKey: 'userId' });
  Comment.belongsTo(models.Review, { foreignKey: 'reviewId' });
};

MovieList.associate = (models) => {
  MovieList.belongsTo(models.Movie, { foreignKey: 'movieId' });
  MovieList.belongsTo(models.User, { foreignKey: 'userId' });
};

// Sync models with the database
sequelize.sync({ force: false }) // `force: false` ensures tables aren't dropped each time
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Export models and sequelize instance
module.exports = { sequelize, User, Movie, Review, MovieList, Comment };
