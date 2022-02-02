const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  errorHandler,
  logErrors,
  boomErrorHandler
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whiteList = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (request, response) => {
  response.send('Mi server en Express');
});

app.get('/nueva-ruta', (request, response) => {
  response.send('Hola, soy un nuevo endpoint');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' + port);
});
