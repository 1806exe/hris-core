
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setUpServer, addAuthentication, tearDownServer, server } from '../set-up-e2e';
beforeAll(async (done) => {
  await setUpServer();
  done();
});
afterAll(async (done) => {
  await tearDownServer();
  done();
});
describe('Organisation Unit API', () => {
  it(`Testing Authentication /api/organisationUnits (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/organisationUnits`)
      .expect(403)
      .expect('{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}');
  });
  let orgUnitId;
  it(`Adding Organisation /api/organisationUnits (POST)`, () => {
    return addAuthentication(request(server.getHttpServer())
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
          orgUnitId = res.body.id;
          expect(res.body.code).toEqual('MOHCDGEC');
          expect(res.body.name).toEqual('Ministry Of Health');
          expect(res.body.level).toEqual(1);
          expect(res.body.shortName).toEqual('MOHCDGEC');
          expect(res.body.active).toEqual(true);
        }
      );
  });
  it(`Adding Duplicate Organisation /api/organisationUnits (POST)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .post(`/api/organisationUnits`))
      .send({
        "id": "52893cd1b8359",
        "code": "MOHCDGEC",
        "name": "Ministry Of Health",
        "description": "Ministry of Health and Social welfare",
        "dhisuid": "m0frOspS7JY",
        "shortName": "MOHCDGEC",
        "active": true,
        "level": 1
      })
      .expect(
        (res)=>{
          expect(res.body.error != undefined).toEqual(true);
        }
      );
  });
  it(`Get Organisation Unit by ID /api/organisationUnits/:id (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/organisationUnits/${orgUnitId}`))
      .expect(
        (res)=>{
          expect(res.body.code).toEqual('MOHCDGEC');
          expect(res.body.name).toEqual('Ministry Of Health');
          expect(res.body.level).toEqual(1);
          expect(res.body.shortName).toEqual('MOHCDGEC');
          expect(res.body.active).toEqual(true);
        }
      );
  });
  it(`Adding Child Organisation /api/organisationUnits (POST)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .post(`/api/organisationUnits`))
      .send({
        "code": "Regions",
        "name": "The Region",
        "description": "The Region Details",
        "parent": {
          "id": orgUnitId
        },
        "shortName": "The Region",
        "active": true
      })
      //.expect(200)
      .expect(
        (res)=>{
          expect(res.body.code).toEqual('Regions');
          expect(res.body.name).toEqual('The Region');
          expect(res.body.shortName).toEqual('The Region');
          expect(res.body.active).toEqual(true);
        }
      );
  });
  it(`Get List of organisation units /api/organisationUnits (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/organisationUnits`))
      .expect(
        (res)=>{
          expect(res.body.pager != undefined).toEqual(true);
          expect(res.body.organisationUnits != undefined).toEqual(true);
          expect(res.body.organisationUnits.length).toEqual(2);
        }
      );
  });
  it(`Get List of organisation units with fields /api/organisationUnits?fields=id,name,parent (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/organisationUnits?fields=id,name,parent`))
      .expect(
        (res)=>{
          expect(res.body.pager != undefined).toEqual(true);
          expect(res.body.organisationUnits != undefined).toEqual(true);
          expect(res.body.organisationUnits.length).toEqual(2);
          let parentExists = false;
          res.body.organisationUnits.forEach((ou)=>{
            if(ou.parent){
              parentExists = true;
            }
          });
          expect(parentExists).toEqual(true);
          console.log(res.body);
        }
      );
  });
  it(`Get List of organisation units /api/organisationUnits?filter=shortName:eq:MOHCDGEC (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/organisationUnits?filter=shortName:eq:MOHCDGEC`))
      .expect(
        (res)=>{
          expect(res.body.pager != undefined).toEqual(true);
          expect(res.body.organisationUnits != undefined).toEqual(true);
          expect(res.body.organisationUnits.length).toEqual(1);
        }
      );
  });
});
