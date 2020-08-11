import app from './app';
import connect from './db';
import { config } from './config';
import debug from 'debug';

connect();
const { PORT } = config;

app.listen(PORT, () => {
   console.clear();
   debug('app:server')(`Server listener at http://localhost:${PORT}`);
});
