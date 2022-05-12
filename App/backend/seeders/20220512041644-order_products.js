'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Order_Products', [{
      order_id: 1,
      product_id: 1,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 1,
      product_id: 4,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 2,
      product_id: 2,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 2,
      product_id: 3,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 2,
      product_id: 5,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 3,
      product_id: 1,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 4,
      product_id: 1,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 5,
      product_id: 3,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 5,
      product_id: 5,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 6,
      product_id: 2,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 7,
      product_id: 1,
      quantity: Math.floor(Math.random() * 500),
    },
    {
      order_id: 7,
      product_id: 2,
      quantity: Math.floor(Math.random() * 500),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Order_Products', null, {});
  },
};
