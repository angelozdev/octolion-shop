import { object, string } from 'yup';

export const createUserSchema = object().shape({
   username: string()
      .required()
      .min(3)
      .max(30)
      .matches(/^[A-z0-9]+$/),
   password: string()
      .required()
      .min(5)
      .max(30)
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/)
})

export const loginSchema = object().shape({
   username: string()
      .required()
      .min(3)
      .max(30)
      .matches(/^[A-z0-9]+$/),
   password: string()
      .required()
      .min(5)
      .max(30)
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/)
})
