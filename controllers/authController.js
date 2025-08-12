const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists already
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = new User({ email, password });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginSuccess = (req, res) => {
  res.json({ success: true, user: req.user });
};

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.json({ success: true });
  });
};

exports.googleCallback = (req, res) => {
  // You can redirect or respond with user info here
  res.json({ success: true, user: req.user });
};
