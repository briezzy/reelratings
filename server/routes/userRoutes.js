const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Register a new user
router.post('/register', UserController.register);

// Login a user
router.post('/login', UserController.login);

// Follow another user
router.post('/:userId/follow', UserController.follow);

module.exports = router;
