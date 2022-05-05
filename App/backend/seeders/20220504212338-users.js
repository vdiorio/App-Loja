'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Administrador',
      email: 'admin@admin.com',
      password: 'TROCAR POR CHAVE',
      role: 'admin',
      coins: 9999,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Usuario 1',
      email: 'user1@user.com',
      password: 'TROCAR POR CHAVE',
      role: 'user',
      coins: 100,
      createdAt: new Date(),
      updatedAt: new Date()
      
    },
    {
      id: 3,
      name: 'Usuario 2',
      email: 'user2@user.com',
      password: 'TROCAR POR CHAVE',
      role: 'user',
      coins: 500,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: 'Usuario 3',
      email: 'user3@user.com',
      password: 'TROCAR POR CHAVE',
      role: 'user',
      coins: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
