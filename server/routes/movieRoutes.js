const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/MovieController');

// Add a movie to a user’s list
router.post('/:userId/add', MovieController.addMovie);

// Get movies in a user’s list
router.get('/:userId/list', MovieController.getUserMovies);

// Remove a movie from the user’s list
router.delete('/:userId/remove/:movieId', MovieController.removeMovie);

// Search for movies by title
router.get('/search', MovieController.searchMovies);

// Get detailed information for a specific movie by ID
router.get('/:movieId/details', MovieController.getMovieDetails);

module.exports = router;
