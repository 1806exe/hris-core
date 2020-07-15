import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { OrganisatinUnitModule } from '../src/modules/organisation-unit/organisation-unit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../src/modules/system/user/user.module';
import { UserService } from '../src/modules/system/user/services/user.service';
import { getBasicAuthanticationString } from '../src/core/helpers/basic-auth-token';
import { passwordHash } from '../src/core/utilities/password-utilities';
import { server, setUpServer, addAuthentication, tearDownServer } from './set-up-e2e';

beforeAll(async (done) => {
  await setUpServer();
  done();
});
afterAll(async (done) => {
  await tearDownServer();
  done();
});
'{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}'
describe('HRHIS User API (e2e)', () => {
  test(`Testing wrong loging in credentials /api/login (GET)`, () => {
    return request(server.getHttpServer())
    .post(`/api/login`)
    .send({
      "username": "user",
      "password": "MOHCDGEC"
    })
      .expect((res) => {
        expect(res.body.httpStatus).toEqual('Unauthorized');
        expect(res.body.httpStatusCode).toEqual(401);
        expect(res.body.message).toEqual('Username or password provided is incorrect.');
        expect(res.body.status).toEqual('ERROR');
      });
  });
  test(`Testing Logging in /api/login (GET)`, () => {
    return request(server.getHttpServer())
    .post(`/api/login`)
    .send({
      "username": "test",
      "password": "HRHIS2020"
    })
      .expect((res) => {
        expect(res.body.username).toEqual('test');
        expect(res.body.firstName).toEqual('Anonymous');
        expect(res.body.surname).toEqual('Anonymous');
        expect(res.body.email).toEqual('anonymous@example.com');
      });
  });
  test(`Testing Logged in user access /api/me (GET)`, () => {
    return request(server.getHttpServer())
    .get(`/api/me`)
      .expect((res) => {
        expect(res.body.username).toEqual('test');
        expect(res.body.firstName).toEqual('Anonymous');
        expect(res.body.surname).toEqual('Anonymous');
        expect(res.body.email).toEqual('anonymous@example.com');
      });
  });
  test(`Testing Logout /api/logout (GET)`, () => {
    return request(server.getHttpServer())
    .get(`/api/logout`)
      .expect((res) => {
        expect(res.body.httpStatus).toEqual('OK');
        expect(res.body.httpStatusCode).toEqual(200);
        expect(res.body.status).toEqual('OK');
        expect(res.body.message).toEqual('User logged out successfully');
      });
  });
  test(`Testing Logged out user being forbidden /api/me (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/me`)
      .expect(403)
      .expect('{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}');
  });
});