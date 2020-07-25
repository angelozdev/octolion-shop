import passport from 'passport';
import passportLocal from 'passport-local';
import { findUserByUsername } from '../../services/user.service';
import { compare } from 'bcryptjs';

const Strategy = passportLocal.Strategy;

passport.use("login", new Strategy({
   passwordField: "password",
   usernameField: "username",
   passReqToCallback: true
}, async (req, username, password, done) => {
      try {
         const user = await findUserByUsername({ username })
         if(!user) return done(null, false)

         const isEqual: boolean = await compare(password, user.password);
         if(!isEqual) return done(null, false)

         done(null, user);
      } catch (err) {
         done(err, false)
      }
   })
)

