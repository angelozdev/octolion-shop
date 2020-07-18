import app from './app';

app.listen(app.get('port'), () => {
   console.log(`Server listener at http://localhost:${app.get('port')}`)
})