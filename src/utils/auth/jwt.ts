import { ExtractJwt, Strategy } from 'passport-jwt';
import passport from 'passport';
import { findUserByUsername } from '../../services/user.service';
require('dotenv').config()

passport.use("jwt", new Strategy({
   secretOrKey: process.env.SECRET_JWT || "mysecret",
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
   try {
      const user = await findUserByUsername({ username: payload.username });
      if(!user) return done(null, false);

      done(null, user)

   } catch (err) {
      done(err)
   }

}));