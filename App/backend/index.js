const express = require('express');
const app = express();
require('dotenv').config()
const { PORT } = process.env

app.get('/', (req, res) => res.status(200).json('Aplicação minima em funcionamento!'))

app.listen(PORT);
console.log(`listening on port: ${PORT}`)