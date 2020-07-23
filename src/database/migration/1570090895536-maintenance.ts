import {MigrationInterface, QueryRunner} from "typeorm";

export class maintenance1570090895536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let FieldGroup = await queryRunner.getTable('hris_field');

    if (FieldGroup){
        await queryRunner.query('ALTER TABLE "hris_field" RENAME TO "field"');
        await queryRunner.query('ALTER TABLE "field" RENAME COLUMN "datatype_id" TO "dataTypeId"');
        await queryRunner.query('ALTER TABLE "field" RENAME COLUMN "inputtype_id" TO "fieldInputTypeId"');
        await queryRunner.query('ALTER TABLE "field" RENAME COLUMN "datecreated" TO "created"');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "name" character varying(256)');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "code" character varying(25)');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS uid char(13)');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "description" text');        
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "caption" text');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "iscalculated" boolean');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "compulsory" boolean');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "isunique" boolean');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "fieldrelation" boolean');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "calculatedexpression" text');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "skipinreport" boolean');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "hastarget" boolean');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "hasoptions" boolean');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "externalaccess" boolean');
        await queryRunner.query('ALTER TABLE "field" ADD COLUMN IF NOT EXISTS "showinlist" boolean');
       
        await queryRunner.query('ALTER TABLE "hris_fieldgroup" RENAME TO "fieldgroup"');
        await queryRunner.query('ALTER TABLE "fieldgroup" RENAME COLUMN "datecreated" TO "created"');
        await queryRunner.query('ALTER TABLE "fieldgroup" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone');
        await queryRunner.query('ALTER TABLE "fieldgroup" ADD COLUMN IF NOT EXISTS "name" character varying(256)');
        await queryRunner.query('ALTER TABLE "fieldgroup" ADD COLUMN IF NOT EXISTS "description" text'); 
        await queryRunner.query('ALTER TABLE "fieldgroup" ADD COLUMN IF NOT EXISTS uid char(13)');
        await queryRunner.query('ALTER TABLE "fieldgroup" ADD COLUMN IF NOT EXISTS "code" character varying(25)');
        await queryRunner.query('ALTER TABLE "fieldgroup" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying');
        await queryRunner.query('ALTER TABLE "fieldgroup" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)');
        await queryRunner.query('ALTER TABLE "fieldgroup" ADD COLUMN IF NOT EXISTS "externalaccess" boolean');       

    }
}
public async down(queryRunner: QueryRunner): Promise<any> {

}

}


