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
describe('Training Module API', () => {
  it(`Testing Authentication /api/training (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/training/sessions`)
      .expect(403)
      .expect(
        '{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}',
      );
  });
  let sectionId: string;
  let unitId: string;
  let curriculumId: string;
  let sponsorId: string;
  let organiserId: string;
  let venueId: string;
  let orgunitId: string;
  let sessionId: string;

  it(`Adding Organisation /api/organisationUnits (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).post(`/api/organisationUnits`),
    )
      .send({
        code: 'ARFMBAG',
        name: 'Arafa Mbagala Kuu Dispensary',
        shortName: 'Arafa Mbagala Kuu',
        active: true,
      })
      .expect((res) => {
        orgunitId = res.body.id;
        expect(res.body.code).toEqual('ARFMBAG');
        expect(res.body.name).toEqual('Arafa Mbagala Kuu Dispensary');
        expect(res.body.shortName).toEqual('Arafa Mbagala Kuu');
        expect(res.body.active).toEqual(true);
      });
  });
  it(`Adding Section /api/training/sections (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/training/sections`)
        .send({
          name: 'RCHS',
          description: 'RCHS Sections',
        })

        .expect((res) => {
          sectionId = res.body.id;
          expect(res.body.name).toEqual('RCHS');
          expect(res.body.description).toEqual('RCHS Sections');
        }),
    );
  });

  it(`Adding Unit /api/training/units (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/training/units`)
        .send({
          name: 'Child Health',
          description: 'Child Healt Unit',
        })

        .expect((res) => {
          unitId = res.body.id;
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('Child Health');
          expect(res.body.description).toBeDefined();
          expect(res.body.description).toEqual('Child Healt Unit');
        }),
    );
  });

  it(`Adding Organiser /api/training/sponsors (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/training/sponsors`)
        .send({
          name: 'CEDHA',
          description: 'Training Organiser',
        })

        .expect((res) => {
          organiserId = res.body.uid;
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('CEDHA');
          expect(res.body.description).toBeDefined();
        }),
    );
  });

  it(`Adding Sponsor /api/training/sponsors (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/training/sponsors`)
        .send({
          name: 'Intrahealth  International',
          description: 'Training Sponsors',
        })

        .expect((res) => {
          sponsorId = res.body.uid;
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('Intrahealth  International');
          expect(res.body.description).toBeDefined();
        }),
    );
  });

  it(`Adding Venue /api/training/venues (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/training/venues`)
        .send({
          name: 'CoICT',
          region: 'Dar Es Salaam',
          district: 'Kinondoni',
          organisationUnit: orgunitId,
        })
        .expect((res) => {
          venueId = res.body.id;
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('CoICT');
          expect(res.body.organisationUnit).toBeDefined();
        }),
    );
  });

  it(`Get Sections /api/training/sections (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/sections`)
        .expect((res) => {
          expect(200);
          expect(res.body.sections[0].name).toBeDefined();
          expect(res.body.sections[0].name).toEqual('RCHS');
        }),
    );
  });

  it(`Get One Section By ID /api/training/sections/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/sections/${sectionId}`)
        .expect((res) => {
          expect(200);
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('RCHS');
        }),
    );
  });

  it(`Apply filters on Sections /api/training/sections?filter=description:eq:RCHS Sections (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/sections?filter=description:eq:RCHS Sections`)
        .expect((res) => {
          expect(200);
          expect(res.body.sections[0].description).toBeDefined();
          expect(res.body.sections[0].description).toEqual('RCHS Sections');
        }),
    );
  });

  it(`Apply get by fields on Sections /api/training/sections?fields=description (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/sections?fields=description`)
        .expect((res) => {
          expect(200);
          expect(res.body.sections[0].description).toBeDefined();
          expect(res.body.sections[0].description).toEqual('RCHS Sections');
          expect(res.body.sections[0].name).toBeUndefined();
          expect(res.body.sections[0].id).toBeUndefined();
        }),
    );
  });

  it(`Get Units /api/training/units (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/units`)
        .expect((res) => {
          expect(200);
          expect(res.body.units[0].name).toBeDefined();
          expect(res.body.units[0].description).toBeDefined();
          expect(res.body.units[0].name).toEqual('Child Health');
          expect(res.body.units[0].description).toEqual('Child Healt Unit');
        }),
    );
  });

  it(`Get One Unit By ID /api/training/units/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/units/${unitId}`)
        .expect((res) => {
          expect(200);
          expect(res.body.name).toBeDefined();
          expect(res.body.description).toBeDefined();
          expect(res.body.name).toEqual('Child Health');
          expect(res.body.description).toEqual('Child Healt Unit');
        }),
    );
  });

  it(`Apply filters on Units /api/training/units?filter=name:eq:Child Health (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/units/${unitId}`)
        .expect((res) => {
          expect(200);
          expect(res.body.name).toBeDefined();
          expect(res.body.description).toBeDefined();
          expect(res.body.name).toEqual('Child Health');
          expect(res.body.description).toEqual('Child Healt Unit');
        }),
    );
  });

  it(`Apply filters on Units /api/training/units?fields=name(GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/units?fields=name`)
        .expect((res) => {
          expect(200);
          expect(res.body.units[0].name).toBeDefined();
          expect(res.body.units[0].description).toBeUndefined();
          expect(res.body.units[0].name).toEqual('Child Health');
        }),
    );
  });

  it(`Edit Section /api/training/sections (PUT)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .put(`/api/training/sections/${sectionId}`)
        .send({
          name: 'Changed Section Name',
        })
        .expect((res) => {
          expect(res.body.payload.name).toBeDefined();
          expect(res.body.payload.name).toEqual('Changed Section Name');
        }),
    );
  });

  it(`Edit Unit /api/training/units (PUT)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .put(`/api/training/units/${unitId}`)
        .send({
          name: 'New Changed Unit Name',
        })

        .expect((res) => {
          expect(res.body.payload.name).toBeDefined();
          expect(res.body.payload.name).toEqual('New Changed Unit Name');
        }),
    );
  });

  it(`Edit Sponsor /api/training/sponsors (PUT)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .put(`/api/training/sponsors/${sponsorId}`)
        .send({
          name: 'New Changed Sponsor Name',
        })

        .expect((res) => {
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(
            `Item with id ${sponsorId} updated successfully.`,
          );
        }),
    );
  });

  it(`Adding Curriculum /api/training/curriculums (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/training/curriculums`)
        .send({
          name: 'Long Acting Contraceptive Training',
          allMethodsSelected: true,
          section: sectionId,
          unit: unitId,
          trainingTopics: [],
        })

        .expect((res) => {
          curriculumId = res.body.id;
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('Long Acting Contraceptive Training');
          expect(res.body.allMethodsSelected).toBeDefined();
          expect(res.body.allMethodsSelected).toBe(true);
          expect(res.body.section).toBeDefined();
          expect(res.body.section.name).toEqual('Changed Section Name');
          expect(res.body.unit).toBeDefined();
          expect(res.body.unit.description).toEqual('Child Healt Unit');
        }),
    );
  });

  it(`Getting Curriculums /api/training/curriculums (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/curriculums`)

        .expect((res) => {
          expect(res.body.curriculums[0].name).toBeDefined();
          expect(res.body.curriculums[0].name).toEqual(
            'Long Acting Contraceptive Training',
          );
          expect(res.body.curriculums[0].allMethodsSelected).toBeDefined();
          expect(res.body.curriculums[0].allMethodsSelected).toBe(true);
          expect(res.body.curriculums[0].section).toBeDefined();
          expect(res.body.curriculums[0].section.name).toEqual(
            'Changed Section Name',
          );
          expect(res.body.curriculums[0].unit).toBeDefined();
          expect(res.body.curriculums[0].unit.description).toEqual(
            'Child Healt Unit',
          );
        }),
    );
  });
  it(`Get One Curriculum /api/training/curriculums/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/curriculums/${curriculumId}`)

        .expect((res) => {
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('Long Acting Contraceptive Training');
          expect(res.body.allMethodsSelected).toBeDefined();
          expect(res.body.allMethodsSelected).toBe(true);
          expect(res.body.section).toBeDefined();
          expect(res.body.section.name).toEqual('Changed Section Name');
          expect(res.body.unit).toBeDefined();
          expect(res.body.unit.description).toEqual('Child Healt Unit');
        }),
    );
  });

  it(`Creating a Session /api/training/sessions (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/training/sessions`)
        .send({
          curriculum: curriculumId,
          deliveryMode: 'On Class',
          orgunit: orgunitId,
          venue: venueId,
          sponsor: sponsorId,
          organiser: organiserId,
          startdate: '2019-10-10',
          enddate: '2020-2-20',
          participants: [],
          topics: [],
          facilitators: [],
        })
        .expect((res) => {
          sessionId = res.body.id;
          expect(res.body.deliverymode).toBeDefined();
          expect(res.body.deliverymode).toEqual('On Class');
          expect(res.body.venue.name).toEqual('CoICT');
          expect(res.body.sponsor).toBeDefined();
          expect(res.body.organiser).toBeDefined();
          expect(res.body.curriculum).toBeDefined();
          expect(res.body.organisationUnit).toBeDefined();
          expect(res.body.organisationUnit.name).toEqual(
            'Arafa Mbagala Kuu Dispensary',
          );
          expect(res.body.organisationUnit.code).toBeDefined();
        }),
    );
  });

  it(`Get One Session /api/training/sessions/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/sessions/${sessionId}`)
        .expect((res) => {
          expect(res.body.deliverymode).toBeDefined();
          expect(res.body.deliverymode).toEqual('On Class');
          expect(res.body.venue.name).toEqual('CoICT');
          expect(res.body.sponsor).toBeDefined();
          expect(res.body.organiser).toBeDefined();
          expect(res.body.curriculum).toBeDefined();
          expect(res.body.organisationUnit).toBeDefined();
          expect(res.body.organisationUnit.name).toEqual(
            'Arafa Mbagala Kuu Dispensary',
          );
          expect(res.body.organisationUnit.code).toBeDefined();
        }),
    );
  });

  it(`Perform Filters on Session /api/training/sessions?filter:id:eq:sessionId (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/sessions?filter=id:eq:${sessionId}`)
        .expect((res) => {
          expect(res.body.sessions[0].deliverymode).toBeDefined();
          expect(res.body.sessions[0].deliverymode).toEqual('On Class');
          expect(res.body.sessions[0].venue.name).toEqual('CoICT');
          expect(res.body.sessions[0].sponsor).toBeDefined();
          expect(res.body.sessions[0].organiser).toBeDefined();
          expect(res.body.sessions[0].curriculum).toBeDefined();
          expect(res.body.sessions[0].organisationUnit).toBeDefined();
          expect(res.body.sessions[0].organisationUnit.name).toEqual(
            'Arafa Mbagala Kuu Dispensary',
          );
          expect(res.body.sessions[0].organisationUnit.code).toBeDefined();
        }),
    );
  });

  it(`Get session by sepecifying fields /api/training/sessions?fields=unit (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/training/sessions?fields=curriculum`)
        .expect((res) => {
          expect(res.body.sessions[0].deliverymode).toBeUndefined();
          expect(res.body.sessions[0].venue).toBeUndefined();
          expect(res.body.sessions[0].sponsor).toBeUndefined();
          expect(res.body.sessions[0].organiser).toBeUndefined();
          expect(res.body.sessions[0].organisationUnit).toBeUndefined();
          expect(res.body.sessions[0].curriculum).toBeDefined();
          expect(res.body.sessions[0].curriculum.name).toEqual(
            'Long Acting Contraceptive Training',
          );
        }),
    );
  });
  it(`Delete a Session /api/training/session/:id (DELETE)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .delete(`/api/training/sessions/${sessionId}`)
        .expect((res) => {
          expect(res.body.message).toBe(
            `Object with id ${sessionId} deleted successfully`,
          );
        }),
    );
  });

  it(`Delete a Curriculums /api/training/curriculums/:id (DELETE)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .delete(`/api/training/curriculums/${curriculumId}`)
        .expect((res) => {
          expect(res.body.message).toBe(
            `Object with id ${curriculumId} deleted successfully`,
          );
        }),
    );
  });

  it(`Delete a Unit /api/training/units/:id (DELETE)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .delete(`/api/training/units/${unitId}`)
        .expect((res) => {
          expect(res.body.message).toBe(
            `Object with id ${unitId} deleted successfully`,
          );
        }),
    );
  });

  it(`Delete a Section /api/training/sections/:id (DELETE)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .delete(`/api/training/sections/${sectionId}`)
        .expect((res) => {
          expect(res.body.message).toBe(
            `Object with id ${sectionId} deleted successfully`,
          );
          expect(res.body.name).toBeUndefined();
        }),
    );
  });

  it(`Delete a Sponsor /api/training/sponsors/:id (DELETE)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .delete(`/api/training/sponsors/${sponsorId}`)
        .expect((res) => {
          expect(res.body.message).toBe(
            `Object with id ${sponsorId} deleted successfully`,
          );
          expect(res.body.name).toBeUndefined();
        }),
    );
  });
});
