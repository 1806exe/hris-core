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
describe('Organisation Unit Groups API', () => {
  it(`Testing Authentication /api/organisationUnitGroups (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/organisationUnitGroups`)
      .expect(403)
      .expect('{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}');
  });
  let orgUnitGroupId;
  it(`Adding Organisation Group /api/organisationUnitGroups (POST)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .post(`/api/organisationUnitGroups`))
      .send({
        "id": "52893cf9c4270",
        "code": "hospitals",
        "name": "Hospitals",
        "description": "Hospitals"
      })
      //.expect(200)
      .expect(
        (res)=>{
          orgUnitGroupId = res.body.id;
          expect(res.body.code).toEqual('hospitals');
          expect(res.body.name).toEqual('Hospitals');
          expect(res.body.description).toEqual('Hospitals');
        }
      );
  });
  it(`Adding Duplicate Organisation Unit Group /api/organisationUnitGroups (POST)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .post(`/api/organisationUnitGroups`))
      .send({
        "id": "52893cf9c4270",
        "code": "hospitals",
        "name": "Hospitals",
        "description": "Hospitals"
      })
      .expect(
        (res)=>{
          expect(res.body.error != undefined).toEqual(true);
        }
      );
  });
  it(`Get Organisation Unit Group by ID /api/organisationUnitGroups/:id (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/organisationUnitGroups/${orgUnitGroupId}`))
      .expect(
        (res)=>{
          expect(res.body.code).toEqual('hospitals');
          expect(res.body.name).toEqual('Hospitals');
          expect(res.body.description).toEqual('Hospitals');
        }
      );
  });
  it(`Get List of organisation unit Groups /api/organisationUnitGroups (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/organisationUnitGroups`))
      .expect(
        (res)=>{
          expect(res.body.pager != undefined).toEqual(true);
          expect(res.body.organisationUnitGroups != undefined).toEqual(true);
        }
      );
  });
  it(`Get List of organisation unit Groups with fields /api/organisationUnitGroups?fields=id,name,description (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/organisationUnitGroups?fields=id,name,description`))
      .expect(
        (res)=>{
          expect(res.body.pager != undefined).toEqual(true);
          expect(res.body.organisationUnitGroups != undefined).toEqual(true);
          let descriptionExists = false;
          res.body.organisationUnitGroups.forEach((oug)=>{
            if(oug.description){
              descriptionExists = true;
            }
          });
          expect(descriptionExists).toEqual(true);
        }
      );
  });
  it(`Get List of organisation unit Groups /api/organisationUnitGroups?filter=name:eq:Hospitals (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/organisationUnitGroups?filter=name:eq:Hospitals`))
      .expect(
        (res)=>{
          expect(res.body.pager != undefined).toEqual(true);
          expect(res.body.organisationUnitGroups != undefined).toEqual(true);
        }
      );
  });
});