'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Administrador',
      email: 'admin@admin.com',
      password: '$2a$08$51ZIMfVAkhV7lKCJm/oRJ.6Gt.zCnymGM3DPf0pwrsBojzJlOOXNC',
      role: 'admin',
      coins: 9999,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Usuario 1',
      email: 'user1@user.com',
      password: '$2a$08$SCPGadblGTGTv83F3r1Y1OQXowr0Ellq3BLu0aN7hUoNmQTdtxghS',
      role: 'user',
      coins: 100,
      created_at: new Date(),
      updated_at: new Date()
      
    },
    {
      id: 3,
      name: 'Usuario 2',
      email: 'user2@user.com',
      password: '$2a$08$4a/e9MsGZG4MbFH50VtL6uBaFLclfulEujRx4ZLHkfVYxLSI9.ylW',
      role: 'user',
      coins: 500,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: 'Usuario 3',
      email: 'user3@user.com',
      password: '$2a$08$zgCVtjL9fbRLop9kPBHNTu03NJYQQjykMFIYWXLCrxSITervdOPru',
      role: 'user',
      coins: 0,
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
