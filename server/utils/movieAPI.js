const axios = require('axios');
require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

// TMDb API functions
exports.searchMoviesTMDb = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error('TMDb API error:', error);
    throw error;
  }
};

exports.getMovieDetailsTMDb = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('TMDb API error:', error);
    throw error;
  }
};

// OMDb API functions
exports.getMovieDetailsOMDb = async (title) => {
  const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('OMDb API error:', error);
    throw error;
  }
};
