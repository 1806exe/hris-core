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

  it(`Adding Curriculum /api/training/curriculums (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/training/curriculums`)
        .send({
          name: 'Long Acting Contraceptive Training',
          allMethodsSelected: true,
          section: {
            id: sectionId,
          },
          unit: {
            id: unitId,
          },
          trainingTopics: [],
        })

        .expect((res) => {
          curriculumId = res.body.id;
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('Long Acting Contraceptive Training');
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
          expect(res.body.deliverymode).toBeDefined();
          expect(res.body.deliverymode).toEqual('On Class');
          expect(res.body.venue.name).toEqual('CoICT');
          expect(res.body.sponsor).toBeDefined();
          expect(res.body.curriculum).toBeDefined();
          expect(res.body.organisationUnit).toBeDefined();
          expect(res.body.organisationUnit.name).toEqual(
            'Arafa Mbagala Kuu Dispensary',
          );
          expect(res.body.organisationUnit.code).toBeDefined();
        }),
    );
  });
});
