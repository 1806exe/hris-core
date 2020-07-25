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
describe('Visualization Module API', () => {
  it(`Testing Authentication /api/dashboards (GET)`, () => {
    return request(server.getHttpServer())
      .get(`/api/dashboards`)
      .expect(403)
      .expect(
        '{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}',
      );
  });
});

let dashboardId: string;
let dashboarditemId: string;
let visualizationId: string;
let dimensionId: string;
let itemsId: string;
describe(`Testing Visualizations`, () => {
  it(`Add new Visualization /api/visualizations (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/visualizations`)
        .send({
          name: 'Employments',
          publicAccess: '--------',
          type: 'COLUMN',
          regressionType: 'NONE',
          title: 'Employments',
          dimensions: [
            {
              dimension: 'dx',
              layout: 'columns',
              items: [
                {
                  id: 'ja90GDJpma9anQ',
                  dimensionItem: 'uLhsWqITzfk6p',
                  dimensionItemType: 'INDICATOR',
                },
              ],
            },
          ],
        })
        .expect((res) => {
          visualizationId = res.body.id;
          dimensionId = res.body.dimensions.id;
          dimensionId = res.body.dimensions[0].items[0].id;
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('Employments');
          expect(res.body.type).toBeDefined();
          expect(res.body.type).toBe('COLUMN');
          expect(res.body.regressionType).toBeDefined();
          expect(res.body.dimensions).toBeDefined();
          expect(res.body.dimensions[0].layout).toEqual('columns');
          expect(res.body.dimensions[0].items).toBeDefined();
          expect(res.body.dimensions[0].items[0].dimensionItemType).toBe(
            'INDICATOR',
          );
        }),
    );
  });

  it(`Get Visualizations /api/visualizations (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/visualizations`)
        .expect((res) => {
          expect(res.body.visualizations[0].name).toBeDefined();
          expect(res.body.visualizations[0].name).toEqual('Employments');
          expect(res.body.visualizations[0].type).toBeDefined();
          expect(res.body.visualizations[0].type).toBe('COLUMN');
          expect(res.body.visualizations[0].regressionType).toBeDefined();
        }),
    );
  });

  it(`Get One Visualization /api/visualizations/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/visualizations/${visualizationId}`)
        .expect((res) => {
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('Employments');
          expect(res.body.type).toBeDefined();
          expect(res.body.type).toBe('COLUMN');
          expect(res.body.regressionType).toBeDefined();
        }),
    );
  });

  it(`Apply filters Visualization /api/visualizations?filter=name:eq:Employments (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/visualizations?filter=name:eq:Employments`)
        .expect((res) => {
          expect(res.body.visualizations[0].name).toBeDefined();
          expect(res.body.visualizations[0].name).toEqual('Employments');
          expect(res.body.visualizations[0].type).toBeDefined();
          expect(res.body.visualizations[0].type).toBe('COLUMN');
          expect(res.body.visualizations[0].regressionType).toBeDefined();
        }),
    );
  });

  it(`Apply fields Visualization /api/visualizations?fields=name (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/visualizations?fields=name`)
        .expect((res) => {
          expect(res.body.visualizations[0].name).toBeDefined();
          expect(res.body.visualizations[0].name).toEqual('Employments');
          expect(res.body.visualizations[0].type).toBeUndefined();
          expect(res.body.visualizations[0].regressionType).toBeUndefined();
        }),
    );
  });

  it(`Add new Visualization /api/visualizations/:id (PUT)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .put(`/api/visualizations/${visualizationId}`)
        .send({
          name: 'History',
          title: 'History of Employees',
        })
        .expect((res) => {
          expect(res.body.payload.name).toBeDefined();
          expect(res.body.payload.name).toEqual('History');
          expect(res.body.payload.type).toBe('COLUMN');
          expect(res.body.payload.title).toBe('History of Employees');
          expect(res.body.payload.regressionType).toBeDefined();
        }),
    );
  });
});

describe(`Testing DashboardItems`, () => {
  it(`Add a new Dashboard Item /api/dashboardItems (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/dashboardItems`)
        .send({
          publicAccess: '--------',
          shape: 'FULL_WIDTH',
          type: 'CHART',
          visualization: { id: visualizationId },
        })
        .expect((res) => {
          dashboarditemId = res.body.id;
          expect(res.body.shape).toBeDefined();
          expect(res.body.shape).toEqual('FULL_WIDTH');
          expect(res.body.type).toBeDefined();
          expect(res.body.type).toEqual('CHART');
          expect(res.body.visualization).toBeDefined();
          expect(res.body.appKey).toBeUndefined();
        }),
    );
  });

  it(`Get all Dashboard Items /api/dashboardItems (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/dashboardItems`)
        .expect((res) => {
          expect(res.body.dashboardItems[0].shape).toBeDefined();
          expect(res.body.dashboardItems[0].shape).toEqual('FULL_WIDTH');
          expect(res.body.dashboardItems[0].type).toBeDefined();
          expect(res.body.dashboardItems[0].type).toEqual('CHART');
          expect(res.body.dashboardItems[0].visualization).toBeDefined();
          expect(res.body.dashboardItems[0].appKey).toBeUndefined();
        }),
    );
  });

  it(`Get one Dashboard Items /api/dashboardItems/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/dashboardItems/${dashboarditemId}`)
        .expect((res) => {
          expect(res.body.shape).toBeDefined();
          expect(res.body.shape).toEqual('FULL_WIDTH');
          expect(res.body.type).toBeDefined();
          expect(res.body.type).toEqual('CHART');
          expect(res.body.visualization).toBeDefined();
          expect(res.body.appKey).toBeUndefined();
        }),
    );
  });
  it(`Edit a Dashboard Items /api/dashboardItems/:id (PUT)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .put(`/api/dashboardItems/${dashboarditemId}`)
        .send({
          shape: 'POLYGON',
          type: 'MAP',
        })
        .expect((res) => {
          expect(res.body.payload.shape).toBeDefined();
          expect(res.body.payload.shape).toEqual('POLYGON');
          expect(res.body.payload.type).toBeDefined();
          expect(res.body.payload.type).toEqual('MAP');
          expect(res.body.payload.visualization).toBeDefined();
          expect(res.body.payload.appKey).toBeUndefined();
        }),
    );
  });

  it(`Apply filters on Dashboard Items /api/dashboardItems?filter:shape:eq:POLYGON (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/dashboardItems?filter:shape:eq:POLYGON`)
        .expect((res) => {
          expect(res.body.dashboardItems[0].shape).toBeDefined();
          expect(res.body.dashboardItems[0].shape).toEqual('POLYGON');
          expect(res.body.dashboardItems[0].type).toBeDefined();
          expect(res.body.dashboardItems[0].type).toEqual('MAP');
          expect(res.body.dashboardItems[0].visualization).toBeDefined();
          expect(res.body.dashboardItems[0].appKey).toBeUndefined();
        }),
    );
  });

  it(`Apply filtering by fields on Dashboard Items /api/dashboardItems?fields=visualization (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/dashboardItems?fields=visualization`)
        .expect((res) => {
          expect(res.body.dashboardItems[0].shape).toBeUndefined();
          expect(res.body.dashboardItems[0].type).toBeUndefined();
          expect(res.body.dashboardItems[0].visualization).toBeDefined();
          expect(res.body.dashboardItems[0].visualization.name).toBe('History');
          expect(res.body.dashboardItems[0].appKey).toBeUndefined();
        }),
    );
  });
});

describe(`Testing Dashboards`, () => {
  it(`Add new Dashboard /api/dashboards (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer()).post(`/api/dashboards`),
    )
      .send({
        name: 'Employment Status',
        publicAccess: '--------',
        displayName: 'Employment Status',
        dashboardItems: [{ id: dashboarditemId }],
      })
      .expect((res) => {
        dashboardId = res.body.id;
        expect(res.body.name).toBeDefined();
        expect(res.body.name).toEqual('Employment Status');
        expect(res.body.publicAccess).toBeDefined();
        expect(res.body.publicAccess).toEqual('--------');
        expect(res.body.displayName).toBeDefined();
        expect(res.body.displayName).toEqual('Employment Status');
      });
  });

  it(`Get All Dashboards /api/dashboards/ (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/dashboards`)
        .expect((res) => {
          expect(res.body.dashboards[0].name).toBeDefined();
          expect(res.body.dashboards[0].name).toEqual('Employment Status');
          expect(res.body.dashboards[0].publicAccess).toBeDefined();
          expect(res.body.dashboards[0].publicAccess).toEqual('--------');
          expect(res.body.dashboards[0].displayName).toBeDefined();
          expect(res.body.dashboards[0].displayName).toEqual(
            'Employment Status',
          );
          expect(res.body.dashboards[0].dashboardItems).toBeDefined();
          expect(res.body.dashboards[0].dashboardaccess).toBeDefined();
        }),
    );
  });

  it(`Get One Dashboard /api/dashboards/:id (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/dashboards/${dashboardId}`)
        .expect((res) => {
          expect(res.body.name).toBeDefined();
          expect(res.body.name).toEqual('Employment Status');
          expect(res.body.publicAccess).toBeDefined();
          expect(res.body.publicAccess).toEqual('--------');
          expect(res.body.displayName).toBeDefined();
          expect(res.body.displayName).toEqual('Employment Status');
          expect(res.body.dashboardItems).toBeDefined();
          expect(res.body.dashboardItems[0].visualization).toBeDefined();
          expect(res.body.dashboardaccess).toBeDefined();
        }),
    );
  });

  it(`Apply filters on Dashboards /api/dashboards?filter=name:eq:Employment Status (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/dashboards?filter=name:eq:Employment Status`)
        .expect((res) => {
          expect(res.body.dashboards[0].name).toBeDefined();
          expect(res.body.dashboards[0].name).toEqual('Employment Status');
          expect(res.body.dashboards[0].publicAccess).toBeDefined();
          expect(res.body.dashboards[0].publicAccess).toEqual('--------');
          expect(res.body.dashboards[0].displayName).toBeDefined();
          expect(res.body.dashboards[0].displayName).toEqual(
            'Employment Status',
          );
          expect(res.body.dashboards[0].dashboardItems).toBeDefined();
          expect(res.body.dashboards[0].dashboardaccess).toBeDefined();
        }),
    );
  });

  it(`Apply fields on Dashboard /api/dashboards?fields=name (GET)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .get(`/api/dashboards?fields=name`)
        .expect((res) => {
          expect(res.body.dashboards[0].name).toBeDefined();
          expect(res.body.dashboards[0].name).toEqual('Employment Status');
          expect(res.body.dashboards[0].publicAccess).toBeUndefined();
          expect(res.body.dashboards[0].displayName).toBeUndefined();
          expect(res.body.dashboards[0].dashboardItems).toBeUndefined();
          expect(res.body.dashboards[0].dashboardaccess).toBeUndefined();
        }),
    );
  });

  it(`Update a Dashbboard /api/dashboards/:id (PUT)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .put(`/api/dashboards/${dashboardId}`)
        .send({
          name: 'New Changed Dashboard',
          displayName: 'New Dashboard',
        })
        .expect((res) => {
          expect(res.body.payload).toBeDefined();
          expect(res.body.payload.name).toEqual('New Changed Dashboard');
          expect(res.body.payload.displayName).toEqual('New Dashboard');
        }),
    );
  });

  it(`Share a Dashbboard /api/dashboards/:id/sharing (POST)`, () => {
    return addAuthentication(
      request(server.getHttpServer())
        .post(`/api/dashboards/${dashboardId}/sharing`)
        .send({
          user: 'New Changed Dashboard',
          acces: 'rw',
        })
        .expect((res) => {
          console.log(res.body);
        }),
    );
  }); 
});
