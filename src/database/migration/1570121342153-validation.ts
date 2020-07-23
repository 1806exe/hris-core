import {MigrationInterface, QueryRunner} from "typeorm";

export class validation1570121342153 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let Validation = await queryRunner.getTable('hris_validation');

    if (Validation){
        await queryRunner.query('ALTER TABLE "hris_validation" RENAME TO "validation"');
        await queryRunner.query('ALTER TABLE "validation" RENAME COLUMN "datecreated" TO "created"');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "name" character varying(256)');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS uid char(13)');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "description" text');        
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "operator" text');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "leftexpression" text');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "rightexpression" text');
    }
}
public async down(queryRunner: QueryRunner): Promise<any> {

}

}