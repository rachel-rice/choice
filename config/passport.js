const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  // Local Strategy
  passport.use(new LocalStrategy(
    {usernameField: 'email'},
    async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'No user found' });

      if (!user.password) {
        return done(null, false, { message: 'No local password set. Please log in with Google.' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // Google OAuth Strategy
  // passport.use(new GoogleStrategy({
  //     clientID: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //     callbackURL: "/auth/google/callback"
  //   },
  //   async (accessToken, refreshToken, profile, done) => {
  //     try {
  //       let user = await User.findOne({ googleId: profile.id });
  //       if (!user) {
  //         user = await User.create({
  //           googleId: profile.id,
  //           email: profile.emails[0].value,
  //           password: '' 
  //         });
  //       }
  //       return done(null, user);
  //     } catch (err) {
  //       return done(err);
  //     }
  //   }
  // ));

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

