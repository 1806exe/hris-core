import request from 'supertest';
import {
  setUpServer,
  addAuthentication,
  tearDownServer,
  server,
} from '../set-up-e2e';

beforeAll(async (done) => {
  await setUpServer();
  done();
});
afterAll(async (done) => {
  await tearDownServer();
  done();
});
let userRoleId;
describe('User Role API', () => {
  test(`Testing Authentication /api/userRoles (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/userRoles`)
      .expect(403)
      .expect(
        '{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}',
      );
  });
  it(`Adding User Role /api/userRoles (POST)`, () => {
    return (
      addAuthentication(request(server.getHttpServer()).post(`/api/userRoles`))
        .send({
          name: 'Update Completeness',
          description:
            'Users with Ability to update completeness of organisation units through completeness report.',
          userAuthorities: [
            {
              id: 'BNt3nE1kOanyD',
              created: '2020-07-06T17:39:36.007Z',
              lastUpdated: '2020-07-06T17:39:36.007Z',
              name: 'ORGANISATIONUNITCOMPLETENESS_AJAXUPDATE',
            },
          ],
        })
        //.expect(200)
        .expect((res) => {
          userRoleId = res.body.id;
          expect(res.body.name).toEqual('Update Completeness');
          expect(res.body.description).toEqual(
            'Users with Ability to update completeness of organisation units through completeness report.',
          );
          expect(res.body.userAuthorities.length).toEqual(1);
        })
    );
  });
});
let userId;
describe('User API', () => {
  test(`Testing Authentication /api/users (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/users`)
      .expect(403)
      .expect(
        '{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}',
      );
  });
  test(`Get Current User (GET)`, () => {
    return addAuthentication(request(server.getHttpServer()).get(`/api/me`))
      .expect(200)
      .expect((res) => {
        expect(res.body.username).toEqual('test');
        expect(res.body.firstName).toEqual('Anonymous');
        expect(res.body.surname).toEqual('Anonymous');
        expect(res.body.email).toEqual('anonymous@example.com');
        expect(res.body.enabled).toEqual(true);
      });
  });
  it(`Adding User /api/users (POST)`, () => {
    return (
      addAuthentication(request(server.getHttpServer()).post(`/api/users`))
        .send({
          username: 'vincentminde',
          firstName: 'Vincent',
          surname: 'Minde',
          email: 'vincentminde@gmail.com',
          enabled: true,
          password: 'HRHIS2020',
          userRoles: [],
          userGroups: [],
          messages: [],
          organisationUnits: [],
        })
        //.expect(200)
        .expect((res) => {
          userId = res.body.id;
          expect(res.body.username).toEqual('vincentminde');
          expect(res.body.firstName).toEqual('Vincent');
          expect(res.body.surname).toEqual('Minde');
          expect(res.body.email).toEqual('vincentminde@gmail.com');
          expect(res.body.enabled).toEqual(true);
          expect(res.body.password).toBeUndefined();
        })
    );
  });

  it(`Adding User with User Role /api/users (POST)`, () => {
    return (
      addAuthentication(request(server.getHttpServer()).post(`/api/users`))
        .send({
          username: 'vincentminde1',
          firstName: 'Vincent',
          surname: 'Minde',
          email: 'vincentminde1@gmail.com',
          enabled: true,
          password: 'HRHIS2020',
          userRoles: [
            {
              id: userRoleId,
            },
          ],
          userGroups: [],
          messages: [],
          organisationUnits: [],
        })
        //.expect(200)
        .expect((res) => {
          userId = res.body.id;
          expect(res.body.username).toEqual('vincentminde1');
          expect(res.body.firstName).toEqual('Vincent');
          expect(res.body.surname).toEqual('Minde');
          expect(res.body.email).toEqual('vincentminde1@gmail.com');
          expect(res.body.enabled).toEqual(true);
          expect(res.body.userRoles.length).toEqual(1);
        })
    );
  });

  it(`Adding Duplicate username /api/users (POST)`, () => {
    return (
      addAuthentication(request(server.getHttpServer()).post(`/api/users`))
        .send({
          username: 'vincentminde1',
          firstName: 'Vincent',
          surname: 'Minde',
          email: 'vincentminde1@gmail.com',
          enabled: true,
          password: 'HRHIS2020',
          userRoles: [
            {
              id: userRoleId,
            },
          ],
          userGroups: [],
          messages: [],
          organisationUnits: [],
        })
        //.expect(200)
        .expect((res) => {
          expect(res.body.username).toBeUndefined();
          expect(res.body.error).toBeDefined();
          expect(res.body.error).toBe(
            'duplicate key value violates unique constraint "UQ_b67337b7f8aa8406e936c2ff754"',
          );
        })
    );
  });

  it(`Editing User /api/users (PUT)`, () => {
    return (
      addAuthentication(
        request(server.getHttpServer()).put(`/api/users/${userId}`),
      )
        .send({
          username: 'minde',
          firstName: 'Vincent',
          surname: 'Minde',
          email: 'minde@gmail.com',
          enabled: false,
        })
        //.expect(200)
        .expect((res) => {
          expect(res.body.payload.username).toEqual('minde');
          expect(res.body.payload.firstName).toEqual('Vincent');
          expect(res.body.payload.surname).toEqual('Minde');
          expect(res.body.payload.email).toEqual('minde@gmail.com');
          expect(res.body.payload.enabled).toBeUndefined();
          expect(res.body.payload.password).toBeUndefined();
          expect(res.body.payload.message).toBeDefined
        })
    );
  });

  it(`Delete User /api/users/userId (DELETE)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .delete(`/api/users/${userId}`)
        .expect((res) => {
          expect(res.body.message).toBe(
            `Object with id ${userId} deleted successfully`,
          );
        }),
    );
  });
});
