const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');

exports.register = async (req, res) => {
  try {
    const { email, password, password2 } = req.body;

    if (!email || !password || !password2) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (password !== password2) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const user = new User({ email, password });
    await user.save();

    res.json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ success: false, message: info.message || 'Login failed' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Login successful', user });
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.json({ success: true, message: 'Logged out successfully' });
  });
};

