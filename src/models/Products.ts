import { model, Schema, Document } from 'mongoose';

export interface IProductDoc extends Document{
   _id: string
   name: string
   price: number
   image: string
}

export interface IProduct {
   _id?: string
   name: string
   price: number
   image: string
}

const ProductSchema = new Schema({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   image: { type: String, default: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" }
},
{
   timestamps: true
})

export default model<IProductDoc>('Product', ProductSchema, 'products')