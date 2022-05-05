import { Request, Response } from "express";
import bodyParser = require('body-parser');
import router from "./router";

const express = require('express');
const app = express();
require('dotenv').config()
const { PORT } = process.env

app.use(bodyParser.json());
app.use('/products', router.products)
app.use('/users', router.users)

app.listen(PORT);
console.log(`listening on port: ${PORT}`)