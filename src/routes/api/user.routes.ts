import { Router, NextFunction, Request, Response } from 'express';
import { createUser, getUsers } from '../../services/user.service';
import User, { IUser } from '../../models/User';

import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { validate } from '../../utils/middlewares/validationHandlers';
import { createUserSchema, loginSchema } from '../../utils/schemas/user';
import passport from 'passport';
import '../../utils/auth/passport';

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
router.post('/login', validate(loginSchema), passport.authenticate("login", {
      failureRedirect: '/',
      session: false
   }), (req, res, next) => {
      if(!req.user) return next(new Error('User not found'))
      const payload = req.user;

      const token = jwt.sign({user: payload}, process.env.SECRET_JWT || '')
      res.json({ token: token })
   })



export default router;