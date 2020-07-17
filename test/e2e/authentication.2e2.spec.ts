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
    return addAuthentication(request(server.getHttpServer()).post(`/api/login`))
      .send({
        id: '573usnbdldi',
        name: 'test',
        password: 'HRHIS2020',
      })
      .expect((res) => {
        expect(res.body.name).toEqual('test');
        expect(res.body.email).toBeNull;
        expect(res.body.surname).toBeNull;
      });
  });
});
