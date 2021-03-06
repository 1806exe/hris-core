import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getBasicAuthanticationString } from '../src/core/helpers/basic-auth-token';
import { FormModule } from '../src/modules/form/form.module';
import { OrganisatinUnitModule } from '../src/modules/organisation-unit/organisation-unit.module';
import { RecordModule } from '../src/modules/record/record.module';
import { ReportModule } from '../src/modules/report/report.module';
import { UserRoleModule } from '../src/modules/system/user-role/user-role.module';
import { UserService } from '../src/modules/system/user/services/user.service';
import { UserModule } from '../src/modules/system/user/user.module';
import { TrainingModule } from '../src/modules/training/training.module';
import { VisualizationModule } from '../src/modules/visualization/visualization.module';
import { SessionModule } from 'nestjs-session';
jest.setTimeout(300000);

let database: any = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'hr_e2e_test',
  entities: ['./**/*.entity.ts'],
  synchronize: true,
};
export const addAuthentication = (req) => {
  return req.set(
    'Authorization',
    `Basic ${getBasicAuthanticationString('test', 'HRHIS2020')}`,
  );
};
const { Client } = require('pg');
const client = new Client({
  host: database.host,
  port: database.port,
  user: database.username,
  password: database.password,
});
export let server;
export const setUpServer = async () => {
  if (server) {
    return server;
  }
  await client.connect();
  try {
    await client.query(`DROP DATABASE ${database.database};`);
  } catch (e) {
    await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '${database.database}'
      AND pid <> pg_backend_pid();`);
    await client.query(`DROP DATABASE ${database.database};`);
  }
  await client.query(`CREATE DATABASE ${database.database};`);
  let imports: any[] = [
    TypeOrmModule.forRoot(database),
    SessionModule.forRoot({
      session: {
        secret: 'secret-key',
        name: 'sess',
        resave: true,
        saveUninitialized: true,
      },
    }),
    OrganisatinUnitModule,
    UserModule,
    ReportModule,
    UserRoleModule,
    FormModule,
    RecordModule,
    TrainingModule,
    VisualizationModule,
  ];
  const moduleFixture = await Test.createTestingModule({
    imports: imports,
  }).compile();
  let app: INestApplication = moduleFixture.createNestApplication();

  await app.init();
  let userService: UserService = app.get<UserService>(UserService);
  let user: any = {
    password: 'HRHIS2020',
    username: 'test',
    firstName: 'Anonymous',
    middleName: null,
    surname: 'Anonymous',
    email: 'anonymous@example.com',
    phoneNumber: null,
    jobTitle: null,
    expiryDate: null,
    deletedDate: null,
    enabled: true,
    userRoles: [],
    userGroups: [],
    messages: [],
    organisationUnits: [],
    userSettings: null,
  };
  try {
    await userService.create(user);
  } catch (e) {}
  global['app'] = app;
  server = app;
  return app;
};
export const tearDownServer = async () => {
  if (server) {
    await server.close();
    await client.end();
  }
};
