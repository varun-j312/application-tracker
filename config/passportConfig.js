const db = require("../models");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.User.getUser((err, data) => {
      done(err, data);
    });
  });

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      (req, username, password, done) => {
        if (!req.user) {
          db.User.getUser(username, (err, user) => {
            if (err) {
              return done(err);
            } else if (!user[0]) {
              return done(null, false);
            } else {
              bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                  done(err);
                } else if (result) {
                  delete user[0].password;
                  done(null, user[0]);
                } else {
                  done(null, false);
                }
              });
            }
          });
        } else if (req.user) {
          done(null, req.user);
        } else {
          return done(null, false);
        }
      }
    )
  );
};
