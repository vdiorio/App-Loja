import bodyParser = require('body-parser');
import {NextFunction, Request, Response} from 'express';
import router from './router';

const express = require('express');
const app = express();
require('dotenv').config();
const {PORT} = process.env;

app.use(bodyParser.json());
app.use(function(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  next();
});
app.use('/login', router.login);
app.use('/users', router.users);
app.use('/products', router.products);
app.use('/orders', router.orders);

app.listen(PORT);
console.log(`listening on port: ${PORT}`);

export default app;
