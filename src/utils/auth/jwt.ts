import { ExtractJwt, Strategy } from 'passport-jwt';
import passport from 'passport';
import { findUserByUsername } from '../../services/user.service';
import { config } from '../../config';
import { unauthorized } from '@hapi/boom';

passport.use(
   'jwt',
   new Strategy(
      {
         secretOrKey: config.SECRET_JWT || 'mysecret',
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      async (payload, done) => {
         try {
            const user = await findUserByUsername({
               username: payload.username
            });
            if (!user) return done(unauthorized(), false);

            done(null, user);
         } catch (err) {
            done(err);
         }
      }
   )
);
