import mongoose from 'mongoose';
import { config } from './config';

const { DB_USER, DB_PASSWORD, DB_NAME } = config;

const MONGODB_URI: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@typescript-node.ac5xx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const handleError = (err: Error) => {
   console.error(err);
   process.exit(1);
};

const connect = () => {
   mongoose
      .connect(MONGODB_URI, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useFindAndModify: false,
         useCreateIndex: true
      })
      .then(() => console.log('[DB] Connected'))
      .catch(handleError);
};

export default connect;
