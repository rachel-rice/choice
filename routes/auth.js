const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

// Register (local)
router.post('/register', authController.register);

// Login (local)
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
}), authController.loginSuccess);

// Google OAuth login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback URL
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login', 
    session: true,
  }),
    authController.googleCallback
);

// Logout
router.post('/logout', authController.logout);

module.exports = router;

