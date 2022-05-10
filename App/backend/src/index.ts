import bodyParser = require('body-parser');
import router from './router';

const express = require('express');
const app = express();
require('dotenv').config();
const {PORT} = process.env;

app.use(bodyParser.json());
app.use('/login', router.login);
app.use('/users', router.users);
app.use('/products', router.products);
app.use('/orders', router.orders);

app.listen(PORT);
console.log(`listening on port: ${PORT}`);

export default app;
