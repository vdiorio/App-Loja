'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [{
      id: 1,
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      user_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      user_id: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      user_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 7,
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
