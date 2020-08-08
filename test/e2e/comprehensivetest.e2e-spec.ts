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
          name: 'Public Employee Form',
          title: 'Public Employee Form',
        })
        //.expect(200)
        .expect((res) => {
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
let fieldOptionId;
let fieldGroupdId;
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
          name: 'firstname',
          description: 'Compulsory, Employee`s Firstname',
          caption: 'First Name',
          compulsory: true,
          skipinreport: true,
          sort: 5,
          hastraining: false,
          externalaccess: true,
          skipInReport: true,
          hasTraining: false,
        })
        //.expect(200)
        .expect((res) => {
          fieldId = res.body.id;
          expect(res.body.name).toEqual('firstname');
          expect(res.body.description).toEqual(
            'Compulsory, Employee`s Firstname',
          );
          expect(res.body.compulsory).toBe(true);
          expect(res.body.skipInReport).toBe(true);
          expect(res.body.hastraining).toBe(false);
          expect(res.body.hasTraining).toBe(false);
          expect(res.body.externalaccess).toBe(true);
          expect(res.body.sort).toBe(5);
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
  it(`Add Field Options /api/fieldOptions (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).post(`/api/fieldOptions`),
    )
      .send({
        value: 'Ordinary Secondary Education',
        name: 'Secondary Education',
        field: { id: fieldId },
      })
      .expect((res) => {
        fieldOptionId = res.body.id;
        expect(res.body.value).toEqual('Ordinary Secondary Education');
        expect(res.body.name).toEqual('Secondary Education');
      });
  });
  it(`Get one Field Option /api/fieldOptions/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(`/api/fieldOptions/${fieldOptionId}`),
    ).expect((res) => {
      expect(res.body.name).toEqual('Secondary Education');
      expect(res.body.value).toEqual(`Ordinary Secondary Education`);
    });
  });
  it(`Create Field Groups /api/fielGroups (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).post(`/api/fieldGroups`),
    )
      .send({
        name: 'Fields',
        field: fieldId,
        description: 'Fields that belong together',
        publicAccess: false,
      })
      .expect((res) => {
        fieldGroupdId = res.body.id;
        expect(res.body.name).toEqual('Fields');
        expect(res.body.publicAccess).toBe(false);
        expect(res.body.description).toEqual('Fields that belong together');
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
    return addAuthentication(
      request(server.getHttpServer()).post(`/api/records`),
    )
      .send({
        instance: '696b1a035eb7d7c989f0dc50df3e7bcf',
        form: formId,
        organisationUnit: orgUnitId,
      })
      .expect((res) => {
        recordId = res.body.id;
        expect(res.body.form.name).toEqual('Public Employee Form');
        expect(res.body.organisationUnit.name).toEqual('Ministry Of Health');
      });
  });
  it(`Get record by ID /api/records/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).get(`/api/records/${recordId}`),
    ).expect((res) => {
      expect(res.body.form.name).toEqual('Public Employee Form');
      expect(res.body.organisationUnit.name).toEqual('Ministry Of Health');
    });
  });
  it(`Add Recorvalues /api/record/:id/recordValue (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).post(
        `/api/records/${recordId}/recordValues`,
      ),
    )
      .send({
        value: 'Primary Education',
        comment: 'Graduated in 1993',
        entitledPayment: 'Yes',
        field: fieldId,
      })
      .expect((res) => {
        expect(res.body.value).toEqual('Primary Education');
        expect(res.body.comment).toEqual('Graduated in 1993');
        expect(res.body.field.name).toEqual('firstname');
        expect(res.body.field.compulsory).toBe(true);
      });
  });
});
