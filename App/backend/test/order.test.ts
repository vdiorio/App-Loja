import 'mocha';
import * as sinon from 'sinon';
const chai = require('chai');
const chaiHttp = require('chai-http');

import app from '../src/index';
import {StatusCodes} from 'http-status-codes';
import {before} from 'mocha';
import * as jwt from 'jsonwebtoken';
import {getAllOrdersStub} from './lib';
import Product from '../models/product';
import Order from '../models/orders';
import User from '../models/user';
import OrderProducts from '../models/orderProducts';
import services from '../src/services';
require('dotenv').config();

chai.use(chaiHttp);

const {expect} = chai;

describe('Deve ser possível ler pedidos pela rota /orders', () => {
  before(() => {
    sinon.stub(jwt, 'verify').returns({id: 2, role: 'admin'} as unknown as void);
  });
  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('A rota GET /orders/admin deve retornar todos os pedidos do banco', async () => {
    sinon.stub(Order, 'findAll').resolves(getAllOrdersStub as unknown as Order[]);
    const response = await chai.request(app).get('/orders/admin').set('authorization', 'token');
    (Order.findAll as sinon.SinonStub).restore();
    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body).to.be.an('array');
    response.body.forEach((order: object) => {
      expect(order).to.have.property('id');
      expect(order).to.have.property('userId');
      expect(order).to.have.property('products');
    });
  });

  it('A rota GET /orders deve retornar todos os pedidos do usuário', async () => {
    sinon.stub(Order, 'findAll').resolves(getAllOrdersStub.filter((order) => order.userId === 2) as unknown as Order[]);
    const response = await chai.request(app).get('/orders').set('authorization', 'token');
    (Order.findAll as sinon.SinonStub).restore();
    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body).to.be.an('array');
    response.body.forEach((order: any) => {
      expect(order).to.have.property('id');
      expect(order).to.have.property('userId');
      expect(order).to.have.property('products');
      expect(order.userId).to.be.equal(2);
    });
  });
});

describe('Deve ser possível criar pedidos pela rota POST /orders', () => {
  describe('A requisição deve ser valida', () => {
    it('Não deve ser possível criar um pedido sem um token', async () => {
      const response = await chai.request(app).post('/orders');
      expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
      expect(response.body.message).to.be.equal('Token not found');
    });

    it('Não deve ser possível criar um pedido com um token inválido', async () => {
      const response = await chai.request(app).post('/orders').set('authorization', 'token_inválido');
      expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
      expect(response.body.message).to.be.equal('Unauthorized action');
    });
  });

  describe('Testes de middlewares', () => {
    before(() => {
      sinon.stub(jwt, 'verify').returns({role: 'admin', id: 1} as unknown as void);
      sinon.stub(User, 'findByPk').resolves({coins: 10} as User);
    });
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (User.findByPk as sinon.SinonStub).restore();
    });

    it('Não deve ser possível criar pedidos sem produtos', async () => {
      const response = await chai.request(app).post('/orders').set('authorization', 'token válido').send([{quantity: 10}]);
      expect(response).to.have.status(StatusCodes.BAD_REQUEST);
      expect(response.body.message).to.be.equal('"[0].productId" is required');
    });

    it('Não deve ser possível criar pedidos quando o id de um produto não for encontrado', async () => {
      sinon.stub(Product, 'findByPk').resolves(null);
      const response = await chai.request(app).post('/orders').set('authorization', 'token válido').send([{productId: 10000, quantity: 10}]);
      (Product.findByPk as sinon.SinonStub).restore();
      expect(response).to.have.status(StatusCodes.NOT_FOUND);
      expect(response.body.message).to.be.equal('Product not found');
    });

    it('Não deve ser possível criar pedidos quando a quantidade pedida de pelo menos um produto for maior que a do estoque', async () => {
      sinon.stub(Product, 'findByPk').resolves({quantity: 0} as Product);
      const response = await chai.request(app).post('/orders').set('authorization', 'token válido').send([{productId: 4, quantity: 10000}]);
      (Product.findByPk as sinon.SinonStub).restore();
      expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
      expect(response.body.message).to.be.equal('No products enough in stock');
    });

    it('Não deve ser possível criar pedidos quando o valor da compra for maior que o total de moedas do usuário', async () => {
      sinon.stub(Product, 'findByPk').resolves({price: 1000, quantity: 100} as Product);
      const response = await chai.request(app).post('/orders').set('authorization', 'token válido').send([{productId: 4, quantity: 1}]);
      (Product.findByPk as sinon.SinonStub).restore();
      expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
      expect(response.body.message).to.be.equal('Not enough funds');
    });
  });
});

describe('Deve ser possível criar pedidos no banco de dados', async () => {
  before(() => {
    sinon.stub(OrderProducts, 'create').resolves();
    sinon.stub(Order, 'findByPk').resolves({
      id: 9,
      userId: 1,
      createdAt: '2022-05-14T04:17:27.000Z',
      updatedAt: '2022-05-14T04:17:27.000Z',
      UserId: 1,
      products: [
        {
          name: 'Leão da parmalat',
          Order_Products: {
            quantity: 30,
            order_id: 9,
            product_id: 2,
          },
        },
      ],
    } as unknown as Order);
    sinon.stub(User, 'findByPk').resolves({coins: 1000} as User);
    sinon.stub(User, 'update').resolves();
    sinon.stub(Order, 'create').resolves({
      id: 11,
      userId: 1,
      updatedAt: '2022-05-14T04:33:54.438Z',
      createdAt: '2022-05-14T04:33:54.438Z',
    } as unknown as Order);
    sinon.stub(jwt, 'verify').resolves();
    sinon.stub(Product, 'findByPk').resolves({quantity: 1000, update: () => { }} as unknown as Product);
  });
  after(() => {
    (OrderProducts.create as sinon.SinonStub).restore();
    (Order.findByPk as sinon.SinonStub).restore();
    (Order.create as sinon.SinonStub).restore();
    (User.findByPk as sinon.SinonStub).restore();
    (User.update as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
    (Product.findByPk as sinon.SinonStub).restore();
  });

  it('Deve retornar o status 201 quando criar um pedido', async () => {
    const response = await chai.request(app).post('/orders').set('authorization', 'token válido').send([{productId: 4, quantity: 1}]);
    expect(response).to.have.status(StatusCodes.CREATED);
  });
});

describe('Teste de integridade da rota orders', () => {
  before(() => {
    sinon.stub(services.orders, 'createOrder').rejects();
    sinon.stub(services.orders, 'getAll').rejects();
    sinon.stub(services.orders, 'getByUserId').rejects();
    sinon.stub(services.products, 'getById').resolves({quantity: 1000} as Product);
    sinon.stub(services.users, 'getById').resolves({coins: 9999} as User);
    sinon.stub(jwt, 'verify').returns({role: 'admin', id: 1} as unknown as void);
  });
  after(() => {
    (services.orders.createOrder as sinon.SinonStub).restore();
    (services.orders.getAll as sinon.SinonStub).restore();
    (services.products.getById as sinon.SinonStub).restore();
    (services.users.getById as sinon.SinonStub).restore();
    (services.orders.getByUserId as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });

  const routes = [
    ['post', '/orders'],
    ['get', '/orders'],
    ['get', '/orders/admin'],
  ];

  routes.forEach((array) => {
    const [method, route] = array;
    it(`A rota ${method.toUpperCase()} ${route} deve retornar 500 caso haja alguma falha no servidor`, async () => {
      const response = await chai.request(app)[method](route).set('authorization', 'token').send([{productId: 1, quantity: 1}]);
      expect(response).to.have.status(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
