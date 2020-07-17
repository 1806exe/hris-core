import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
let orgUnitId;
describe('Organisation Unit API', () => {
  it(`Testing Authentication /api/organisationUnits (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/organisationUnits`)
      .expect(403)
      .expect(
        '{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}',
      );
  });
  it(`Adding Organisation /api/organisationUnits (POST)`, () => {
    return (
      addAuthentication(
        request(server.getHttpServer()).post(`/api/organisationUnits`),
      )
        .send({
          id: '52893cd1b8359',
          code: 'MOHCDGEC',
          name: 'Ministry Of Health',
          description: 'Ministry of Health and Social welfare',
          //"dhisuid": "m0frOspS7JY",
          shortName: 'MOHCDGEC',
          active: true,
          level: 1,
        })
        //.expect(200)
        .expect((res) => {
          orgUnitId = res.body.id;
          expect(res.body.code).toEqual('MOHCDGEC');
          expect(res.body.name).toEqual('Ministry Of Health');
          expect(res.body.shortName).toEqual('MOHCDGEC');
          expect(res.body.active).toEqual(true);
          expect(res.body.level).toBe(1);
        })
    );
  });
  it(`Adding Duplicate Organisation /api/organisationUnits (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).post(`/api/organisationUnits`),
    )
      .send({
        id: '52893cd1b8359',
        code: 'MOHCDGEC',
        name: 'Ministry Of Health',
        description: 'Ministry of Health and Social welfare',
        dhisuid: 'm0frOspS7JY',
        shortName: 'MOHCDGEC',
        active: true,
        level: 1,
      })
      .expect((res) => {
        expect(res.body.error != undefined).toEqual(true);
      });
  });
  it(`Get Organisation Unit by ID /api/organisationUnits/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(
        `/api/organisationUnits/${orgUnitId}`,
      ),
    ).expect((res) => {
      expect(res.body.code).toEqual('MOHCDGEC');
      expect(res.body.name).toEqual('Ministry Of Health');
      expect(res.body.level).toEqual(1);
      expect(res.body.shortName).toEqual('MOHCDGEC');
      expect(res.body.active).toEqual(true);
    });
  });
  it(`Adding Child Organisation /api/organisationUnits (POST)`, () => {
    return (
      addAuthentication(
        request(server.getHttpServer()).post(`/api/organisationUnits`),
      )
        .send({
          code: 'Regions',
          name: 'The Region',
          description: 'The Region Details',
          parent: {
            id: orgUnitId,
          },
          shortName: 'The Region',
          active: true,
        })
        //.expect(200)
        .expect((res) => {
          expect(res.body.code).toEqual('Regions');
          expect(res.body.name).toEqual('The Region');
          expect(res.body.shortName).toEqual('The Region');
          expect(res.body.active).toEqual(true);
        })
    );
  });
  it(`Get List of organisation units /api/organisationUnits (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(`/api/organisationUnits`),
    ).expect((res) => {
      expect(res.body.pager != undefined).toEqual(true);
      expect(res.body.organisationUnits != undefined).toEqual(true);
      expect(res.body.organisationUnits.length).toEqual(2);
    });
  });
  it(`Get List of organisation units with fields /api/organisationUnits?fields=id,name,parent (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(
        `/api/organisationUnits?fields=id,name,parent`,
      ),
    ).expect((res) => {
      expect(res.body.pager != undefined).toEqual(true);
      expect(res.body.organisationUnits != undefined).toEqual(true);
      expect(res.body.organisationUnits.length).toEqual(2);
      let parentExists = false;
      res.body.organisationUnits.forEach((ou) => {
        if (ou.parent) {
          parentExists = true;
        }
      });
      expect(parentExists).toEqual(true);
    });
  });
  it(`Get List of organisation units /api/organisationUnits?filter=shortName:eq:MOHCDGEC (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(
        `/api/organisationUnits?filter=shortName:eq:MOHCDGEC`,
      ),
    ).expect((res) => {
      expect(res.body.pager != undefined).toEqual(true);
      expect(res.body.organisationUnits != undefined).toEqual(true);
      expect(res.body.organisationUnits.length).toEqual(1);
    });
  });
});
//Forms
let formId;
describe('Forms API', () => {
  it(`Testing Authentication /api/forms (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/forms`)
      .expect(403)
      .expect(
        '{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}',
      );
  });
  it(`Adding form /api/forms (POST)`, () => {
    return (
      addAuthentication(request(server.getHttpServer()).post(`/api/forms`))
        .send({
          id: '52893cd128bd2',
          name: 'Public Employee Form',
          title: 'Public Employee Form',
        })
        //.expect(200)
        .expect((res) => {
          console.log(res.body  );
          formId = res.body.id;
          expect(res.body.name).toEqual('Public Employee Form');
          expect(res.body.title).toEqual('Public Employee Form');
        })
    );
  });
  it(`Get form by ID /api/forms/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(`/api/forms/${formId}`),
    ).expect((res) => {
      expect(res.body.name).toEqual('Public Employee Form');
      expect(res.body.title).toEqual('Public Employee Form');
    });
  });
});
let fieldId;
describe('Fields API', () => {
  it(`Testing Authentication /api/fields (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/fields`)
      .expect(403)
      .expect(
        '{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}',
      );
  });
  it(`Adding field /api/fields (POST)`, () => {
    return (
      addAuthentication(request(server.getHttpServer()).post(`/api/fields`))
        .send({
          id: '5289e934ab062',
          name: 'firstname',
          description: 'Compulsory, Employee`s Firstname',
          caption: 'First Name',
          compulsory: true,
        })
        //.expect(200)
        .expect((res) => {
          fieldId = res.body.id;
          expect(res.body.name).toEqual('firstname');
          expect(res.body.description).toEqual(
            'Compulsory, Employee`s Firstname',
          );
        })
    );
  });
  it(`Get field by ID /api/fields/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(`/api/fields/${fieldId}`),
    ).expect((res) => {
      expect(res.body.name).toEqual('firstname');
      expect(res.body.description).toEqual('Compulsory, Employee`s Firstname');
    });
  });
  it(`Get List of fields with fields /api/fields?fields=id,name,description (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(
        `/api/fields?fields=id,name,description`,
      ),
    ).expect((res) => {
      expect(res.body.pager != undefined).toEqual(true);
      expect(res.body.fields != undefined).toEqual(true);
      let descriptionExists = false;
      res.body.fields.forEach((fld) => {
        if (fld.description) {
          descriptionExists = true;
        }
      });
      expect(descriptionExists).toEqual(true);
    });
  });
  it(`Get List of fields /api/fields?filter=name:eq:firstname (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(
        `/api/fields?filter=name:eq:firstname`,
      ),
    ).expect((res) => {
      expect(res.body.pager != undefined).toEqual(true);
      expect(res.body.fields != undefined).toEqual(true);
    });
  });
});
//Records
let recordId;
describe('Records API', () => {
  it(`Testing Authentication /api/records (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/records`)
      .expect(403)
      .expect(
        '{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}',
      );
  });
  it(`Adding record /api/records (POST)`, () => {
    return (
      addAuthentication(request(server.getHttpServer()).post(`/api/records`))
        .send({
          id: '52c005d00b8c0',
          instance: '696b1a035eb7d7c989f0dc50df3e7bcf',
          form: {
            id: formId,
          },
          organisationUnit: {
            id: orgUnitId
          },
          // recordValues: [
          //   {
          //     id: 'lYrXUyHLGnga8',
          //     recordvalueid: '611626',
          //     value: 'Nicholaus',
          //     recordid: '55853',
          //     fieldid: '140',
          //     field: {
          //       id: '5289e934ab062',
          //     },
          //   },
          //   {
          //     id: 'h4USzRcH1wOCh',
          //     recordvalueid: '611627',
          //     value: 'Kisandu',
          //     recordid: '55853',
          //     fieldid: '147',
          //     field: {
          //       id: '5289e934b2b33',
          //       name: 'middlename',
          //       description: 'Optional, Employee`s Middle name',
          //       caption: 'Middle Name',
          //     },
          //   },
          //   {
          //     id: 'lXLxdHiLoRyRj',
          //     recordvalueid: '611628',
          //     value: 'Mhozya',
          //     recordid: '55853',
          //     fieldid: '159',
          //     field: {
          //       id: '5289e934c02a1',
          //       name: 'surname',
          //       description:
          //         'Compulsory, Employee Surname, Surname keeps history, update it through history.',
          //       caption: 'Surname',
          //     },
          //   },
          //   {
          //     id: 'jRHBhF56tatZS',
          //     recordvalueid: '611629',
          //     value: 'Male',
          //     recordid: '55853',
          //     fieldid: '157',
          //     field: {
          //       id: '5289e934bde20',
          //       name: 'sex',
          //       description: 'Compulsory, Gender of Employee.',
          //       caption: 'Sex',
          //     },
          //   },
          //   {
          //     id: 'nX4ISBbYV21lo',
          //     recordvalueid: '611631',
          //     value: 'Primary Education',
          //     recordid: '55853',
          //     fieldid: '123',
          //     field: {
          //       id: '5289e93496216',
          //       name: 'basic_education_level',
          //       description: 'Compulsory. `s Education Level',
          //       caption: 'Basic Education Level',
          //     },
          //   },
          //   {
          //     id: 'IxiWGbTnDiaZH',
          //     recordvalueid: '611632',
          //     value: 'Certificate',
          //     recordid: '55853',
          //     fieldid: '133',
          //     field: {
          //       id: '5289e934a36d7',
          //       name: 'edu_evel',
          //       description:
          //         'Compulsory, Employee`s Highest education level, Educational level keeps history, should be updated through history.',
          //       caption: 'Profession Education Level',
          //     },
          //   },
          // ],
        })
        .expect((res) => {
          recordId = res.body.id;
          console.log(res.body)
          expect(res.body.form.name).toEqual('Public Employee Form');
          expect(res.body.organisationUnit.name).toEqual('Ministry Of Health');
        })
    );
  });
  it(`Get record by ID /api/records/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(`/api/records/${recordId}`),
    ).expect((res) => {
      expect(res.body.form).toEqual('Public Employee Form');
      expect(res.body.organisationUnit).toEqual('Ministry Of Health');
    });
  });
});
