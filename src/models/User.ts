import { model, Schema, Document } from 'mongoose';

export interface IUser {
   username: string
   password: string
   _id?    : string
}

export interface IUserDoc extends Document {
   username: string
   password: string
   _id     : string
}

const UserSchema: Schema = new Schema({
   username:  { type: String, required: true, unique: true },
   password: { type: String, required: true }
})

export default model<IUserDoc>('User', UserSchema, 'users');