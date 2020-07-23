import {MigrationInterface, QueryRunner} from "typeorm";

export class friendlyreport1570133196446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let Friendlyreport = await queryRunner.getTable('hris_friendlyreport');

    if (Friendlyreport){
        await queryRunner.query('ALTER TABLE "hris_friendlyreport" RENAME TO "friendlyreport"');
        await queryRunner.query('ALTER TABLE "friendlyreport" RENAME COLUMN "series_id" TO "seriesid"');
        await queryRunner.query('ALTER TABLE "friendlyreport" RENAME COLUMN "datecreated" TO "created"');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "name" character varying(256)');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS uid char(13)');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "description" text');        
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "operator" text');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "sort" integer');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "ignoreskipinreport" boolean');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "showdeficitsurplus" boolean');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "usetargets" boolean');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "type" text');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "sql" text');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "javascript" text');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "stylesheet" text');

        await queryRunner.query('ALTER TABLE "hris_friendlyreportcategory" RENAME TO "friendlyreportcategory"');
        await queryRunner.query('ALTER TABLE "friendlyreportcategory" RENAME COLUMN "friendlyreport_id" TO "friendlyreportid"');
        await queryRunner.query('ALTER TABLE "friendlyreportcategory" RENAME COLUMN "fieldoptiongroup_id" TO "fieldoptiongroupid"');
        await queryRunner.query('ALTER TABLE "friendlyreportcategory" ADD COLUMN IF NOT EXISTS "sort" integer');

        await queryRunner.query('ALTER TABLE "hris_friendlyreport_arithmeticfilter" RENAME TO "friendlyreportarithmeticfilter"');
        await queryRunner.query('ALTER TABLE "friendlyreportarithmeticfilter" RENAME COLUMN "friendlyreport_id" TO "friendlyreportid"');
        await queryRunner.query('ALTER TABLE "friendlyreportarithmeticfilter" RENAME COLUMN "arithmeticfilter_id" TO "arithmeticfilterid"');

        await queryRunner.query('ALTER TABLE "hris_friendlyreport_relationalfilter" RENAME TO "friendlyreportrelationalfilter"');
        await queryRunner.query('ALTER TABLE "friendlyreportrelationalfilter" RENAME COLUMN "friendlyreport_id" TO "friendlyreportid"');
        await queryRunner.query('ALTER TABLE "friendlyreportrelationalfilter" RENAME COLUMN "relationalfilter_id" TO "relationalfilterid"');


    }
}
public async down(queryRunner: QueryRunner): Promise<any> {

}
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 