import {MigrationInterface, QueryRunner} from "typeorm";

export class relational1570143532358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let relationalfilter = await queryRunner.getTable('hris_relationalfilter');

    if (relationalfilter){
        await queryRunner.query('ALTER TABLE "hris_relationalfilter" RENAME TO "relationalfilter"');
        await queryRunner.query('ALTER TABLE "relationalfilter" RENAME COLUMN "field_id" TO "fieldid"');
        await queryRunner.query('ALTER TABLE "relationalfilter" RENAME COLUMN "datecreated" TO "created"');
        await queryRunner.query('ALTER TABLE "relationalfilter" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone');
        await queryRunner.query('ALTER TABLE "relationalfilter" ADD COLUMN IF NOT EXISTS "name" character varying(256)');
        await queryRunner.query('ALTER TABLE "relationalfilter" ADD COLUMN IF NOT EXISTS uid char(13)');
        await queryRunner.query('ALTER TABLE "relationalfilter" ADD COLUMN IF NOT EXISTS "excludefieldoptions" text');   
        
        await queryRunner.query('ALTER TABLE "hris_relationalfilter_member" RENAME TO "relationalfiltermember"');
        await queryRunner.query('ALTER TABLE "relationalfiltermember" RENAME COLUMN "relationalfilter_id" TO "relationalfilterid"');
        await queryRunner.query('ALTER TABLE "relationalfiltermember" RENAME COLUMN "fieldoption_id" TO "fieldoptionid"');
        
        //change recordid to id
        await queryRunner.query('ALTER TABLE "record" RENAME COLUMN "recordid" TO "id"');

    }
}
public async down(queryRunner: QueryRunner): Promise<any> {

}

}
