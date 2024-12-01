const User = require('../models/User'); // User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};
exports.follow = async (req, res) => {
  try {
    const { userId } = req.params;
    const { followUserId } = req.body;
    const user = await User.findById(userId);
    const followUser = await User.findById(followUserId);

    if (!user || !followUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.following.includes(followUserId)) {
      user.following.push(followUserId);
      await user.save();
    }

    res.status(200).json({ message: `Now following ${followUser.username}` 
});
  } catch (error) {
    res.status(500).json({ error: 'Failed to follow user' });
  }
};

