import { Router, Response, Request } from 'express';
import { getProducts } from '../../services/product.service';
import { IProduct } from '../../models/Products';
const router: Router = Router();



router.get('/', async (req: Request, res: Response) => {
   const products: Array<IProduct> = await getProducts()
   res.render('products/index', { products, title: "Express | Products" })
})


export default router;