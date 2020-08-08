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
describe('Authentication API', () => {
  it(`Testing login /api/login (POST)`, () => {
    return request(server.getHttpServer()).post(`/api/login`)
      .send({
        username: 'test',
        password: 'HRHIS2020',
      })
      .expect((res) => {
        expect(res.body.username).toEqual('test');
        expect(res.body.email).toEqual('anonymous@example.com');
        expect(res.body.surname).toEqual('Anonymous');
        expect(res.body.password).toBeUndefined();
      });
  });
  it(`Testing Session creation /api/me (GET)`, () => {
    return request(server.getHttpServer()).get(`/api/me`)
      .expect((res) => {
        console.log(res.body);
        expect(res.body.username).toEqual('test');
        expect(res.body.email).toEqual('anonymous@example.com');
        expect(res.body.surname).toEqual('Anonymous');
        expect(res.body.password).toBeUndefined();
      });
  });
});
