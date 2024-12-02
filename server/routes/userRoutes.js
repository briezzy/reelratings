const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middleware/authentication');

// Public routes
// Register a new user
router.post('/register', UserController.register);

// Login a user
router.post('/login', UserController.login);

// Follow another user
router.post('/:userId/follow', UserController.follow);


// Protected routes
router.get('/profile', auth, (req, res) => {
  res.status(200).json({ message: 'Welcome to your profile!', user: req.user });
});

module.exports = router;
