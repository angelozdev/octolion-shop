import { Router, Request, Response, NextFunction } from 'express';
import { IProduct, IProductDoc } from '../../models/Products';
import { createProduct, getProduct, getProducts } from '../../services/product.service';

const router: Router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
   const products: Array<IProduct> = await getProducts();
   res.status(200).json({
      status: 200,
      error: "",
      data: { products }
   })
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      const product: IProduct | null = await getProduct({ id: req.params.id });
      if(!product) {
         res.status(404).json({
            status: req.statusCode || 404,
            error: "Product not found",
            data: null
         })
         throw new Error('Product not found')
      }

      res.status(200).json({
         status: 200,
         error: "",
         data: { product }
      })
   } catch (error) {
      next(error)
   }

})


router.post('/', async (req: Request, res: Response): Promise<void> => {
   const { name, price, image } = req.body;
   if(!name || !price || !image ) {
      res.status(422).json({
         status: 422,
         error: "Data incomplete",
         data: null
      })
      return;
   }
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
})

router.put('/:id', (req: Request, res: Response): void => {
   res.send('soon')
})

router.delete('/:id', (req: Request, res: Response): void => {
   res.send('soon')
})



export default router;