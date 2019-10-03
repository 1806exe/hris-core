import {MigrationInterface, QueryRunner} from "typeorm";

export class form1570024564943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let form = await queryRunner.getTable('hris_form');

    if (form){
        await queryRunner.query('ALTER TABLE "hris_form" RENAME TO "form"');
        await queryRunner.query('ALTER TABLE "form" RENAME COLUMN "id" TO "formid"');
        await queryRunner.query('ALTER TABLE "form" RENAME COLUMN "uid" TO "formuid"');
        await queryRunner.query('ALTER TABLE "form" RENAME COLUMN "datecreated" TO "createdAt"');
        await queryRunner.query('ALTER TABLE "form" RENAME COLUMN "lastupdated" TO "updatedAt"');
        await queryRunner.query('ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "title" text');
        await queryRunner.query('ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "name" text');
        await queryRunner.query('ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "hypertext" text'); 
       
        await queryRunner.query('ALTER TABLE "hris_formsection_fieldmembers" RENAME TO "formsectionfieldmembers"');
        await queryRunner.query('ALTER TABLE "formsectionfieldmembers" RENAME COLUMN "formsection_id" TO "formsectionid"');
        await queryRunner.query('ALTER TABLE "formsectionfieldmembers" RENAME COLUMN "field_id" TO "fieldid"');
        await queryRunner.query('ALTER TABLE "formsectionfieldmembers" ADD COLUMN IF NOT EXISTS "sort" integer');

        await queryRunner.query('ALTER TABLE "hris_form_uniquerecordfields" RENAME TO "formuniquerecordfields"');
        await queryRunner.query('ALTER TABLE "formuniquerecordfields" RENAME COLUMN "form_id" TO "formid"');
        await queryRunner.query('ALTER TABLE "formuniquerecordfields" RENAME COLUMN "field_id" TO "fieldid"');

        await queryRunner.query('ALTER TABLE "hris_form_visiblefields" RENAME TO "formvisiblefield"');
        await queryRunner.query('ALTER TABLE "formvisiblefield" RENAME COLUMN "form_id" TO "formid"');
        await queryRunner.query('ALTER TABLE "formvisiblefield" RENAME COLUMN "field_id" TO "fieldid"');
        await queryRunner.query('ALTER TABLE "formvisiblefield" ADD COLUMN IF NOT EXISTS "sort" integer');

        await queryRunner.query('ALTER TABLE "hris_formsection" RENAME TO "formsection"');
        await queryRunner.query('ALTER TABLE "formsection" RENAME COLUMN "id" TO "formsectionid"');
        await queryRunner.query('ALTER TABLE "formsection" RENAME COLUMN "form_id" TO "formid"');
        await queryRunner.query('ALTER TABLE "formsection" RENAME COLUMN "uid" TO "formsectionuid"');
        await queryRunner.query('ALTER TABLE "formsection" RENAME COLUMN "datecreated" TO "createdAt"');
        await queryRunner.query('ALTER TABLE "formsection" RENAME COLUMN "lastupdated" TO "updatedAt"');
        await queryRunner.query('ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "sort" integer');
        await queryRunner.query('ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "name" text');

        await queryRunner.query('ALTER TABLE "hris_field_relation" RENAME TO "fieldrelation"');
        await queryRunner.query('ALTER TABLE "fieldrelation" RENAME COLUMN "parent_field" TO "parentfield"');
        await queryRunner.query('ALTER TABLE "fieldrelation" RENAME COLUMN "child_field" TO "childfield"');
        await queryRunner.query('ALTER TABLE "fieldrelation" ADD COLUMN IF NOT EXISTS "sort" integer');

        await queryRunner.query('ALTER TABLE "hris_form_fieldmembers" RENAME TO "formfieldmembers"');
        await queryRunner.query('ALTER TABLE "formfieldmembers" RENAME COLUMN "form_id" TO "formid"');
        await queryRunner.query('ALTER TABLE "formfieldmembers" RENAME COLUMN "field_id" TO "fieldid"');
        await queryRunner.query('ALTER TABLE "formfieldmembers" ADD COLUMN IF NOT EXISTS "sort" integer');

        await queryRunner.query('ALTER TABLE "hris_fieldoption" RENAME TO "fieldoption"');
        await queryRunner.query('ALTER TABLE "fieldoption" RENAME COLUMN "id" TO "formid"');
        await queryRunner.query('ALTER TABLE "fieldoption" RENAME COLUMN "field_id" TO "fieldid"');
        await queryRunner.query('ALTER TABLE "fieldoption" RENAME COLUMN "uid" TO "fieldoptionuid"');
        await queryRunner.query('ALTER TABLE "fieldoption" RENAME COLUMN "datecreated" TO "createdAt"');
        await queryRunner.query('ALTER TABLE "fieldoption" RENAME COLUMN "lastupdated" TO "updatedAt"');
        await queryRunner.query('ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "value" text');
        await queryRunner.query('ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "description" text');
        await queryRunner.query('ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "sort" integer');
        await queryRunner.query('ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "hastraining" boolean');
        await queryRunner.query('ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "skipinreport" boolean');

        await queryRunner.query('ALTER TABLE "hris_fieldoptionmerge" RENAME TO "fieldoptionmerge"');
        await queryRunner.query('ALTER TABLE "fieldoptionmerge" RENAME COLUMN "id" TO "fieldoptionmergeid"');
        await queryRunner.query('ALTER TABLE "fieldoptionmerge" RENAME COLUMN "uid" TO "fieldoptionmergeuid"');
        await queryRunner.query('ALTER TABLE "fieldoptionmerge" RENAME COLUMN "mergedfieldoption_id" TO "mergedfieldoptionid"');
        await queryRunner.query('ALTER TABLE "fieldoptionmerge" RENAME COLUMN "datecreated" TO "createdAt"');
        await queryRunner.query('ALTER TABLE "fieldoptionmerge" RENAME COLUMN "lastupdated" TO "updatedAt"');
        await queryRunner.query('ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "removedfieldoptionvalue" text');
        await queryRunner.query('ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "removedfieldoptionuid" text');

        await queryRunner.query('ALTER TABLE "hris_fieldoptiongroupset" RENAME TO "fieldoptiongroupset"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroupset" RENAME COLUMN "id" TO "fieldoptiongroupsetid"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroupset" RENAME COLUMN "uid" TO "fieldoptiongroupsetuid"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroupset" RENAME COLUMN "datecreated" TO "createdAt"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroupset" RENAME COLUMN "lastupdated" TO "updatedAt"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroupset" ADD COLUMN IF NOT EXISTS "description" text');
        await queryRunner.query('ALTER TABLE "fieldoptiongroupset" ADD COLUMN IF NOT EXISTS "name" text');

        await queryRunner.query('ALTER TABLE "hris_fieldoptiongroup" RENAME TO "fieldoptiongroup"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroup" RENAME COLUMN "id" TO "fieldoptiongroupid"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroup" RENAME COLUMN "uid" TO "fieldoptiongroupuid"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroup" RENAME COLUMN "field_id" TO "fieldid"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroup" RENAME COLUMN "datecreated" TO "createdAt"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroup" RENAME COLUMN "lastupdated" TO "updatedAt"');
        await queryRunner.query('ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "description" text');
        await queryRunner.query('ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "name" text');

        await queryRunner.query('ALTER TABLE "hris_fieldoption_children" RENAME TO "fieldoptionchildren"');
        await queryRunner.query('ALTER TABLE "fieldoptionchildren" RENAME COLUMN "parent_fieldoption" TO "parentfieldoption"');
        await queryRunner.query('ALTER TABLE "fieldoptionchildren" RENAME COLUMN "child_fieldoption" TO "childfieldoption"');
        
        await queryRunner.query('ALTER TABLE "hris_field_inputtype" RENAME TO "fieldinputtype"');
        await queryRunner.query('ALTER TABLE "fieldinputtype" RENAME COLUMN "id" TO "fieldinputtypeid"');
        await queryRunner.query('ALTER TABLE "fieldinputtype" RENAME COLUMN "uid" TO "fieldinputtypeuid"');
        await queryRunner.query('ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "description" text');
        await queryRunner.query('ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "name" text');
        await queryRunner.query('ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "htmltag" text');

        await queryRunner.query('ALTER TABLE "hris_fieldgroupset" RENAME TO "fieldgroupset"');
        await queryRunner.query('ALTER TABLE "fieldgroupset" RENAME COLUMN "id" TO "fieldgroupsetid"');
        await queryRunner.query('ALTER TABLE "fieldgroupset" RENAME COLUMN "uid" TO "fieldgroupsetuid"');
        await queryRunner.query('ALTER TABLE "fieldgroupset" RENAME COLUMN "datecreated" TO "createdAt"');
        await queryRunner.query('ALTER TABLE "fieldgroupset" RENAME COLUMN "lastupdated" TO "updatedAt"');
        await queryRunner.query('ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "description" text');
        await queryRunner.query('ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "name" text');
        await queryRunner.query('ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "htmltag" text');

        await queryRunner.query('ALTER TABLE "hris_field_datatype" RENAME TO "fielddatatype"');
        await queryRunner.query('ALTER TABLE "fielddatatype" RENAME COLUMN "id" TO "fielddatatypeid"');
        await queryRunner.query('ALTER TABLE "fielddatatype" RENAME COLUMN "uid" TO "fieldgroupsetuid"');
        await queryRunner.query('ALTER TABLE "fielddatatype" RENAME COLUMN "datecreated" TO "createdAt"');
        await queryRunner.query('ALTER TABLE "fielddatatype" RENAME COLUMN "lastupdated" TO "updatedAt"');
        await queryRunner.query('ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "description" text');
        await queryRunner.query('ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "name" text');
 
    }
}

                                          
public async down(queryRunner: QueryRunner): Promise<any> {
}

}
