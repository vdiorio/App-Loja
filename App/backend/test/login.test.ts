import 'mocha';
import * as sinon from 'sinon';
const chai = require('chai');
const chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import app from '../src/index';
import {StatusCodes} from 'http-status-codes';
import User from '../models/user';
import {before} from 'mocha';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

chai.use(chaiHttp);

const {expect} = chai;

describe('A requisição deve falhar caso a requisição seja inválida', () => {
  it('O campo email deve ser obrigatório', async () => {
    const response = await chai.request(app).post('/login').send({
      password: 'senha_invalida',
    });

    expect(response).to.have.status(StatusCodes.BAD_REQUEST);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"email" is required');
  });

  it('Deve ser fornecido um email válido', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'email@invalido',
      password: 'senha_invalida',
    });

    expect(response).to.have.status(StatusCodes.BAD_REQUEST);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"email" must be a valid email');
  });

  it('O campo senha deve ser obrigatório', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'email@valido.com',
    });

    expect(response).to.have.status(StatusCodes.BAD_REQUEST);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"password" is required');
  });

  it('O campo senha deve ter pelo menos 6 caractéres', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'email@valido.com',
      password: '12345',
    });

    expect(response).to.have.status(StatusCodes.BAD_REQUEST);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"password" length must be at least 6 characters long');
  });
});

describe('A requisição deve falhar se os dados estiverem incorretos', () => {
  it('Se o email não existir no banco de dados', async () => {
    sinon.stub(User, 'findOne').resolves(null);
    const response = await chai.request(app).post('/login').send({
      email: 'email@inexistente.com',
      password: 'senha_valida',
    });
    (User.findOne as sinon.SinonStub).restore();

    expect(response).to.have.status(StatusCodes.NOT_FOUND);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Wrong email or password');
  });

  it('Se a senha estiver incorreta', async () => {
    sinon.stub(User, 'findOne').resolves({password: 'hash'} as User);
    const response = await chai.request(app).post('/login').send({
      email: 'email@existente.com',
      password: 'senha_invalida',
    });
    (User.findOne as sinon.SinonStub).restore();

    expect(response).to.have.status(StatusCodes.NOT_FOUND);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Wrong email or password');
  });
});

describe('Deve retornar um token JWT caso tudo esteja OK', () => {
  before(() => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      email: 'email@existente.com',
      role: 'user',
      password: 'hash',
    } as User);
    sinon.stub(bcrypt, 'compareSync').returns(true);
  });

  after(() => (User.findOne as sinon.SinonStub).restore());

  it('O status da requisição deve ser 200 e o token deve ser válido', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'email@existente.com',
      password: 'senha_valida',
    });

    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body).to.have.property('token');
    const {token} = response.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    expect(decoded).to.have.property('id');
    expect(decoded).to.have.property('email');
    expect(decoded).to.have.property('role');
    expect(decoded).to.have.property('exp');
    expect(decoded).to.have.property('iat');
  });
});

describe('Caso algo de errado a requisição deve retornar um erro', () => {
  before(() => {
    sinon.stub(User, 'findOne').rejects();
    sinon.stub(jwt, 'verify').returns({role: 'admin'} as unknown as void);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('A rota POST /login deve retornar status 500', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'valid@email.com',
      password: 'valid_password',
    });
    expect(response).to.have.status(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.message).to.be.equal('Algo deu errado, tente novamente mais tarde');
  });
});
