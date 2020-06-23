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
                created, lastupdated, id, dimensionitem, dimensionitemtype, visualizationdimensionid)
                VALUES ('2019-07-26', '2019-07-26', 1, 'uLhsWqITzfk6p', 'INDICATOR', 1)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                created, lastupdated, id, uid, dimension, layout, visualizationid)
                VALUES ('2019-07-26', '2019-07-26', 2, 'I89T5MJIt28', 'ou', 'filters', 1)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                    created, lastupdated, id, dimensionitem, dimensionitemtype, visualizationdimensionid)
                    VALUES ('2019-07-26', '2019-07-26', 2, 'USER_ORGUNIT', 'ORG_UNIT', 2)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                    created, lastupdated, id, uid, dimension, layout, visualizationid)
                    VALUES ('2019-07-26', '2019-07-26', 3, 'I89T5MJIt29', 'pe', 'rows', 1)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                        created, lastupdated, id, dimensionitem, dimensionitemtype, visualizationdimensionid)
                        VALUES ('2019-07-26', '2019-07-26', 3, 'LAST_10_YEARS', 'PERIOD', 3)`);

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
                            created, lastupdated, id, dimensionitem, dimensionitemtype, visualizationdimensionid)
                            VALUES ('2019-07-26', '2019-07-26', 4, 'NMLDD43RiBt5g', 'INDICATOR', 4)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                            created, lastupdated, id, uid, dimension, layout, visualizationid)
                            VALUES ('2019-07-26', '2019-07-26', 5, 'I89T5MJIt38', 'ou', 'filters', 2)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                                created, lastupdated, id, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                VALUES ('2019-07-26', '2019-07-26', 5, 'USER_ORGUNIT', 'ORG_UNIT', 5)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                created, lastupdated, id, uid, dimension, layout, visualizationid)
                                VALUES ('2019-07-26', '2019-07-26', 6, 'I89T5MJIt39', 'pe', 'rows', 2)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                                    created, lastupdated, id, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                    VALUES ('2019-07-26', '2019-07-26', 6, 'LAST_10_YEARS', 'PERIOD', 6)`);

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
                                created, lastupdated, id, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                VALUES ('2019-07-26', '2019-07-26', 7, '5289e934bde20', 'FIELD', 7)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                created, lastupdated, id, uid, dimension, layout, visualizationid)
                                VALUES ('2019-07-26', '2019-07-26', 8, 'I89T5MJIt48', 'ou', 'filters', 3)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                                    created, lastupdated, id, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                    VALUES ('2019-07-26', '2019-07-26', 8, 'USER_ORGUNIT', 'ORG_UNIT', 8)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                    created, lastupdated, id, uid, dimension, layout, visualizationid)
                                    VALUES ('2019-07-26', '2019-07-26', 9, 'I89T5MJIt49', 'pe', 'rows', 3)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimensionitem(
                                        created, lastupdated, id, dimensionitem, dimensionitemtype, visualizationdimensionid)
                                        VALUES ('2019-07-26', '2019-07-26', 9, 'LAST_10_YEARS', 'PERIOD', 9)`);

    await queryRunner.query(`INSERT INTO public.dashboarditem(
                        created, lastupdated, id, uid, publicaccess, externalaccess, shape, type, dashboardid, visualizationid)
                        VALUES ('2019-07-26', '2019-07-26', 3, 'bBitVEBVOu2', '--------', false, 'FULL_WIDTH', 'CHART', 1, 3)`);

    await queryRunner.query(`INSERT INTO public.visualization(
                            created, lastupdated, id, uid, name, publicaccess, externalaccess, type, hidelegend, title,regressiontype, userid)
                            VALUES ('2019-07-26', '2019-07-26', 4, 'CCIJuYfJqAG', 'Age Distribution', '--------', false, 'COLUMN', false, 'Age Distribution','NONE', 937)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                created, lastupdated, id, uid, dimension, layout, visualizationid)
                                VALUES ('2019-07-26', '2019-07-26', 10, 'I89T5MJIt57', 'dx', 'columns', 4)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                    created, lastupdated, id, uid, dimension, layout, visualizationid)
                                    VALUES ('2019-07-26', '2019-07-26', 11, 'I89T5MJIt58', 'ou', 'filters', 4)`);

    await queryRunner.query(`INSERT INTO public.visualizationdimension(
                                        created, lastupdated, id, uid, dimension, layout, visualizationid)
                                        VALUES ('2019-07-26', '2019-07-26', 12, 'I89T5MJIt59', 'pe', 'rows', 4)`);

    await queryRunner.query(`INSERT INTO public.dashboarditem(
                            created, lastupdated, id, uid, publicaccess, externalaccess, shape, type, dashboardid, visualizationid)
                            VALUES ('2019-07-26', '2019-07-26', 4, 'otxQlKW9WI1', '--------', false, 'FULL_WIDTH', 'CHART', 1, 4)`);

    await queryRunner.query(`INSERT INTO public.dashboard(
                created, lastupdated, id, uid, name, publicaccess, externalaccess, displayname, userid)
                VALUES ('2019-07-26', '2019-07-26', '2', 'tFPbgxRf1b1', 'History','--------', false, 'History', 937)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
