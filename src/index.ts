import app from './app';
import connect from './db';
import { config } from './config';

connect();
const { PORT } = config;

app.listen(PORT, () => {
   console.clear();
   console.log(`Server listener at http://localhost:${PORT}`);
});
