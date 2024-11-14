const Review = require('../models/Review'); // Review model

exports.likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ error: 'Review not found' 
});

    review.likes += 1;
    await review.save();

    res.status(200).json({ message: 'Review liked!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to like review' });
  }
};

exports.commentOnReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId, commentText } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Review not found' 
});

    review.comments.push({ user: userId, text: commentText });
    await review.save();

    res.status(201).json({ message: 'Comment added!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await 
Review.findById(reviewId).populate('comments.user');

    if (!review) return res.status(404).json({ error: 'Review not found' 
});

    res.status(200).json(review.comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
};

