import { Router, Request, Response, NextFunction } from 'express';
import { IProduct } from '../../models/Products';
import { createProductSchema, updateProductSchema, productIdSchema } from '../../utils/schemas/product';
import { validate, reqCheck } from '../../utils/middlewares/validationHandlers';
import {
   createProduct,
   getProduct,
   getProducts,
   deleteProduct,
   updateProduct
} from '../../services/product.service';

const router: Router = Router();


/* Get all products */
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      /* throw new Error('This is an error') */
      const products: Array<IProduct> = await getProducts();
      res.status(200).json({
         statusCode: 200,
         data: { products },
         message: "ok"
      })
   } catch (err) {
      next(err)
   }
})


/* Get only one product */
router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      const product: IProduct | null = await getProduct({ id: req.params.id });

      if(!product) throw new Error('Product not found');

      res.status(200).json({
         statusCode: 200,
         message: "ok",
         data: { product }
      })
   } catch (err) {
      next(err)
   }

})


/* Create Product */
router.post('/', validate(createProductSchema, reqCheck["body"]), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const { name, price, image } = req.body;
   try {
      const newProduct: IProduct = {
         name,
         price,
         image
      }
      const createdProduct = await createProduct(newProduct);
      res.status(201).json({
         statusCode: 201,
         data: { createdProduct },
         message: "Created"
      })
   } catch (err) {
      next(err)
   }
})


/* Update a product */
router.put('/:id', validate(productIdSchema, reqCheck["params"]), validate(updateProductSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      const { name, price, image } = req.body;

      const updatedProduct = await updateProduct({ _id: req.params.id, name, price, image })
      res.status(200).json({
         statusCode: 200,
         message: "ok",
         data: updatedProduct
      })
   } catch (err) {
      next(err)
   }
})


/* Delete a product */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      if(!req.params.id) throw new Error('ID is missing')

      const deletedProduct = await deleteProduct({ id: req.params.id })
      res.status(200).json({
         statusCode: 200,
         message: "ok",
         data: deletedProduct
      })
   } catch (err) {
      next(err)
   }
})



export default router;