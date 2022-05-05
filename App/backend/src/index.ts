import { Request, Response } from "express";

const express = require('express');
const app = express();
require('dotenv').config()
const { PORT } = process.env

app.get('/', (_req: Request, res: Response) => res.status(200).json('Aplicação minima em funcionamento!'))

app.listen(PORT);
console.log(`listening on port: ${PORT}`)