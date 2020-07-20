import app from './app';
import { connect } from './db';

connect()
const PORT = process.env.PORT || 6666

app.listen(PORT, () => {
   console.clear()
   console.log(`Server listener at http://localhost:${PORT}`)
})