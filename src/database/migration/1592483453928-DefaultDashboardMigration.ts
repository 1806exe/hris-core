import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultDashboardMigration1592483453928
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO public.dashboard(created, lastupdated, id, uid, name, publicaccess, externalaccess, displayname, userid)
            VALUES ('2019-07-26', '2019-07-26', '1', 'tFPbgxRf1bc', 'Employment Status','--------', false, 'Employment Status', 937)`);

    await queryRunner.query(`INSERT INTO public.visualization(
        created, lastupdated, id, uid, name, publicaccess, externalaccess, type, hidelegend, title,regressiontype, userid)
        VALUES ('2019-07-26', '2019-07-26', 1, 'MTWXrZKjPRa', 'Employments', '--------', false, 'COLUMN', false, 'Employments','NONE', 937)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
            created, lastupdated, id, uid, dimension, layout, visualizationid)
            VALUES ('2019-07-26', '2019-07-26', 1, 'I89T5MJIt27', 'dx', 'columns', 1)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
                VALUES ('2019-07-26', '2019-07-26', 1,'LgKpMKdtsyVt5', 'uLhsWqITzfk6p', 'INDICATOR', 1)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                created, lastupdated, id, uid, dimension, layout, visualizationid)
                VALUES ('2019-07-26', '2019-07-26', 2, 'I89T5MJIt28', 'ou', 'filters', 1)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                    created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
                    VALUES ('2019-07-26', '2019-07-26', 2,'EpqmhboKY7Pg4', 'USER_ORGUNIT', 'ORG_UNIT', 2)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                    created, lastupdated, id, uid, dimension, layout, visualizationid)
                    VALUES ('2019-07-26', '2019-07-26', 3, 'I89T5MJIt29', 'pe', 'rows', 1)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                        created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 3,'naubWh5iqAAe3', 'LAST_10_YEARS', 'PERIOD', 3)`);

    await queryRunner.query(`INSERT INTO public.dashboarditem(
                created, lastupdated, id, uid, publicaccess, externalaccess, shape, type, dashboardid, visualizationid)
                VALUES ('2019-07-26', '2019-07-26', 1, 'zFnZNKX7cLJ', '--------', false, 'FULL_WIDTH', 'CHART', 1, 1)`);

    await queryRunner.query(`INSERT INTO public.visualization(
                    created, lastupdated, id, uid, name, publicaccess, externalaccess, type, hidelegend, title,regressiontype, userid)
                    VALUES ('2019-07-26', '2019-07-26', 2, 'cbnWOXfp9vW', 'Retirement', '--------', false, 'LINE', false, 'Retirement', 'NONE', 937)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                        created, lastupdated, id, uid, dimension, layout, visualizationid)
                        VALUES ('2019-07-26', '2019-07-26', 4, 'I89T5MJIt37', 'dx', 'columns', 2)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                            created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
                            VALUES ('2019-07-26', '2019-07-26', 4,'kXdJED85AbL9r', 'NMLDD43RiBt5g', 'INDICATOR', 4)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                            created, lastupdated, id, uid, dimension, layout, visualizationid)
                            VALUES ('2019-07-26', '2019-07-26', 5, 'I89T5MJIt38', 'ou', 'filters', 2)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                                created, lastupdated, id, uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                VALUES ('2019-07-26', '2019-07-26', 5, 'UQ5mNMKhTlsh3', 'USER_ORGUNIT', 'ORG_UNIT', 5)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                created, lastupdated, id, uid, dimension, layout, visualizationid)
                                VALUES ('2019-07-26', '2019-07-26', 6, 'I89T5MJIt39', 'pe', 'rows', 2)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                                    created, lastupdated, id, uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                    VALUES ('2019-07-26', '2019-07-26', 6, 'tfVDMN5g9BIw2', 'LAST_10_YEARS', 'PERIOD', 6)`);

    await queryRunner.query(`INSERT INTO public.dashboarditem(
                    created, lastupdated, id, uid, publicaccess, externalaccess, shape, type, dashboardid, visualizationid)
                    VALUES ('2019-07-26', '2019-07-26', 2, 'wZK5CdXVJKt', '--------', false, 'FULL_WIDTH', 'CHART', 1, 2)`);

    await queryRunner.query(`INSERT INTO public.visualization(
                        created, lastupdated, id, uid, name, publicaccess, externalaccess, type, hidelegend, title,regressiontype, userid)
                        VALUES ('2019-07-26', '2019-07-26', 3, 'x1cWTFjrxVd', 'Gender Ratio', '--------', false, 'PIE', false, 'Gender Ratio','NONE', 937)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                            created, lastupdated, id, uid, dimension, layout, visualizationid)
                            VALUES ('2019-07-26', '2019-07-26', 7, 'I89T5MJIt47', 'dx', 'columns', 3)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                                created, lastupdated, id, uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                VALUES ('2019-07-26', '2019-07-26', 7, 'dIWaZk2F6yJ4f', '5289e934bde20', 'FIELD', 7)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                created, lastupdated, id, uid, dimension, layout, visualizationid)
                                VALUES ('2019-07-26', '2019-07-26', 8, 'I89T5MJIt48', 'ou', 'filters', 3)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                                    created, lastupdated, id, uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                    VALUES ('2019-07-26', '2019-07-26', 8, 'iZjq9hjMd4v8g', 'USER_ORGUNIT', 'ORG_UNIT', 8)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                    created, lastupdated, id, uid, dimension, layout, visualizationid)
                                    VALUES ('2019-07-26', '2019-07-26', 9, 'I89T5MJIt49', 'pe', 'rows', 3)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                                        created, lastupdated, id, uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                        VALUES ('2019-07-26', '2019-07-26', 9, 'q03C3vbhoFc4o', 'LAST_10_YEARS', 'PERIOD', 9)`);

    await queryRunner.query(`INSERT INTO public.dashboarditem(
                        created, lastupdated, id, uid, publicaccess, externalaccess, shape, type, dashboardid, visualizationid)
                        VALUES ('2019-07-26', '2019-07-26', 3, 'bBitVEBVOu2', '--------', false, 'FULL_WIDTH', 'CHART', 1, 3)`);

    await queryRunner.query(`INSERT INTO public.visualization(
                            created, lastupdated, id, uid, name, publicaccess, externalaccess, type, hidelegend, title,regressiontype, userid)
                            VALUES ('2019-07-26', '2019-07-26', 4, 'CCIJuYfJqAG', 'Age Distribution', '--------', false, 'COLUMN', false, 'Age Distribution','NONE', 937)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                created, lastupdated, id, uid, dimension, layout, visualizationid)
                                VALUES ('2019-07-26', '2019-07-26', 10, 'I89T5MJIt57', 'dx', 'columns', 4)`);

    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                         created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                         VALUES ('2019-07-26', '2019-07-26', 10,'PgKpMKe9syVt5', 'yE9m8ltllxfq6', 'INDICATOR', 10)`);

    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                                 created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                                 VALUES ('2019-07-26', '2019-07-26', 11,'LgKpMKet1yVz5', 'yE9m8ltllxfq7', 'INDICATOR', 10)`);

    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                                         created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                                         VALUES ('2019-07-26', '2019-07-26', 12,'LVlFDGieo8emw', 'yE9m8ltllxfq8', 'INDICATOR', 10)`);

    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                                                 created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                                                 VALUES ('2019-07-26', '2019-07-26', 13,'fGawAQkYTLzMQ', 'yE9m8ltllxfq9', 'INDICATOR', 10)`);

    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                                                         created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                                                         VALUES ('2019-07-26', '2019-07-26', 14,'iA4WBSRYW45KP', 'yE9m8ltllxf10', 'INDICATOR', 10)`);

    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                                                                 created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                                                                 VALUES ('2019-07-26', '2019-07-26', 15,'YybSWJQux7lHY', 'yE9m8ltllxf11', 'INDICATOR', 10)`);
    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                                                                         created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                                                                         VALUES ('2019-07-26', '2019-07-26', 16,'ZURM4cj6CskDS', 'yE9m8ltllxf12', 'INDICATOR', 10)`);
    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                                                                                 created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                                                                                 VALUES ('2019-07-26', '2019-07-26', 17,'sawuBJuhaACVT', 'yE9m8ltllxf13', 'INDICATOR', 10)`);
    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                                                                                         created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                                                                                         VALUES ('2019-07-26', '2019-07-26', 18,'MlalJxoKXxwXM', 'yE9m8ltllxfq4', 'INDICATOR', 10)`);
    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                                                                                                 created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                                                                                                 VALUES ('2019-07-26', '2019-07-26', 19,'F92ddcEUv9qFA', 'yE9m8ltllxfq5', 'INDICATOR', 10)`);
    //     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                                                                                                         created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                                                                                                         VALUES ('2019-07-26', '2019-07-26', 20,'wWPTrs4zWUcmp', 'uLhsWqITzfk6p', 'INDICATOR', 10)`);

    //     await queryRunner.query(`INSERT INTO public.visualizationdimension(
    //                                     created, lastupdated, id, uid, dimension, layout, visualizationid)
    //                                     VALUES ('2019-07-26', '2019-07-26', 11, 'I89T5MJIt58', 'ou', 'filters', 4)`);

    //                                     await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
    //                                         created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
    //                                         VALUES ('2019-07-26', '2019-07-26', 21,'wWPsrs4zWUcmp', 'USER_ORGUNIT', 'INDICATOR', 11)`);
    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 10,'PgKpMKe9syVt5', 'yE9m8ltllxfq6', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 11,'LgKpMKet1yVz5', 'yE9m8ltllxfq7', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 12,'LVlFDGieo8emw', 'yE9m8ltllxfq8', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 13,'fGawAQkYTLzMQ', 'yE9m8ltllxfq9', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 14,'iA4WBSRYW45KP', 'yE9m8ltllxf10', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 15,'YybSWJQux7lHY', 'yE9m8ltllxf11', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 16,'ZURM4cj6CskDS', 'yE9m8ltllxf12', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 17,'ZURM4cj6CskDS', 'yE9m8ltllxf12', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 18,'sawuBJuhaACVT', 'yE9m8ltllxf13', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 19,'MlalJxoKXxwXM', 'yE9m8ltllxfq4', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 20,'F92ddcEUv9qFA', 'yE9m8ltllxfq5', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 21,'wWPTrs4zWUcmp', 'uLhsWqITzfk6p', 'INDICATOR', 10);
                        
                        
                        INSERT INTO public.visualizationdimensionitem(created, lastupdated, id, UID, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 22,'wWPsrs4zWUcmp', 'USER_ORGUNIT', 'INDICATOR', 11);
                        
                        
                        INSERT INTO public.visualizationdimension(created, lastupdated, id, UID, dimension, layout, visualizationid)
                        VALUES ('2019-07-26', '2019-07-26', 23, 'I8P9T5MJIt59', 'pe', 'rows', 4);`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                        created, lastupdated, id, uid, dimension, layout, visualizationid)
                                        VALUES ('2019-07-26', '2019-07-26', 12, 'I89T5MJIt59', 'pe', 'rows', 4)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                                        created, lastupdated, id,uid, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                        VALUES ('2019-07-26', '2019-07-26', 22,'wdPsrs4zWUcmp', 'LAST_YEAR', 'INDICATOR', 12)`);

    await queryRunner.query(`INSERT INTO public.dashboarditem(
                            created, lastupdated, id, uid, publicaccess, externalaccess, shape, type, dashboardid, visualizationid)
                            VALUES ('2019-07-26', '2019-07-26', 4, 'otxQlKW9WI1', '--------', false, 'FULL_WIDTH', 'CHART', 1, 4)`);

    await queryRunner.query(`INSERT INTO public.dashboard(
                created, lastupdated, id, uid, name, publicaccess, externalaccess, displayname, userid)
                VALUES ('2019-07-26', '2019-07-26', '2', 'tFPbgxRf1b1', 'History','--------', false, 'History', 937)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
