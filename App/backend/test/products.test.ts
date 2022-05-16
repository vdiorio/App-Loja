import 'mocha';
import * as sinon from 'sinon';
const chai = require('chai');
const chaiHttp = require('chai-http');

import app from '../src/index';
import {StatusCodes} from 'http-status-codes';
import {before} from 'mocha';
import * as jwt from 'jsonwebtoken';
import {productsStub} from './lib';
import Product from '../models/product';
import {Model} from 'sequelize/types';
require('dotenv').config();

chai.use(chaiHttp);

const {expect} = chai;

describe('Deve ser possível acessar e manipular produtos cadastrados no banco', () => {
  interface IRequest {
    name?: string,
    description?: string,
    imageURL?: string,
    price?: number,
    category: string,
    quantity?: number,
  }
  const newProduct: IRequest = {
    name: 'Novo produto',
    description: 'Descrição incrível!',
    imageURL: 'image.url',
    price: 1000,
    category: 'food',
    quantity: 10,
  };

  const createdProduct = {
    id: 64,
    name: 'Novo produto',
    description: 'Descrição incrível!',
    imageURL: 'image.url',
    price: 1000,
    category: 'food',
    quantity: 10,
    updatedAt: '2022-05-16T11:44:45.106Z',
    createdAt: '2022-05-16T11:44:45.106Z',
  };

  before(() => {
    sinon.stub(Product, 'findAll').resolves(productsStub as unknown as Product[]);
    sinon.stub(Product, 'findByPk').resolves(productsStub[0] as unknown as Product);
    sinon.stub(jwt, 'verify').returns({role: 'admin'} as unknown as void);
  });
  after(() => {
    (Product.findAll as sinon.SinonStub).restore();
    (Product.findByPk as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('A rota GET /products deve retornar todos os produtos do banco', async () => {
    const response = await chai.request(app).get('/products');
    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body).to.be.an('array');
    response.body.forEach((product: Product) => {
      expect(product).to.have.property('id');
      expect(product).to.have.property('name');
      expect(product).to.have.property('description');
      expect(product).to.have.property('imageURL');
      expect(product).to.have.property('price');
      expect(product).to.have.property('category');
      expect(product).to.have.property('quantity');
    });
  });

  it('A rota GET /products/:id deve retornar um único produto', async () => {
    const response = await chai.request(app).get('/products/1');
    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('name');
    expect(response.body).to.have.property('description');
    expect(response.body).to.have.property('imageURL');
    expect(response.body).to.have.property('price');
    expect(response.body).to.have.property('category');
    expect(response.body).to.have.property('quantity');
  });

  describe('Deve ser possível criar produtos através da rota POST /products', () => {
    const keys = Object.keys(newProduct).filter((key) => key !== 'imageURL');
    type RequestKey = 'name'
    keys.forEach((key: string) => {
      it(`A requisição deve falhar se o campo ${key} estiver faltando`, async () => {
        const keyValue = newProduct[key as RequestKey];
        delete newProduct[key as RequestKey];
        const response = await chai.request(app).post('/products').send(newProduct).set('authorization', 'token');
        newProduct[key as RequestKey] = keyValue;
        expect(response).to.have.status(StatusCodes.BAD_REQUEST);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal(`"${key}" is required`);
      });
    });

    it('A rota deve criar produtos normalmente caso a requisição seja válida', async () => {
      sinon.stub(Product, 'create').resolves(createdProduct as unknown as Model<any, any>);
      const response = await chai.request(app).post('/products').send(newProduct).set('authorization', 'token');
      (Product.create as sinon.SinonStub).restore();
      expect(response).to.have.status(StatusCodes.CREATED);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('description');
      expect(response.body).to.have.property('imageURL');
      expect(response.body).to.have.property('price');
      expect(response.body).to.have.property('category');
      expect(response.body).to.have.property('quantity');
    });
  });

  describe('Deve ser possível atualizar produtos através da rota PUT /products', () => {
    it('Se o produto não existir no banco, deve retornar o status 404', async () => {
      sinon.stub(Product, 'update').resolves([0]);
      const response = await chai.request(app).put('/products/1000').set('authorization', 'token').send(newProduct);
      (Product.update as sinon.SinonStub).restore();
      expect(response).to.have.status(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Product not found');
    });

    it('A requisição não pode aceitar valores estranhos', async () => {
      newProduct.name = 2 as unknown as string;
      const response = await chai.request(app).put('/products/1000').set('authorization', 'token').send(newProduct);
      newProduct.name = 'Novo produto';
      expect(response).to.have.status(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('"name" must be a string');
    });

    it('O produto deve ser atualizado normalmente', async () => {
      sinon.stub(Product, 'update').resolves([1]);
      const response = await chai.request(app).put('/products/1').set('authorization', 'token').send(newProduct);
      (Product.update as sinon.SinonStub).restore();
      expect(response).to.have.status(StatusCodes.NO_CONTENT);
      expect(response.body).to.be.deep.equal({});
    });
  });

  describe('Deve ser possível deletar produtos através da rota DELETE /products', () => {
    it('Se o produto não existir no banco, deve retornar o status 404', async () => {
      sinon.stub(Product, 'destroy').resolves(0);
      const response = await chai.request(app).delete('/products/1000').set('authorization', 'token');
      (Product.destroy as sinon.SinonStub).restore();
      expect(response).to.have.status(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Product not found');
    });

    it('O produto deve ser atualizado normalmente', async () => {
      sinon.stub(Product, 'destroy').resolves(1);
      const response = await chai.request(app).delete('/products/1').set('authorization', 'token');
      (Product.destroy as sinon.SinonStub).restore();
      expect(response).to.have.status(StatusCodes.NO_CONTENT);
      expect(response.body).to.be.deep.equal({});
    });
  });
});

it('A rota GET /products/:id deve retornar 404 se o produto não existir', async () => {
  sinon.stub(Product, 'findByPk').resolves(null);
  const response = await chai.request(app).get('/products/100');
  (Product.findByPk as sinon.SinonStub).restore();
  expect(response).to.have.status(StatusCodes.NOT_FOUND);
  expect(response.body).to.have.property('message');
  expect(response.body.message).to.be.equal('Product not found');
});

describe('Testes de integridade da aplicação para as rotas de products', () => {
  const routes = [
    ['get', '/'],
    ['get', '/1'],
    ['put', '/1'],
    ['post', '/'],
    ['delete', '/1'],
  ];

  const newProduct = {
    name: 'Novo produto',
    description: 'Descrição incrível!',
    imageURL: 'image.url',
    price: 1000,
    category: 'food',
    quantity: 10,
  };

  before(() => {
    sinon.stub(Product, 'findAll').rejects();
    sinon.stub(Product, 'findByPk').rejects();
    sinon.stub(Product, 'create').rejects();
    sinon.stub(Product, 'update').rejects();
    sinon.stub(Product, 'destroy').rejects();
    sinon.stub(jwt, 'verify').returns({role: 'admin'} as unknown as void);
  });
  after(() => {
    (Product.findAll as sinon.SinonStub).restore();
    (Product.findByPk as sinon.SinonStub).restore();
    (Product.update as sinon.SinonStub).restore();
    (Product.create as sinon.SinonStub).restore();
    (Product.destroy as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });

  routes.forEach((routeInfo) => {
    const [method, route] = routeInfo;
    it(`A rota ${method.toUpperCase()} ${route.includes('1') ? '/:id' : route} deve retornar status 500 caso haja algum erro no servidor`, async () => {
      const response = await chai.request(app)[method](`/products${route}`).set('authorization', 'token').send(newProduct);
      expect(response).to.have.status(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
