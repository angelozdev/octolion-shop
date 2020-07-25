import { Router, NextFunction, Request, Response } from 'express';
import { createUser, getUsers } from '../../services/user.service';
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
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
   const users = await getUsers();

   res.status(200).json({
      message: "Ok",
      statusCode: 200,
      data: users
   })
})

/* Create User */
router.post('/', validate(createUserSchema), async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { username, password } = req.body;
      const newUser: IUser = {
         username,
         password: await hash(password, 10)
      }
      const createdUser = await createUser(newUser);
      res.status(201).json({
         data: createdUser,
         statusCode: 201,
         message: "Created"
      })
   } catch (err) {
      next(err)
   }
})


/* Login */
router.post(
   '/token',
   passport.authenticate("login", {
      failureRedirect: '/',
      session: false
   }),
   (req, res, next) => {
      if(!req.user) return next(new Error('User not found'))
      const { username } = req.user as IUser;

      const token = jwt.sign({ username }, process.env.SECRET_JWT || '', {
         expiresIn: '15m'
      })
      res.status(200).json({ token: token })
   }
)



export default router;