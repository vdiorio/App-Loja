'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [{
      id: 1,
      name: 'Administrador',
      password: 'TROCAR POR CHAVE',
      role: 'admin',
      coins: 9999,
    },
    {
      id: 2,
      name: 'Usuario 1',
      password: 'TROCAR POR CHAVE',
      role: 'user',
      coins: 100,
    },
    {
      id: 3,
      name: 'Usuario 2',
      password: 'TROCAR POR CHAVE',
      role: 'user',
      coins: 500,
    },
    {
      id: 4,
      name: 'Usuario 3',
      password: 'TROCAR POR CHAVE',
      role: 'user',
      coins: 0,
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
