import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserVersion3Refactoring1555771266128
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    //await queryRunner.query('ALTER TABLE hris_user" RENAME TO user');
    let userTable = await queryRunner.getTable('hris_user');

    let usersetting = `
        CREATE SEQUENCE usersetting_id_seq;
        CREATE TABLE public.usersetting
        (
            created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
            lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
            id integer NOT NULL DEFAULT nextval('usersetting_id_seq'::regclass),
            uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
            code character varying(25) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
            name character varying(256) COLLATE pg_catalog."default" NOT NULL,
            description text COLLATE pg_catalog."default",
            lastupdatedby character varying COLLATE pg_catalog."default",
            publicaccess character varying(8) COLLATE pg_catalog."default",
            externalaccess boolean,
            "emailNotification" boolean NOT NULL,
            "smsNotification" boolean NOT NULL,
            "completenessAlert" boolean NOT NULL,
            "qualityCheckAlert" boolean NOT NULL,
            CONSTRAINT "PK_62af2549f2cead8e8a77e92da3e" PRIMARY KEY (id),
            CONSTRAINT "UQ_644489a3d892891e9017be0e043" UNIQUE (uid)
        
        )
        WITH (
            OIDS = FALSE
        )
        TABLESPACE pg_default;
        
        ALTER TABLE public.usersetting
            OWNER to postgres;`;

    await queryRunner.query(usersetting);

    if (userTable) {
      await queryRunner.query('ALTER TABLE "hris_user" RENAME TO "user"');

      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN "createdbyId" INTEGER',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD CONSTRAINT "fk_user_createdby" FOREIGN KEY("createdbyId") REFERENCES "user"',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN "lastupdatedbyId" INTEGER',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "id" INTEGER',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD CONSTRAINT "fk_user_lastupdatedby" FOREIGN KEY("lastupdatedbyId") REFERENCES "user"',
      );
      await queryRunner.query(
        'ALTER TABLE "user" RENAME COLUMN "organisationunit_id" TO "organisationunitId"',
      );
      await queryRunner.query(
        'ALTER TABLE "user" RENAME COLUMN "last_login" TO "lastlogin"',
      );
      await queryRunner.query(
        'ALTER TABLE "user" RENAME COLUMN "confirmation_token" TO "token"',
      );
      await queryRunner.query(
        'ALTER TABLE "user" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "username" TEXT',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "firstname" TEXT',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "middlename" TEXT',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "surname" TEXT',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "email" TEXT',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "phonenumber" TEXT',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "jobtitle" TEXT',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "expirydate" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "deleteddate" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "enabled" BOOLEAN',
      );
      await queryRunner.query(
        'ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "userSettingsId" INTEGER',
      );
      // await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY (id)');
      await queryRunner.query(
        'ALTER TABLE "user" ADD CONSTRAINT "REL_7154b7b71e3dd18b59ad8ee8b8" UNIQUE ("userSettingsId")',
      );
      // await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "UQ_b7a5e4a3b174e954b2dabf2ef9e" UNIQUE (email)); one duplicate user mail ****^^^Key (email)=(mwajey@yahoo.com) is duplicated.^^^*****
      await queryRunner.query(
        'ALTER TABLE "user" ADD CONSTRAINT "UQ_bd91f2e189f3dd7ae490007e14e" UNIQUE (uid)',
      );
      await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT  "FK_7154b7b71e3dd18b59ad8ee8b8f" FOREIGN KEY ("userSettingsId")
            REFERENCES public.usersetting (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE
            NOT VALID`);

      await queryRunner.query(
        'ALTER TABLE "user" DROP COLUMN "username_canonical"',
      );
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "salt"');
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "password"');
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "locked"');
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "expired"');
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "expires_at"');
      await queryRunner.query(
        'ALTER TABLE "user" DROP COLUMN "password_requested_at"',
      );
      await queryRunner.query(
        'ALTER TABLE "user" DROP COLUMN "credentials_expired"',
      );
      await queryRunner.query(
        'ALTER TABLE "user" DROP COLUMN "credentials_expire_at"',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_user_group" RENAME TO "userrole"',
      );
      await queryRunner.query(
        'ALTER TABLE "userrole" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "userrole" ADD COLUMN "createdbyId" INTEGER',
      );
      await queryRunner.query(
        'ALTER TABLE "userrole" ADD CONSTRAINT "fk_userrole_createdby" FOREIGN KEY("createdbyId") REFERENCES "user"',
      );
      await queryRunner.query(
        'ALTER TABLE "userrole" ADD COLUMN "lastupdatedbyId" INTEGER',
      );
      await queryRunner.query(
        'ALTER TABLE "userrole" ADD CONSTRAINT "fk_userrole_lastupdatedby" FOREIGN KEY("lastupdatedbyId") REFERENCES "user"',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_user_group_members" RENAME TO "userrolegroupmembers"',
      );
      await queryRunner.query(
        'ALTER TABLE "userrolegroupmembers" RENAME COLUMN group_id TO "userroleId"',
      );
      await queryRunner.query(
        'ALTER TABLE "userrolegroupmembers" RENAME COLUMN user_id TO "userId"',
      );

      //await queryRunner.query('ALTER TABLE GOOD ALTER COLUMN "id" RENAME TO userid;');
    }

    let form = await queryRunner.getTable('hris_form');

    if (form) {
      await queryRunner.query('ALTER TABLE "hris_form" RENAME TO "form"');
      await queryRunner.query(
        'ALTER TABLE "form" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "title" text',
      );
      await queryRunner.query(
        'ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "hypertext" text',
      );
      await queryRunner.query(
        'ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "form" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_formsection_fieldmembers" RENAME TO "formsectionfieldmember"',
      );
      await queryRunner.query(
        'ALTER TABLE "formsectionfieldmember" RENAME COLUMN "formsection_id" TO "formsectionid"',
      );
      await queryRunner.query(
        'ALTER TABLE "formsectionfieldmember" RENAME COLUMN "field_id" TO "fieldid"',
      );
      await queryRunner.query(
        'ALTER TABLE "formsectionfieldmember" ADD COLUMN IF NOT EXISTS "sort" integer',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_form_uniquerecordfields" RENAME TO "formuniquerecordfields"',
      );
      await queryRunner.query(
        'ALTER TABLE "formuniquerecordfields" RENAME COLUMN "form_id" TO "formId"',
      );
      await queryRunner.query(
        'ALTER TABLE "formuniquerecordfields" RENAME COLUMN "field_id" TO "fieldId"',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_form_visiblefields" RENAME TO "formvisiblefield"',
      );
      await queryRunner.query(
        'ALTER TABLE "formvisiblefield" RENAME COLUMN "form_id" TO "formid"',
      );
      await queryRunner.query(
        'ALTER TABLE "formvisiblefield" RENAME COLUMN "field_id" TO "fieldid"',
      );
      await queryRunner.query(
        'ALTER TABLE "formvisiblefield" ADD COLUMN IF NOT EXISTS "sort" integer',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_formsection" RENAME TO "formsection"',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" RENAME COLUMN "form_id" TO "formid"',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "sort" integer',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "formsection" ADD COLUMN IF NOT EXISTS "description" text',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_field_relation" RENAME TO "fieldrelation"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldrelation" RENAME COLUMN "parent_field" TO "parentFieldId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldrelation" RENAME COLUMN "child_field" TO "childFieldId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldrelation" ADD COLUMN IF NOT EXISTS "sort" integer',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_form_fieldmembers" RENAME TO "formfieldmember"',
      );
      await queryRunner.query(
        'ALTER TABLE "formfieldmember" RENAME COLUMN "form_id" TO "formid"',
      );
      await queryRunner.query(
        'ALTER TABLE "formfieldmember" RENAME COLUMN "field_id" TO "fieldid"',
      );
      await queryRunner.query(
        'ALTER TABLE "formfieldmember" ADD COLUMN IF NOT EXISTS "sort" integer',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_fieldoption" RENAME TO "fieldoption"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" RENAME COLUMN "field_id" TO "fieldId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "value" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "sort" integer',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "hastraining" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "skipinreport" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "skipInReport" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "hasTraining" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "fieldid" text',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_fieldoptionmerge" RENAME TO "fieldoptionmerge"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" RENAME COLUMN "mergedfieldoption_id" TO "mergedFieldOptionId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "removedFieldOptionValue"  character varying(255)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "removedFieldOptionUid" character varying(255)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "removedFieldOptionValue" character varying(255)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "removedFieldOptionValue" character varying(255)',
      );

      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "removedFieldOptionuid" character varying(255)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "removedfieldoptionuid" character varying(255)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "fieldid" integer',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionmerge" ADD COLUMN IF NOT EXISTS "fieldId" integer',
      );

      

      await queryRunner.query(
        'ALTER TABLE "hris_fieldoptiongroupset" RENAME TO "fieldoptiongroupset"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupset" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupset" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupset" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupset" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupset" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupset" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupset" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupset" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );

      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupset" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_fieldoptiongroup" RENAME TO "fieldoptiongroup"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" RENAME COLUMN "field_id" TO "fieldId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "fieldid" integer',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_fieldoption_children" RENAME TO "fieldoptionchildren"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" RENAME COLUMN "parent_fieldoption" TO "parentFieldOptionId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" RENAME COLUMN "child_fieldoption" TO "childFieldOptionId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" ADD COLUMN IF NOT EXISTS "id" integer',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" ADD COLUMN IF NOT EXISTS "created" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_field_inputtype" RENAME TO "fieldinputtype"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "htmlTag" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldinputtype" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_fieldgroupset" RENAME TO "fieldgroupset"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupset" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupset" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_field_datatype" RENAME TO "fielddatatype"',
      );
      await queryRunner.query(
        'ALTER TABLE "fielddatatype" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_fieldgroup_members" RENAME TO "fieldgroupmembers"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupmembers" RENAME COLUMN "fieldgroup_id" TO "fieldgroupId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupmembers" RENAME COLUMN "field_id" TO "fieldId"',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_fieldgroupset_members" RENAME TO "fieldgroupsetmembers"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupsetmembers" RENAME COLUMN "fieldgroupset_id" TO "fieldgroupsetId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldgroupsetmembers" RENAME COLUMN "fieldgroup_id" TO "fieldgroupId"',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_fieldoptiongroup_members" RENAME TO "fieldoptiongroupmembers"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupmembers" RENAME COLUMN "fieldoptiongroup_id" TO "fieldoptiongroupId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupmembers" RENAME COLUMN "fieldoption_id" TO "fieldoptionId"',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_fieldoptiongroupset_members" RENAME TO "fieldoptiongroupsetmembers"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupsetmembers" RENAME COLUMN "fieldoptiongroupset_id" TO "fieldoptiongroupsetId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptiongroupsetmembers" RENAME COLUMN "fieldoptiongroup_id" TO "fieldoptiongroupId"',
      );
      
    }

    let Message = await queryRunner.getTable('hris_message_metadata');

    if (Message) {
      await queryRunner.query(
        'ALTER TABLE "hris_message_metadata" RENAME TO "messagemetadata"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" RENAME COLUMN "message_id" TO "messageid"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" RENAME COLUMN "participant_id" TO "participantid"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" RENAME COLUMN "is_read" TO "isread"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" ADD COLUMN IF NOT EXISTS  "created" text',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagemetadata" ADD COLUMN IF NOT EXISTS "description" text',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_message_thread_metadata" RENAME TO "messagethreadmetadata"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" RENAME COLUMN "thread_id" TO "threadid"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" RENAME COLUMN "participant_id" TO "participantid"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" RENAME COLUMN "is_deleted" TO "isdeleted"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" RENAME COLUMN "last_participant_message_date" TO "lastparticipantmessagedate"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" RENAME COLUMN "last_message_date" TO "lastmessagedate"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethreadmetadata" ADD COLUMN IF NOT EXISTS "description" text',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_message_thread" RENAME TO "messagethread"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" RENAME COLUMN "createdby_id" TO "createdbyid"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" RENAME COLUMN "createdat" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" ADD COLUMN IF NOT EXISTS "subject" text',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" ADD COLUMN IF NOT EXISTS "isspam" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" DROP COLUMN "datecreated"',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "messagethread" ADD COLUMN IF NOT EXISTS "description" text',
      );

      await queryRunner.query('ALTER TABLE "hris_message" RENAME TO "message"');
      await queryRunner.query(
        'ALTER TABLE "message" RENAME COLUMN "thread_id" TO "threadid"',
      );
      await queryRunner.query(
        'ALTER TABLE "message" RENAME COLUMN "user_id" TO "userId"',
      );
      await queryRunner.query(
        'ALTER TABLE "message" RENAME COLUMN "created_at" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "message" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "message" ADD COLUMN IF NOT EXISTS "body" text',
      );
      await queryRunner.query(
        'ALTER TABLE "message" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "message" DROP COLUMN "datecreated"',
      );
      await queryRunner.query(
        'ALTER TABLE "message" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "message" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "message" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "message" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "message" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "message" ADD COLUMN IF NOT EXISTS "description" text',
      );
    }

    let createAuthority = `
        CREATE SEQUENCE userauthority_id_seq;
        
        CREATE TABLE public.userauthority
        (
            created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
            lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
            id integer NOT NULL DEFAULT nextval('userauthority_id_seq'::regclass),
            uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
            name character varying(255) COLLATE pg_catalog."default" NOT NULL,
            description text COLLATE pg_catalog."default",
            CONSTRAINT "PK_fe38a99dbf1752298d9ecb3d8b7" PRIMARY KEY (id),
            CONSTRAINT "UQ_28361ca58f332ff7f4b1b3ae787" UNIQUE (uid)
        
        )
        WITH (
            OIDS = FALSE
        )
        TABLESPACE pg_default;
        `;
    await queryRunner.query(createAuthority);

    let createAuthorityMembers = `

        CREATE TABLE public.userauthoritymembers
(
    "userauthorityId" integer NOT NULL,
    "userroleId" integer NOT NULL,
    CONSTRAINT "PK_756e47136e4a6023bef85742272" PRIMARY KEY ("userauthorityId", "userroleId"),
    CONSTRAINT "FK_0f440c00688aa6615dc24e4247d" FOREIGN KEY ("userauthorityId")
        REFERENCES public.userauthority (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT "FK_76bc448ca476788f7886a7569b7" FOREIGN KEY ("userroleId")
        REFERENCES public.userrole (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.userauthoritymembers
    OWNER to postgres;

-- Index: IDX_0f440c00688aa6615dc24e4247

-- DROP INDEX public."IDX_0f440c00688aa6615dc24e4247";

CREATE INDEX "IDX_0f440c00688aa6615dc24e4247"
    ON public.userauthoritymembers USING btree
    ("userauthorityId")
    TABLESPACE pg_default;

-- Index: IDX_76bc448ca476788f7886a7569b

-- DROP INDEX public."IDX_76bc448ca476788f7886a7569b";

CREATE INDEX "IDX_76bc448ca476788f7886a7569b"
    ON public.userauthoritymembers USING btree
    ("userroleId")
    TABLESPACE pg_default;`;

    await queryRunner.query(createAuthorityMembers);

    let userFormMembers = `CREATE TABLE public.userformmembers
    (
        "userId" integer NOT NULL,
        "formId" integer NOT NULL,
        CONSTRAINT "PK_3436fae40747731a28564ed5665" PRIMARY KEY ("userId", "formId"),
        CONSTRAINT "FK_9cb26e216d11de2a2b4f880a810" FOREIGN KEY ("formId")
            REFERENCES public.form (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID,
        CONSTRAINT "FK_a6e197eeef17a3af9b33f339561" FOREIGN KEY ("userId")
            REFERENCES public."user" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    
    ALTER TABLE public.userformmembers
        OWNER to postgres;
    
    -- Index: IDX_9cb26e216d11de2a2b4f880a81
    
    -- DROP INDEX public."IDX_9cb26e216d11de2a2b4f880a81";
    
    CREATE INDEX "IDX_9cb26e216d11de2a2b4f880a81"
        ON public.userformmembers USING btree
        ("formId")
        TABLESPACE pg_default;
    
    -- Index: IDX_a6e197eeef17a3af9b33f33956
    
    -- DROP INDEX public."IDX_a6e197eeef17a3af9b33f33956";
    
    CREATE INDEX "IDX_a6e197eeef17a3af9b33f33956"
        ON public.userformmembers USING btree
        ("userId")
        TABLESPACE pg_default;`;

    await queryRunner.query(userFormMembers);

    let userGroup = `
    CREATE SEQUENCE usergroup_id_seq;
    CREATE TABLE public.usergroup
    (
        created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        id integer NOT NULL DEFAULT nextval('usergroup_id_seq'::regclass),
        uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
        name character varying(256) COLLATE pg_catalog."default" NOT NULL,
        description text COLLATE pg_catalog."default",
        CONSTRAINT "PK_071c1b946fc2e8b501bc4465996" PRIMARY KEY (id),
        CONSTRAINT "UQ_b8e96e3268bc38a7acbfab45d0b" UNIQUE (uid)
    
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;`;

    await queryRunner.query(userGroup);

    let userGroupMembers = `CREATE TABLE public.usergroupmembers
    (
        "userId" integer NOT NULL,
        "usergroupId" integer NOT NULL,
        CONSTRAINT "PK_1933bd17be21b29c7ddc78ea75f" PRIMARY KEY ("userId", "usergroupId"),
        CONSTRAINT "FK_7c5c1a7362092fc8b351ba49586" FOREIGN KEY ("userId")
            REFERENCES public."user" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID,
        CONSTRAINT "FK_e38ab8a8d42b685d7fb477934ef" FOREIGN KEY ("usergroupId")
            REFERENCES public.usergroup (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    
    ALTER TABLE public.usergroupmembers
        OWNER to postgres;
    
    -- Index: IDX_7c5c1a7362092fc8b351ba4958
    
    -- DROP INDEX public."IDX_7c5c1a7362092fc8b351ba4958";
    
    CREATE INDEX "IDX_7c5c1a7362092fc8b351ba4958"
        ON public.usergroupmembers USING btree
        ("userId")
        TABLESPACE pg_default;
    
    -- Index: IDX_e38ab8a8d42b685d7fb477934e
    
    -- DROP INDEX public."IDX_e38ab8a8d42b685d7fb477934e";
    
    CREATE INDEX "IDX_e38ab8a8d42b685d7fb477934e"
        ON public.usergroupmembers USING btree
        ("usergroupId")
        TABLESPACE pg_default;`;

    await queryRunner.query(userGroupMembers);

    let userMessageMembers = `CREATE TABLE public.usermessagemembers
    (
        "userId" integer NOT NULL,
        "messageId" integer NOT NULL,
        CONSTRAINT "PK_8849fa3d485e6e81f49a2e99b58" PRIMARY KEY ("userId", "messageId"),
        CONSTRAINT "FK_6cd8cf0394f997c3ebf6c181b8f" FOREIGN KEY ("messageId")
            REFERENCES public.message (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID,
        CONSTRAINT "FK_b20e4e6684ddbc5be3b98f5d77c" FOREIGN KEY ("userId")
            REFERENCES public."user" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    
    ALTER TABLE public.usermessagemembers
        OWNER to postgres;
    
    -- Index: IDX_6cd8cf0394f997c3ebf6c181b8
    
    -- DROP INDEX public."IDX_6cd8cf0394f997c3ebf6c181b8";
    
    CREATE INDEX "IDX_6cd8cf0394f997c3ebf6c181b8"
        ON public.usermessagemembers USING btree
        ("messageId")
        TABLESPACE pg_default;
    
    -- Index: IDX_b20e4e6684ddbc5be3b98f5d77
    
    -- DROP INDEX public."IDX_b20e4e6684ddbc5be3b98f5d77";
    
    CREATE INDEX "IDX_b20e4e6684ddbc5be3b98f5d77"
        ON public.usermessagemembers USING btree
        ("userId")
        TABLESPACE pg_default;`;

    await queryRunner.query(userMessageMembers);

    let userrolemembers = `CREATE TABLE public.userrolemembers
    (
        "userId" integer NOT NULL,
        "userroleId" integer NOT NULL,
        CONSTRAINT "PK_fe01211c9ac04fdbf65009a5762" PRIMARY KEY ("userId", "userroleId"),
        CONSTRAINT "FK_315d0c17f77fa8fb90abc516f3f" FOREIGN KEY ("userroleId")
            REFERENCES public.userrole (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID,
        CONSTRAINT "FK_6879814297a8abd1068bd4feb4d" FOREIGN KEY ("userId")
            REFERENCES public."user" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    
    ALTER TABLE public.userrolemembers
        OWNER to postgres;
    
    -- Index: IDX_315d0c17f77fa8fb90abc516f3
    
    -- DROP INDEX public."IDX_315d0c17f77fa8fb90abc516f3";
    
    CREATE INDEX "IDX_315d0c17f77fa8fb90abc516f3"
        ON public.userrolemembers USING btree
        ("userroleId")
        TABLESPACE pg_default;
    
    -- Index: IDX_6879814297a8abd1068bd4feb4
    
    -- DROP INDEX public."IDX_6879814297a8abd1068bd4feb4";
    
    CREATE INDEX "IDX_6879814297a8abd1068bd4feb4"
        ON public.userrolemembers USING btree
        ("userId")
        TABLESPACE pg_default;`;

    await queryRunner.query(userrolemembers);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
