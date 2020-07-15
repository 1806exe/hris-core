import {MigrationInterface, QueryRunner} from "typeorm";

export class integrations1570172257753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let Integration = await queryRunner.getTable('hris_intergration_dhis_dataelementfieldoptionrelation');

    if (Integration){
        await queryRunner.query('ALTER TABLE "hris_intergration_dhis_dataelementfieldoptionrelation" RENAME TO "intergrationdhisdataelementfieldoptionrelation"');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataelementfieldoptionrelation" RENAME COLUMN "dhis_data_connection_id" TO "dhisdataconnectionid"');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataelementfieldoptionrelation" RENAME COLUMN "column_fieldoption_group_id" TO "columnfieldoptiongroupid"');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataelementfieldoptionrelation" RENAME COLUMN "row_fieldoption_group_id" TO "rowfieldoptiongroupid"');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataelementfieldoptionrelation" ADD COLUMN IF NOT EXISTS "dataelementuid" text');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataelementfieldoptionrelation" ADD COLUMN IF NOT EXISTS "dataelementname" text');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataelementfieldoptionrelation" ADD COLUMN IF NOT EXISTS "categorycombouid" text');        
        await queryRunner.query('ALTER TABLE "intergrationdhisdataelementfieldoptionrelation" ADD COLUMN IF NOT EXISTS "categorycomboname" text');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataelementfieldoptionrelation" ADD COLUMN IF NOT EXISTS "uri" text');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataelementfieldoptionrelation" ADD COLUMN IF NOT EXISTS "userid" text');

        await queryRunner.query('ALTER TABLE "hris_intergration_dhis_fieldoptiongroupsetmember" RENAME TO "intergrationdhisfieldoptiongroupsetmember"');
        await queryRunner.query('ALTER TABLE "intergrationdhisfieldoptiongroupsetmember" RENAME COLUMN "dhis_data_connection_id" TO "dhisdataconnectionid"');
        await queryRunner.query('ALTER TABLE "intergrationdhisfieldoptiongroupsetmember" RENAME COLUMN "field_option_groupset_id" TO "fieldoptiongroupsetid"');

        await queryRunner.query('ALTER TABLE "hris_intergration_dhis_dataconnection" RENAME TO "intergrationdhisdataconnection"');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataconnection" RENAME COLUMN "parent_organisationunit_id" TO "parentorganisationunitid"');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataconnection" ADD COLUMN IF NOT EXISTS "name" character varying(256)');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataconnection" ADD COLUMN IF NOT EXISTS "password" text');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataconnection" RENAME COLUMN "host_url" TO "hosturl"');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataconnection" RENAME COLUMN "datecreated" TO "created"');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataconnection" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataconnection" RENAME COLUMN "dataset_name" TO "datasetname"');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataconnection" RENAME COLUMN "dataset_uid" TO "datasetuid"');
        await queryRunner.query('ALTER TABLE "intergrationdhisdataconnection" RENAME COLUMN "dataset_html" TO "datasethtml"');

        await queryRunner.query('ALTER TABLE "hris_intergration_tiis_employee_fieldrelation" RENAME TO "intergrationtiisemployeefieldrelation"');
        await queryRunner.query('ALTER TABLE "intergrationtiisemployeefieldrelation" RENAME COLUMN "tiis_data_connection_id" TO "tiisdataconnectionid"');
        await queryRunner.query('ALTER TABLE "intergrationtiisemployeefieldrelation" RENAME COLUMN "field_id" TO "fieldid"');
        await queryRunner.query('ALTER TABLE "intergrationtiisemployeefieldrelation" ADD COLUMN IF NOT EXISTS "columnname" text');

        await queryRunner.query('ALTER TABLE "hris_intergration_tiis_data_connection" RENAME TO "intergrationtiisdataconnection"');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" RENAME COLUMN "organisationunit_id" TO "organisationunitid"');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" RENAME COLUMN "host_url" TO "hosturl"');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "uid" character varying(256)');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "organisationunittablename" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "name" character varying(256)');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "recordstablename" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "organisationunitlongnamecolumnname" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "organisationunitcodecolumnname" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "organisationunitownershipcolumnname" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "hrisinstituiongroupname" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "recordsorganisationunitcolumnname" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "recordsinstancecolumnname" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "tiisparentorganisationunitcode" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "hristopmostorganisationunitshrotname" text');

        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "password" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "username" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "database" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "employeeformname" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "defaultnationality" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "defaulthrnationality" text');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" RENAME COLUMN "datecreated" TO "created"');
        await queryRunner.query('ALTER TABLE "intergrationtiisdataconnection" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone');

       

    }
}
public async down(queryRunner: QueryRunner): Promise<any> {

}
}



