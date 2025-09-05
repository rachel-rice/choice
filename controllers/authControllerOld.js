const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists already
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ success: true, message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.json({ success: true, message: 'Logged out successfully' });
  });
};

exports.googleCallback = (req, res) => {
  res.json({ success: true, user: req.user });
};
