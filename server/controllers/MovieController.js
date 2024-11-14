const User = require('../models/User');
const Movie = require('../models/Movie'); // Movie model

exports.addMovie = async (req, res) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    user.movieList.push(movieId);
    await user.save();

    res.status(201).json({ message: 'Movie added to list!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add movie' });
  }
};

exports.getUserMovies = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('movieList');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user.movieList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve movies' });
  }
};

exports.removeMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    user.movieList = user.movieList.filter((id) => id.toString() !== 
movieId);
    await user.save();

    res.status(200).json({ message: 'Movie removed from list' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove movie' });
  }
};

