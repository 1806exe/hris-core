import {MigrationInterface, QueryRunner} from "typeorm";

export class friendlyreport1570133196446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let Friendlyreport = await queryRunner.getTable('hris_friendlyreport');

    if (Friendlyreport){
        await queryRunner.query('ALTER TABLE "hris_friendlyreport" RENAME TO "friendlyreport"');
        await queryRunner.query('ALTER TABLE "friendlyreport" RENAME COLUMN "id" TO "friendlyreportid"');
        await queryRunner.query('ALTER TABLE "friendlyreport" RENAME COLUMN "series_id" TO "seriesid"');
        await queryRunner.query('ALTER TABLE "friendlyreport" RENAME COLUMN "datecreated" TO "createdAt"');
        await queryRunner.query('ALTER TABLE "friendlyreport" RENAME COLUMN "lastupdated" TO "updatedAt"');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "name" text');
        await queryRunner.query('ALTER TABLE "friendlyreport" ADD COLUMN IF NOT EXISTS "uid" text');
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

    }
}
public async down(queryRunner: QueryRunner): Promise<any> {

}
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
