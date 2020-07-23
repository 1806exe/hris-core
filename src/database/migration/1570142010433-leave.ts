import {MigrationInterface, QueryRunner} from "typeorm";

export class leave1570142010433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let Leave = await queryRunner.getTable('hris_leave');

    if (Leave){
        await queryRunner.query('ALTER TABLE "hris_leave" RENAME TO "leave"');
        await queryRunner.query('ALTER TABLE "leave" RENAME COLUMN "record_id" TO "recordid"');
        await queryRunner.query('ALTER TABLE "leave" RENAME COLUMN "leave_type_id" TO "leavetypeid"');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS uid char(13)');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS "username" text');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS "amount" integer');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS "startdate" timestamp without time zone');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS "enddate" timestamp without time zone');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS "duration" text');
        await queryRunner.query('ALTER TABLE "leave" RENAME COLUMN "leave_benefit_applicable" TO "leavebenefitapplicable"');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS "phone" text');
        await queryRunner.query('ALTER TABLE "leave" RENAME COLUMN "leave_benefit_status" TO "leavebenefitstatus"');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS "address" text');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS "email" text');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS "reason" text');
        await queryRunner.query('ALTER TABLE "leave" RENAME COLUMN "leave_destination" TO "leavedestination"');
        await queryRunner.query('ALTER TABLE "leave" RENAME COLUMN "datecreated" TO "created"');
        await queryRunner.query('ALTER TABLE "leave" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone');

        await queryRunner.query('ALTER TABLE "hris_leave_relative" RENAME TO "leaverelative"');
        await queryRunner.query('ALTER TABLE "leaverelative" RENAME COLUMN "leave_id" TO "leaveid"');
        await queryRunner.query('ALTER TABLE "leaverelative" RENAME COLUMN "date_of_birth" TO "dateofbirth"');
        await queryRunner.query('ALTER TABLE "leaverelative" ADD COLUMN IF NOT EXISTS uid char(13)');
        await queryRunner.query('ALTER TABLE "leaverelative" ADD COLUMN IF NOT EXISTS "name" character varying(256)');
        await queryRunner.query('ALTER TABLE "leaverelative" ADD COLUMN IF NOT EXISTS "age" integer');

        await queryRunner.query('ALTER TABLE "hris_leave_type" RENAME TO "leavetype"');
        await queryRunner.query('ALTER TABLE "leavetype" RENAME COLUMN "limit_applicable" TO "limitapplicable"');
        await queryRunner.query('ALTER TABLE "leavetype" RENAME COLUMN "payment_applicable" TO "paymentapplicable"');
        await queryRunner.query('ALTER TABLE "leavetype" RENAME COLUMN "field_id" TO "fieldid"');
        await queryRunner.query('ALTER TABLE "leavetype" ADD COLUMN IF NOT EXISTS uid char(13)');
        await queryRunner.query('ALTER TABLE "leavetype" ADD COLUMN IF NOT EXISTS "name" character varying(256)');
        await queryRunner.query('ALTER TABLE "leavetype" RENAME COLUMN "maximum_days" TO "maximumdays"');
        await queryRunner.query('ALTER TABLE "leavetype" ADD COLUMN IF NOT EXISTS "description" text');
        await queryRunner.query('ALTER TABLE "leavetype" RENAME COLUMN "datecreated" TO "created"');
        await queryRunner.query('ALTER TABLE "leavetype" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone');

    }
}
public async down(queryRunner: QueryRunner): Promise<any> {   

}

}

