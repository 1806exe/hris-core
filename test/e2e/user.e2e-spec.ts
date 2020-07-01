import request from 'supertest';
import { setUpServer, addAuthentication, tearDownServer, server } from '../set-up-e2e';

beforeAll(async (done) => {
  await setUpServer();
  done();
});
afterAll(async (done) => {
  await tearDownServer();
  done();
});
describe('User API', () => {

  test(`Testing Authentication /api/users (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/users`)
      .expect(403)
      .expect('{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}');
  });
  test(`Get Current User (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
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
});
