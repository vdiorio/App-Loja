'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [{
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
