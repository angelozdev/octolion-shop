// eslint-disable-next-line no-unused-vars
import Product, { IProduct } from '../models/Products';

export const getProducts = async (/* query */): Promise<Array<IProduct>> => {
   return await Product.find();
};

export const getProduct = async ({
   id
}: {
   id: string;
}): Promise<IProduct | null> => {
   return await Product.findById(id);
};

export const createProduct = async (product: IProduct): Promise<IProduct> => {
   return await new Product(product).save();
};

export const deleteProduct = async ({
   id
}: {
   id: string;
}): Promise<IProduct | null> => {
   return await Product.findByIdAndDelete(id);
};

export const updateProduct = async ({
   _id,
   image,
   price,
   name
}: IProduct): Promise<IProduct | null> => {
   return await Product.findByIdAndUpdate(
      _id,
      { image, price, name },
      { new: true }
   );
};
