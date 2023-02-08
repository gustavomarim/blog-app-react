const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../models/User');

const User = mongoose.model('users');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      (email, password, done) => {
        User.findOne({ email }).then((user) => {
          if (!user) {
            return done(null, false);
          }

          // compara os valores 'hasheados'
          bcrypt.compare(password, user.password, (error, isSamePasswords) => {
            if (isSamePasswords) {
              return done(null, user);
            }

            return done(error, false);
          });

          return null;
        });
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
