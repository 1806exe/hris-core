import { MigrationInterface, QueryRunner } from "typeorm";

export class Version3Changes implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        //await queryRunner.query('ALTER TABLE hris_user" RENAME TO user');
        this.getTables().forEach(async (table) => {
            let userTable = await queryRunner.getTable('hris_' + table.name);

            if (userTable) {
                let newTableName = table.name;
                if (table.renameTo){
                    newTableName = table.renameTo;
                }
                await queryRunner.query('ALTER TABLE "hris_"' + table.name + ' RENAME TO "' + newTableName + '"');

                await queryRunner.query('ALTER TABLE "' + newTableName + '" ADD COLUMN "createdbyid" INTEGER');
                await queryRunner.query('ALTER TABLE "' + newTableName + '" ADD CONSTRAINT "fk_' + newTableName + '_createdby" FOREIGN KEY("createdbyid") REFERENCES "user"');
                await queryRunner.query('ALTER TABLE "' + newTableName + '" ADD COLUMN "lastupdatedbyid" INTEGER');
                await queryRunner.query('ALTER TABLE "' + newTableName + '" ADD CONSTRAINT "fk_' + newTableName + '_lastupdatedby" FOREIGN KEY("lastupdatedbyid") REFERENCES "user"');

                await queryRunner.query('ALTER TABLE "' + newTableName + '" RENAME COLUMN id TO "' + newTableName + 'id"');
                await queryRunner.query('ALTER TABLE "' + newTableName + '" RENAME COLUMN "datecreated" TO "created"');

                if (table.isIdentifiable) {
                    await queryRunner.query('ALTER TABLE "' + newTableName + '" ADD COLUMN "code" INTEGER');
                }

            }
        })
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

    getTables() {
        return [];
    }
}
