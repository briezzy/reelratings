const express = require('express');
const router = express.Router();
const InteractionController = require('../controllers/InteractController');

// Like a review
router.post('/:reviewId/like', InteractionController.likeReview);

// Comment on a review
router.post('/:reviewId/comment', InteractionController.commentOnReview);

// Get comments for a specific review
router.get('/:reviewId/comments', InteractionController.getComments);

module.exports = router;
