import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const {
   MONGODB_USER,
   MONGODB_PASSWORD,
   MONGODB_DATABASE
} = process.env;

const MONGODB_URI: string = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@typescript-node.ac5xx.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`
export const connect = () => {
   mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true
   })
   .then(() => console.log('[DB] Connected'))
   .catch(err => {
      console.error(err)
      setTimeout(() => {
         connect()
      }, 5000);
   })
}