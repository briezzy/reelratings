const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

// Add a rating and review to a movie
router.post('/:movieId/review', ReviewController.addReview);

// Get all reviews for a specific movie
router.get('/:movieId/reviews', ReviewController.getReviews);

module.exports = router;
