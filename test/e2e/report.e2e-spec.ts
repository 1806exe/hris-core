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
let reportId;
describe('Report API', () => {
  it(`Testing Authentication /api/reports (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/reports`)
      .expect(403)
      .expect('{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}');
  });
  it(`Adding Report /api/reports (POST)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .post(`/api/reports`))
      .send({
        "created": "2020-07-11T08:57:00.415Z",
        "lastUpdated": "2020-07-11T08:57:00.415Z",
        "name": "report1",
        "type": "html",
        "html": "<html></html>"
      })
      //.expect(200)
      .expect(
        (res)=>{
          console.log(res.body);
          reportId = res.body.id;
          expect(res.body.name).toEqual('report1');
          expect(res.body.type).toEqual('html');
          expect(res.body.html).toEqual("<html></html>");
        }
      );
  });
  it(`Get Report by ID /api/reports/:id (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/reports/${reportId}`))
      .expect(
        (res)=>{
          expect(res.body.name).toEqual('report1');
          expect(res.body.type).toEqual('html');
          expect(res.body.html).toEqual("<html></html>");
        }
      );
  });
});
let reportGroupId;
describe('Report Groups API', () => {
  it(`Testing Authentication /api/reportGroups (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/reportGroups`)
      .expect(403)
      .expect('{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}');
  });
  it(`Adding Report Group /api/reportGroups (POST)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .post(`/api/reportGroups`))
      .send({
        "name": "Reports"
      })
      //.expect(200)
      .expect(
        (res)=>{
          reportGroupId = res.body.id;
          expect(res.body.name).toEqual('Reports');
        }
      );
  });
  it(`Get Report Group by ID /api/reportGroups/:id (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/reportGroups/${reportGroupId}`))
      .expect(
        (res)=>{
          expect(res.body.name).toEqual('Reports');
        }
      );
  });
  it(`Get List of Report Groups /api/reportGroups (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/reportGroups`))
      .expect(
        (res)=>{
          expect(res.body.pager != undefined).toEqual(true);
          expect(res.body.reportGroups != undefined).toEqual(true);
        }
      );
  });
  it(`Get List of Report Groups with fields /api/reportGroups?fields=id,name (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/reportGroups?fields=id,name`))
      .expect(
        (res)=>{
          expect(res.body.pager != undefined).toEqual(true);
          expect(res.body.reportGroups != undefined).toEqual(true);
          let nameExists = false;
          res.body.reportGroups.forEach((oug)=>{
            if(oug.name){
              nameExists = true;
            }
          });
          expect(nameExists).toEqual(true);
        }
      );
  });
  it(`Get List ofReport Groups /api/reportGroups?filter=name:eq:Reports (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/reportGroups?filter=name:eq:Reports`))
      .expect(
        (res)=>{
          expect(res.body.pager != undefined).toEqual(true);
          expect(res.body.reportGroups != undefined).toEqual(true);
        }
      );
  });
  it(`Adding Report Group /api/reportGroups (POST)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .post(`/api/reportGroups`))
      .send({
        "name": "Reports1",
        "repotrs":[
          {
            "id":reportId
          }
        ]
      })
      //.expect(200)
      .expect(
        (res)=>{
          reportGroupId = res.body.id;
          console.log(res.body);
          expect(res.body.name).toEqual('Reports1');
        }
      );
  });
  it(`Get Report Group by ID /api/reportGroups/:id (GET)`, () => {
    return addAuthentication(request(server.getHttpServer())
      .get(`/api/reportGroups/${reportGroupId}`))
      .expect(
        (res)=>{
          expect(res.body.name).toEqual('Reports1');
          expect(res.body.reports.length).toEqual(1);
        }
      );
  });
});
