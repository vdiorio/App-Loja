'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
require('dotenv/config');
const config = {
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '123456',
  database: 'lojaVoll',
  host: 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3002,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};
module.exports = config;
// # sourceMappingURL=config.js.map
