import Product, { IProduct, IProductDoc } from '../models/Products';


 export const getProducts = async (): Promise<Array<IProduct>> => {
   return await Product.find();
}

export const getProduct = async ({ id }: { id: string }): Promise<IProduct | null> => {
   return await Product.findById(id)
}

export const createProduct = async (product: IProductDoc): Promise<IProduct> => {
   const newProduct: IProduct = await Product.create(product)
   return Promise.resolve(newProduct)
}

