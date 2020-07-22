import { Router, Request, Response, NextFunction } from 'express';
import { IProduct, IProductDoc } from '../../models/Products';
import {
   createProduct,
   getProduct,
   getProducts,
   deleteProduct,
   updateProduct
} from '../../services/product.service';
import { Error } from 'mongoose';

const router: Router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      /* throw new Error('This is an error') */
      const products: Array<IProduct> = await getProducts();
      res.status(200).json({
         status: 200,
         error: "",
         data: { products }
      })
   } catch (err) {
      next(err)
   }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      const product: IProduct | null = await getProduct({ id: req.params.id });

      if(!product) throw new Error('Product not found');

      res.status(200).json({
         status: 200,
         error: "",
         data: { product }
      })
   } catch (err) {
      next(err)
   }

})


router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const { name, price, image } = req.body;
   try {
      if(!name || !price || !image ) throw new Error('Data is incomplete');
      const newProduct: IProduct = {
         name,
         price,
         image
      }
      const createdProduct = await createProduct(newProduct as IProductDoc);
      res.status(201).json({
         status: 201,
         error: "",
         data: { createdProduct }
      })
   } catch (err) {
      next(err)
   }
})

router.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      if(!req.params.id) throw new Error('ID is missing')

      const { name, price, image } = req.body;

      const updatedProduct = await updateProduct({ _id: req.params.id, name, price, image })
      res.status(200).json({
         status: 200,
         error: "",
         data: updatedProduct
      })
   } catch (err) {
      next(err)
   }
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      if(!req.params.id) throw new Error('ID is missing')

      const deletedProduct = await deleteProduct({ id: req.params.id })
      res.status(200).json({
         status: 200,
         error: "",
         data: deletedProduct
      })
   } catch (err) {
      next(err)
   }
})



export default router;