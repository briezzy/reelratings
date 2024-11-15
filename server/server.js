const express = require('express');
const movieRoutes = require('./routes/movieRoutes');
require('dotenv').config();
const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use('/api/movies', movieRoutes);

// Simulated database (for demonstration purposes)
let users = [];
let movies = [];

// Routes for user account creation and management
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }
  // Simulate saving user to database
  users.push({ username, password, movieList: [], followers: [] });
  res.status(201).send('User registered successfully!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === 
password);
  if (!user) {
    return res.status(401).send('Invalid credentials.');
  }
  res.status(200).send('Login successful!');
});

// Routes for managing movie lists
app.post('/movies', (req, res) => {
  const { username, movie } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).send('User not found.');
  }
  user.movieList.push(movie);
  res.status(201).send('Movie added to your list!');
});

// Route for rating and reviewing movies
app.post('/rate', (req, res) => {
  const { username, movieId, rating, review } = req.body;
  const movie = movies.find(m => m.id === movieId);
  if (!movie) {
    return res.status(404).send('Movie not found.');
  }
  movie.reviews.push({ username, rating, review });
  res.status(201).send('Review and rating submitted!');
});

// Route for liking and commenting on reviews
app.post('/like', (req, res) => {
  const { username, reviewId } = req.body;
  // Simulated logic to like a review
  res.status(200).send(`Review ${reviewId} liked by ${username}!`);
});

app.post('/comment', (req, res) => {
  const { username, reviewId, comment } = req.body;
  // Simulated logic to add a comment to a review
  res.status(201).send(`Comment added by ${username} to review 
${reviewId}!`);
});

// Route for following other users
app.post('/follow', (req, res) => {
  const { username, followUsername } = req.body;
  const user = users.find(u => u.username === username);
  const followUser = users.find(u => u.username === followUsername);
  if (!user || !followUser) {
    return res.status(404).send('User not found.');
  }
  user.followers.push(followUsername);
  res.status(200).send(`You are now following ${followUsername}!`);
});

// Starting the server

app.listen(port, () => {
  console.log(`ReelRatings server running at http://localhost:${port}`);
});

