const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

// Render register page
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// Render login page
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Register (local)
router.post('/register', authController.register);

// Login (local) with JSON custom callback
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ success: false, message: info.message || 'Login failed' });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, user });
    });
  })(req, res, next);
});

// Google OAuth login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback URL
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ success: false, message: 'Google authentication failed' });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, user });
    });
  })(req, res, next);
});

// Logout
router.post('/logout', authController.logout);

module.exports = router;

