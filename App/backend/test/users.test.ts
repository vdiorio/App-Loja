import 'mocha';
import * as sinon from 'sinon';
const chai = require('chai');
const chaiHttp = require('chai-http');

import app from '../src/index';
import {StatusCodes} from 'http-status-codes';
import User from '../models/user';
import {before} from 'mocha';
import * as jwt from 'jsonwebtoken';
import {usersFindAllStub} from './lib';
require('dotenv').config();

chai.use(chaiHttp);

const {expect} = chai;

describe('Somente o usuário "admin" deve conseguir manipular moedas', () => {
  it('A requisição deve falhar caso o token JWT não esteja definido', async () => {
    const response = await chai.request(app)
        .put('/users/1')
        .send({coins: 9999});
    expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Token not found');
  });

  it('A requisição deve falhar caso o token JWT seja inválido', async () => {
    const response = await chai.request(app)
        .put('/users/1')
        .send({coins: 9999})
        .set('authorization', 'token');
    expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid token');
  });

  it('A requisição deve falhar caso o usuário não tenha a role admin', async () => {
    sinon.stub(jwt, 'verify').returns({role: 'user'} as unknown as void);
    const response = await chai.request(app)
        .put('/users/1')
        .send({coins: 9999})
        .set('authorization', 'token');
    (jwt.verify as sinon.SinonStub).restore();
    expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Unauthorized action');
  });
});

describe('A API deve checar a existência do usuário antes de tentar alterar seus valores', () => {
  before(() => {
    sinon.stub(jwt, 'verify').returns({role: 'admin'} as unknown as void);
    sinon.stub(User, 'update').resolves();
  });
  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (User.update as sinon.SinonStub).restore();
  });

  it('Se o usuário não existir, deve retornar 404', async () => {
    sinon.stub(User, 'findByPk').resolves(null);
    const response = await chai.request(app)
        .put('/users/1')
        .set('authorization', 'token')
        .send({coins: 10});
    (User.findByPk as sinon.SinonStub).restore();
    expect(response).to.have.status(StatusCodes.NOT_FOUND);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('User not found');
  });

  it('Se o usuário existir, deve retornar 200', async () => {
    sinon.stub(User, 'findByPk').resolves({coins: 50} as User);
    const response = await chai.request(app)
        .put('/users/1')
        .set('authorization', 'token')
        .send({coins: 10});
    (User.findByPk as sinon.SinonStub).restore();
    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Coins updated');
  });
});

describe('A requisição deve estar no formato correto', () => {
  before(() => sinon.stub(jwt, 'verify').returns({role: 'admin'} as unknown as void));
  after(() => (jwt.verify as sinon.SinonStub).restore());

  it('A requisição deve falhar caso o campo coins não exista', async () => {
    const response = await chai.request(app)
        .put('/users/1')
        .set('authorization', 'token');
    expect(response).to.have.status(StatusCodes.BAD_REQUEST);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"coins" is required');
  });

  it('A requisição deve falhar caso o campo coins não seja um numero', async () => {
    const response = await chai.request(app)
        .put('/users/1')
        .set('authorization', 'token')
        .send({coins: 'Dez'});
    expect(response).to.have.status(StatusCodes.BAD_REQUEST);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"coins" must be a number');
  });
});

describe('Deve ser possível cadastrar novos usuários', () => {
  before(() => sinon.stub(User, 'create').resolves());
  after(() => (User.create as sinon.SinonStub).restore());

  it('Se tudo estiver OK, a requisição deve retornar status 201', async () => {
    const request = {
      name: 'Marquito Soares',
      email: 'marquito@gmail.com',
      password: 'senhadomarquito',
    };
    const response = await chai.request(app).post('/users/create').send(request);

    expect(response).to.have.status(StatusCodes.CREATED);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Usuário criado com sucesso!');
  });
});

describe('Não pode ser possível criar um usuário com uma requisição inválida', () => {
  it('Todos os campos devem ser obrigatórios', async () => {
    const campos = ['name', 'email', 'password'];
    for (const campo of campos) {
      const request = {
        name: 'Marquito Soares',
        email: 'marquito@gmail.com',
        password: 'senhadomarquito',
      };
      type T = keyof typeof request;
      delete request[campo as T];
      const response = await chai.request(app).post('/users/create').send(request);
      expect(response).to.have.status(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(`"${campo}" is required`);
    };
  });

  it('A senha deve ter pelo menos 6 caractéres', async () => {
    const request = {
      name: 'Marquito Soares',
      email: 'marquito@gmail.com',
      password: '12345',
    };
    const response = await chai.request(app).post('/users/create').send(request);
    expect(response).to.have.status(StatusCodes.BAD_REQUEST);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"password" length must be at least 6 characters long');
  });
});

describe('A rota users deve retornar todos os usuários do banco', () => {
  before(() => {
    sinon.stub(User, 'findAll').resolves(usersFindAllStub as unknown as User[]);
    sinon.stub(jwt, 'verify').returns({role: 'admin'} as unknown as void);
  });
  after(() => {
    (User.findAll as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('Deve retornar o status 200 e uma lista com todos os usuários do banco', async () => {
    const response = await chai.request(app)
        .get('/users')
        .set('authorization', 'token');
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    response.body.forEach((user: User) => {
      expect(user).to.have.property('name');
      expect(user).to.have.property('email');
      expect(user).to.have.property('coins');
      expect(user).to.have.property('role');
      expect(user).to.have.property('createdAt');
      expect(user).to.have.property('updatedAt');
    });
  });
});

describe('Caso algo de errado a requisição deve retornar um erro', () => {
  before(() => {
    sinon.stub(User, 'create').rejects();
    sinon.stub(User, 'findAll').rejects();
    sinon.stub(User, 'update').rejects();
    sinon.stub(jwt, 'verify').returns({role: 'admin'} as unknown as void);
  });

  after(() => {
    (User.create as sinon.SinonStub).restore();
    (User.findAll as sinon.SinonStub).restore();
    (User.update as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });

  const request = {
    name: 'Marquito Soares',
    email: 'marquito@gmail.com',
    password: 'senhadomarquito',
  };

  it('A rota GET /users deve retornar status 500', async () => {
    const response = await chai.request(app).get('/users').set('authorization', 'token');
    expect(response).to.have.status(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.message).to.be.equal('Algo deu errado, tente novamente mais tarde');
  });

  it('A rota POST /users/create deve retornar status 500', async () => {
    const response = await chai.request(app).post('/users/create').set('authorization', 'token').send(request);
    expect(response).to.have.status(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.message).to.be.equal('Algo deu errado, tente novamente mais tarde');
  });

  it('A rota PUT /users deve retornar status 500', async () => {
    const response = await chai.request(app).put('/users/1').set('authorization', 'token').send({coins: 10});
    expect(response).to.have.status(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.message).to.be.equal('Algo deu errado, tente novamente mais tarde');
  });
});
