'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [{
      id: 1,
      name: 'FACA GINSU 2000',
      description: 'A faca GINSU 2000 corta peixes, costela na vertical, cano de metal e tomates!',
      image_u_r_l: 'https://teleguiado.com/wp-content/uploads/2016/06/Sem-t%C3%ADtulo.png',
      price: 150,
      category: 'utensilhos',
      quantity: 2000,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Leão da parmalat',
      description: 'Leve esse animal selvagem para sua casa! Jaula não inclusa!',
      image_u_r_l: 'https://vejasp.abril.com.br/wp-content/uploads/2018/07/capa3.jpg',
      price: 50,
      category: 'animals',
      quantity: 1996,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'X-Infarto',
      description: 'Entupa todas suas artérias, ou morra tentando!',
      image_u_r_l: 'https://vejasp.abril.com.br/wp-content/uploads/2016/12/ezequiel.jpeg?quality=70&strip=all&strip=info',
      price: 50,
      category: 'food',
      quantity: 621,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: 'Iggy',
      description: 'Um cachorrinho muito simpático e gente boa',
      image_u_r_l: 'https://e7.pngegg.com/pngimages/110/134/png-clipart-boston-terrier-jojo-s-bizarre-adventure-iggy-stardust-crusaders-puppy-puppy.png',
      price: 2,
      category: 'animals',
      quantity: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      name: 'Wesley Salgadão',
      description: 'Eu morava numa ilha e me mudei pra outra, isso não foi um trocadilho, foi uma trocadilha',
      image_u_r_l: 'https://www.opovo.com.br/esportesimages/app/noticia_14970375377/2018/07/05/29548/Psicoxinha.jpg',
      price: 50,
      category: 'food',
      quantity: 621,
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
