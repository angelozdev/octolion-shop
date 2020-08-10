import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { findUserByUsername } from '../../services/user.service';
import { compare } from 'bcryptjs';
import { unauthorized } from '@hapi/boom';

passport.use(
   'login',
   new BasicStrategy(async (username, password, done) => {
      try {
         const user = await findUserByUsername({ username });
         if (!user) return done(unauthorized(), false);

         const isEqual: boolean = await compare(password, user.password);
         if (!isEqual) return done(unauthorized(), false);

         done(null, user);
      } catch (err) {
         done(err, false);
      }
   })
);
