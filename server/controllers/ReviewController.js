const Movie = require('../models/Movie'); // Movie model
const Review = require('../models/Review'); // Review model

exports.addReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId, rating, reviewText } = req.body;

    const review = new Review({ user: userId, movie: movieId, rating, 
text: reviewText });
    await review.save();

    res.status(201).json({ message: 'Review added!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movie: movieId 
}).populate('user');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};

