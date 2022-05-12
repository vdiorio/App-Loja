'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_Products', {
      order_id: {
        type: Sequelize.INTEGER,
        references: {model: 'Orders', key: 'id'},
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {model: 'Products', key: 'id'},
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order_Products');
  },
};
