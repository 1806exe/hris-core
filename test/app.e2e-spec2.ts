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
import { setUpServer, addAuthentication } from './set-up-e2e';

describe('HRHIS User API (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await setUpServer();
  });

  test(`Testing Authentication /api/users (GET)`, () => {
    return request(global['app'].getHttpServer())
      .get(`/api/users`)
      .expect(403)
      .expect('{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}');
  });
  test(`Get Current User (GET)`, () => {
    return addAuthentication(request(global['app'].getHttpServer())
      .get(`/api/me`))
      .expect(200)
      .expect((res) => {
        expect(res.body.username).toEqual('test');
        expect(res.body.firstName).toEqual('Anonymous');
        expect(res.body.surname).toEqual('Anonymous');
        expect(res.body.email).toEqual('anonymous@example.com');
        expect(res.body.enabled).toEqual(true);
      });
  });;
});