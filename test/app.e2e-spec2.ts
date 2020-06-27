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
let database: any = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'hr_e2e_test',
  entities: ['./**/*.entity.ts'],
  synchronize: true,
};
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
/*describe('HRHIS API (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const { Client } = require('pg')
    const client = new Client({
      host: database.host,
      port: database.port,
      user: database.username,
      password: database.password,
    });
    await client.connect();
    try{
      await client.query(`DROP DATABASE ${database.database};`);
      //await client.query(`CREATE DATABASE ${database.database};`);
    }catch(e){
      await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '${database.database}'
      AND pid <> pg_backend_pid();`);
      await client.query(`DROP DATABASE ${database.database};`);
    }
    await client.query(`CREATE DATABASE ${database.database};`);
    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(database),
        OrganisatinUnitModule,
        UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    let userService:UserService = app.get<UserService>(UserService);
    let user:any = { "password":"HRHIS2020", "username": "test", "firstName": "Anonymous", "middleName": null, "surname": "Anonymous", "email": "anonymous@example.com", "phoneNumber": null, "jobTitle": null, "expiryDate": null, "deletedDate": null, "enabled": true, "userRoles": [], "userGroups": [], "messages": [], "organisationUnits": [], "userSettings": null };
    await userService.create(user);
  });
  ['organisationUnits','users'].forEach((apiEndPoint)=>{
    it(`Testing Authentication /api/${apiEndPoint} (GET)`, () => {
      return request(app.getHttpServer())
        .get(`/api/${apiEndPoint}`)
        .expect(403)
        .expect('{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}');
    });
  })

  it(`Get Current User (GET)`, () => {
    return addAuthentication(request(app.getHttpServer())
      .get(`/api/me`))
      .expect(200)
      .expect((res) => {
        expect(res.body.username).toEqual('test');
        expect(res.body.firstName).toEqual('Anonymous');
        expect(res.body.surname).toEqual('Anonymous');
        expect(res.body.email).toEqual('anonymous@example.com');
        expect(res.body.enabled).toEqual(true);
      });
  });
  it(`Adding Organisation (POST)`, () => {
    return addAuthentication(request(app.getHttpServer())
      .post(`/api/organisationUnits`))
      .send({
        "id": "52893cd1b8359",
        "code": "MOHCDGEC",
        "name": "Ministry Of Health",
        "description": "Ministry of Health and Social welfare",
        //"dhisuid": "m0frOspS7JY",
        "shortName": "MOHCDGEC",
        "active": true,
        "level": 1
      })
      //.expect(200)
      .expect(
        (res)=>{
          console.log('Results:',res.body);
          expect(res.body.code).toEqual('MOHCDGEC');
          expect(res.body.name).toEqual('Ministry Of Health');
          expect(res.body.level).toEqual(1);
          expect(res.body.shortName).toEqual('MOHCDGEC');
          expect(res.body.active).toEqual(true);
        }
      );
  });
});*/
