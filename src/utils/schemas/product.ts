import { string, number, object, ObjectSchema } from 'yup';


export const productIdSchema: ObjectSchema = object().shape({
   id: string().matches(/^[0-9a-fA-F]{24}/)
});

export const createProductSchema: ObjectSchema = object().shape({
   name: string()
      .max(50)
      .required()
      .min(1),
   price: number()
      .min(1)
      .required()
      .max(10000000),
   image: string()
})

export const updateProductSchema: ObjectSchema = object().shape({
   name: string()
      .max(50),
   price: number()
      .min(1)
      .max(1000000),
   image: string()
})