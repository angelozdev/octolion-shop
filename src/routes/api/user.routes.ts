import { Router } from 'express';
import { config } from '../../config';
import { createUser, getUsers } from '../../services/user.service';
// eslint-disable-next-line no-unused-vars
import { IUser } from '../../models/User';

import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { validate } from '../../utils/middlewares/validationHandlers';
import { createUserSchema } from '../../utils/schemas/user';
import passport from 'passport';

/* Strategies */
import '../../utils/auth/login';

const router: Router = Router();

/* Get Users */
router.get('/', async (req, res, next) => {
   const users = await getUsers();

   res.status(200).json({
      message: 'Ok',
      statusCode: 200,
      data: users
   });
});

/* Create User */
router.post('/', validate(createUserSchema), async (req, res, next) => {
   try {
      const { username, password } = req.body;
      const newUser: IUser = {
         username,
         password: await hash(password, 10)
      };
      const createdUser = await createUser(newUser);
      res.status(201).json({
         data: createdUser,
         statusCode: 201,
         message: 'Created'
      });
   } catch (err) {
      next(err);
   }
});

/* Login */
router.post(
   '/token',
   passport.authenticate('login', {
      failureRedirect: '/',
      session: false
   }),
   (req, res, next) => {
      const { username } = req.user as IUser;

      const token = jwt.sign({ username }, config.SECRET_JWT || '', {
         expiresIn: '15m'
      });
      res.status(200).json({ access_token: token });
   }
);

export default router;
