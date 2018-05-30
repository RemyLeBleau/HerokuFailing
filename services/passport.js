const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

//this selects the mongoID by user.id as a shorthand and passes in the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
}); 

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  //chain on the .then because it's asynchronous, wait for the promise for the value
  User.findOne({ googleID:profile.id })
    .then((existingUser) => {
      if (existingUser) {
        done(null, existingUser)
        //we already have a record of this client
      } else {
        new User ({ googleID: profile.id })
        .save()
          .then(user => done(null, user));
      }
    })

    }
  )
);
