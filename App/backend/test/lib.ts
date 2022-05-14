export const usersFindAllStub = [
  {
    name: 'Administrador',
    email: 'admin@admin.com',
    coins: 10,
    role: 'admin',
    createdAt: '2022-05-11T00:13:05.000Z',
    updatedAt: '2022-05-11T00:13:20.000Z',
  },
  {
    name: 'Usuario 1',
    email: 'user1@user.com',
    coins: 100,
    role: 'user',
    createdAt: '2022-05-11T00:13:05.000Z',
    updatedAt: '2022-05-11T00:13:05.000Z',
  },
  {
    name: 'Usuario 2',
    email: 'user2@user.com',
    coins: 500,
    role: 'user',
    createdAt: '2022-05-11T00:13:05.000Z',
    updatedAt: '2022-05-11T00:13:05.000Z',
  },
  {
    name: 'Usuario 3',
    email: 'user3@user.com',
    coins: 0,
    role: 'user',
    createdAt: '2022-05-11T00:13:05.000Z',
    updatedAt: '2022-05-11T00:13:05.000Z',
  },
];

export const productsStub = [
  {
    id: 1,
    name: 'FACA GINSU 2000',
    description: 'A faca GINSU 2000 corta peixes, costela na vertical, cano de metal e tomates!',
    imageURL: 'https://teleguiado.com/wp-content/uploads/2016/06/Sem-t%C3%ADtulo.png',
    price: 150,
    category: 'utensilhos',
    quantity: 2000,
    createdAt: '2022-05-11T00:13:05.000Z',
    updatedAt: '2022-05-11T00:13:05.000Z',
  },
  {
    id: 2,
    name: 'Leão da parmalat',
    description: 'Leve esse animal selvagem para sua casa! Jaula não inclusa!',
    imageURL: 'https://vejasp.abril.com.br/wp-content/uploads/2018/07/capa3.jpg',
    price: 50,
    category: 'animals',
    quantity: 1996,
    createdAt: '2022-05-11T00:13:05.000Z',
    updatedAt: '2022-05-11T00:13:05.000Z',
  },
  {
    id: 3,
    name: 'X-Infarto',
    description: 'Entupa todas suas artérias, ou morra tentando!',
    imageURL: 'https://vejasp.abril.com.br/wp-content/uploads/2016/12/ezequiel.jpeg?quality=70&strip=all&strip=info',
    price: 50,
    category: 'food',
    quantity: 621,
    createdAt: '2022-05-11T00:13:05.000Z',
    updatedAt: '2022-05-11T00:13:05.000Z',
  },
  {
    id: 4,
    name: 'Iggy',
    description: 'Um cachorrinho muito simpático e gente boa',
    imageURL: 'https://e7.pngegg.com/pngimages/110/134/png-clipart-boston-terrier-jojo-s-bizarre-adventure-iggy-stardust-crusaders-puppy-puppy.png',
    price: 2,
    category: 'animals',
    quantity: 1,
    createdAt: '2022-05-11T00:13:05.000Z',
    updatedAt: '2022-05-11T00:13:05.000Z',
  },
  {
    id: 5,
    name: 'Wesley Salgadão',
    description: 'Eu morava numa ilha e me mudei pra outra, isso não foi um trocadilho, foi uma trocadilha',
    imageURL: 'https://www.opovo.com.br/esportesimages/app/noticia_14970375377/2018/07/05/29548/Psicoxinha.jpg',
    price: 50,
    category: 'food',
    quantity: 621,
    createdAt: '2022-05-11T00:13:05.000Z',
    updatedAt: '2022-05-11T00:13:05.000Z',
  },
];

export const getAllOrdersStub = [
  {
    id: 1,
    userId: 2,
    createdAt: '2022-05-12T04:37:48.000Z',
    updatedAt: '2022-05-12T04:37:48.000Z',
    UserId: 2,
    products: [
      {
        name: 'FACA GINSU 2000',
        Order_Products: {
          quantity: 454,
          order_id: 1,
          product_id: 1,
        },
      },
      {
        name: 'Iggy',
        Order_Products: {
          quantity: 83,
          order_id: 1,
          product_id: 4,
        },
      },
    ],
  },
  {
    id: 2,
    userId: 3,
    createdAt: '2022-05-12T04:37:48.000Z',
    updatedAt: '2022-05-12T04:37:48.000Z',
    UserId: 3,
    products: [
      {
        name: 'Leão da parmalat',
        Order_Products: {
          quantity: 272,
          order_id: 2,
          product_id: 2,
        },
      },
      {
        name: 'X-Infarto',
        Order_Products: {
          quantity: 278,
          order_id: 2,
          product_id: 3,
        },
      },
      {
        name: 'Wesley Salgadão',
        Order_Products: {
          quantity: 477,
          order_id: 2,
          product_id: 5,
        },
      },
    ],
  },
  {
    id: 3,
    userId: 4,
    createdAt: '2022-05-12T04:37:48.000Z',
    updatedAt: '2022-05-12T04:37:48.000Z',
    UserId: 4,
    products: [
      {
        name: 'FACA GINSU 2000',
        Order_Products: {
          quantity: 75,
          order_id: 3,
          product_id: 1,
        },
      },
    ],
  },
  {
    id: 4,
    userId: 2,
    createdAt: '2022-05-12T04:37:48.000Z',
    updatedAt: '2022-05-12T04:37:48.000Z',
    UserId: 2,
    products: [
      {
        name: 'FACA GINSU 2000',
        Order_Products: {
          quantity: 395,
          order_id: 4,
          product_id: 1,
        },
      },
    ],
  },
  {
    id: 5,
    userId: 2,
    createdAt: '2022-05-12T04:37:48.000Z',
    updatedAt: '2022-05-12T04:37:48.000Z',
    UserId: 2,
    products: [
      {
        name: 'X-Infarto',
        Order_Products: {
          quantity: 490,
          order_id: 5,
          product_id: 3,
        },
      },
      {
        name: 'Wesley Salgadão',
        Order_Products: {
          quantity: 44,
          order_id: 5,
          product_id: 5,
        },
      },
    ],
  },
  {
    id: 6,
    userId: 3,
    createdAt: '2022-05-12T04:37:48.000Z',
    updatedAt: '2022-05-12T04:37:48.000Z',
    UserId: 3,
    products: [
      {
        name: 'Leão da parmalat',
        Order_Products: {
          quantity: 422,
          order_id: 6,
          product_id: 2,
        },
      },
    ],
  },
  {
    id: 7,
    userId: 2,
    createdAt: '2022-05-12T04:37:48.000Z',
    updatedAt: '2022-05-12T04:37:48.000Z',
    UserId: 2,
    products: [
      {
        name: 'FACA GINSU 2000',
        Order_Products: {
          quantity: 116,
          order_id: 7,
          product_id: 1,
        },
      },
      {
        name: 'Leão da parmalat',
        Order_Products: {
          quantity: 83,
          order_id: 7,
          product_id: 2,
        },
      },
    ],
  },
];
