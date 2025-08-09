const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, user: req.user });
});

// Logout
router.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;

