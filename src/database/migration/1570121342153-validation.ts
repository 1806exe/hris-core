import {MigrationInterface, QueryRunner} from "typeorm";

export class validation1570121342153 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let Validation = await queryRunner.getTable('hris_validation');

    if (Validation){
        await queryRunner.query('ALTER TABLE "hris_validation" RENAME TO "validation"');
        await queryRunner.query('ALTER TABLE "validation" RENAME COLUMN "id" TO "validationid"');
        await queryRunner.query('ALTER TABLE "validation" RENAME COLUMN "datecreated" TO "createdAt"');
        await queryRunner.query('ALTER TABLE "validation" RENAME COLUMN "lastupdated" TO "updatedAt"');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "name" text');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "uid" text');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "description" text');        
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "operator" text');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "leftexpression" text');
        await queryRunner.query('ALTER TABLE "validation" ADD COLUMN IF NOT EXISTS "rightexpression" text');
    }
}
public async down(queryRunner: QueryRunner): Promise<any> {

}

}