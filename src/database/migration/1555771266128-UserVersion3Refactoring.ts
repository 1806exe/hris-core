import { MigrationInterface, QueryRunner } from 'typeorm';
import {passwordHash} from '../../core/utilities/password-utilities';

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

    let app = `
    CREATE SEQUENCE app_id_seq;
CREATE TABLE public.app
(
    created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
    lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
    id integer NOT NULL DEFAULT nextval('app_id_seq'::regclass),
    uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
    code character varying(25) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    lastupdatedby character varying COLLATE pg_catalog."default",
    publicaccess character varying(8) COLLATE pg_catalog."default",
    externalaccess boolean,
    "shortName" character varying(50) COLLATE pg_catalog."default",
    version character varying(255) COLLATE pg_catalog."default" NOT NULL,
    launchpath character varying(255) COLLATE pg_catalog."default" NOT NULL,
    appicon character varying(128) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_6cad4ca603ac1057c0753e291b4" PRIMARY KEY (id),
    CONSTRAINT "UQ_8c37a357a9e04230aa9d0bfa63b" UNIQUE (uid)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

    `;
    await queryRunner.query(app);

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
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "roles"');
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
        'ALTER TABLE "userrole" ADD COLUMN "landingpage" integer',
      );
      await queryRunner.query(
        ' ALTER TABLE "userrole" ADD CONSTRAINT "fk_landing_page_app" FOREIGN KEY ("landingpage") REFERENCES public.app(id)',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_user_group_members" RENAME TO "userrolemembers"',
      );
      await queryRunner.query(
        'ALTER TABLE "userrolemembers" RENAME COLUMN group_id TO "userroleId"',
      );
      await queryRunner.query(
        'ALTER TABLE "userrolemembers" RENAME COLUMN user_id TO "userId"',
      );

      //await queryRunner.query('ALTER TABLE GOOD ALTER COLUMN "id" RENAME TO userId;');
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
        'ALTER TABLE "formfieldmember" ADD COLUMN IF NOT EXISTS "compulsory" boolean',
      );

      await queryRunner.query(
        'ALTER TABLE "formfieldmember" ADD COLUMN IF NOT EXISTS "showinprofile" boolean',
      );

      await queryRunner.query(
        'ALTER TABLE "formfieldmember" ADD COLUMN IF NOT EXISTS "ispinned" boolean',
      );

      await queryRunner.query(
        'ALTER TABLE "formfieldmember" ADD COLUMN IF NOT EXISTS "showinlist" boolean',
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
        'ALTER TABLE "fieldoption" ADD COLUMN IF NOT EXISTS "fieldId" text',
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
        'ALTER TABLE "fieldoptionmerge" RENAME COLUMN "field_id" TO "fieldId"',
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
        'ALTER TABLE "fieldoptiongroup" ADD COLUMN IF NOT EXISTS "fieldId" integer',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_fieldoption_children" RENAME TO "fieldoptionchildren"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" RENAME COLUMN "parent_fieldoption" TO "parentFieldoptionId"',
      );
      await queryRunner.query(
        'ALTER TABLE "fieldoptionchildren" RENAME COLUMN "child_fieldoption" TO "childFieldoptionId"',
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
        'ALTER TABLE "fieldinputtype" ADD COLUMN IF NOT EXISTS "id" integer',
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
        'ALTER TABLE "fielddatatype" ADD COLUMN IF NOT EXISTS "id" integer',
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

    // let userFormMembers = `CREATE TABLE public.userformmembers
    // (
    //     "userId" integer NOT NULL,
    //     "formId" integer NOT NULL,
    //     CONSTRAINT "PK_3436fae40747731a28564ed5665" PRIMARY KEY ("userId", "formId"),
    //     CONSTRAINT "FK_9cb26e216d11de2a2b4f880a810" FOREIGN KEY ("formId")
    //         REFERENCES public.form (id) MATCH SIMPLE
    //         ON UPDATE NO ACTION
    //         ON DELETE CASCADE
    //         NOT VALID,
    //     CONSTRAINT "FK_a6e197eeef17a3af9b33f339561" FOREIGN KEY ("userId")
    //         REFERENCES public."user" (id) MATCH SIMPLE
    //         ON UPDATE NO ACTION
    //         ON DELETE CASCADE
    //         NOT VALID
    // )
    // WITH (
    //     OIDS = FALSE
    // )
    // TABLESPACE pg_default;

    // ALTER TABLE public.userformmembers
    //     OWNER to postgres;

    // -- Index: IDX_9cb26e216d11de2a2b4f880a81

    // -- DROP INDEX public."IDX_9cb26e216d11de2a2b4f880a81";

    // CREATE INDEX "IDX_9cb26e216d11de2a2b4f880a81"
    //     ON public.userformmembers USING btree
    //     ("formId")
    //     TABLESPACE pg_default;

    // -- Index: IDX_a6e197eeef17a3af9b33f33956

    // -- DROP INDEX public."IDX_a6e197eeef17a3af9b33f33956";

    // CREATE INDEX "IDX_a6e197eeef17a3af9b33f33956"
    //     ON public.userformmembers USING btree
    //     ("userId")
    //     TABLESPACE pg_default;`;

    // await queryRunner.query(userFormMembers);

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

    const previousRoles = {
      ROLE_ADMIN: 'ROLE_USER',
      ROLE_DASHBOARD_VIEW: [
        'ROLE_USER',
        'ROLE_DASHBOARD_HOME',
        'ROLE_DASHBOARD_LIST',
        'ROLE_DASHBOARD_SHOW',
      ],
      ROLE_DASHBOARD_MODIFY: [
        'ROLE_DASHBOARD_VIEW',
        'ROLE_DASHBOARD_CREATE',
        'ROLE_DASHBOARD_UPDATE',
        'ROLE_DASHBOARD_DELETE',
      ],
      ROLE_SETTINGS_VIEW: ['ROLE_SETTINGS_SHOW'],
      ROLE_SETTINGS_MODIFY: [
        'ROLE_SETTINGS_VIEW',
        'ROLE_SETTINGS_CREATE',
        'ROLE_SETTINGS_DELETE',
      ],
      ROLE_VALIDATION_VIEW: ['ROLE_VALIDATION_LIST', 'ROLE_VALIDATION_SHOW'],
      ROLE_VALIDATION_MODIFY: [
        'ROLE_VALIDATION_VIEW',
        'ROLE_VALIDATION_UPDATE',
        'ROLE_VALIDATION_CREATE',
        'ROLE_VALIDATION_DELETE',
      ],
      ROLE_DHISDATACONNECTION_VIEW: [
        'ROLE_DHISDATACONNECTION_LIST',
        'ROLE_DHISDATACONNECTION_SHOW',
      ],
      ROLE_DHISDATACONNECTION_MODIFY: [
        'ROLE_DHISDATACONNECTION_VIEW',
        'ROLE_DHISDATACONNECTION_UPDATE',
        'ROLE_DHISDATACONNECTION_CREATE',
        'ROLE_DHISDATACONNECTION_DELETE',
      ],
      ROLE_ARITHMETICFILTER_VIEW: [
        'ROLE_ARITHMETICFILTER_LIST',
        'ROLE_ARITHMETICFILTER_SHOW',
      ],
      ROLE_ARITHMETICFILTER_MODIFY: [
        'ROLE_ARITHMETICFILTER_VIEW',
        'ROLE_ARITHMETICFILTER_CREATE',
        'ROLE_ARITHMETICFILTER_UPDATE',
      ],
      ROLE_FIELD_VIEW: ['ROLE_FIELD_LIST', 'ROLE_FIELD_SHOW'],
      ROLE_FIELD_MODIFY: [
        'ROLE_FIELD_VIEW',
        'ROLE_FIELD_CREATE',
        'ROLE_FIELD_UPDATE',
        'ROLE_FIELD_DELETE',
      ],
      ROLE_FIELDGROUP_VIEW: ['ROLE_FIELDGROUP_LIST', 'ROLE_FIELDGROUP_SHOW'],
      ROLE_FIELDGROUP_MODIFY: [
        'ROLE_FIELDGROUP_VIEW',
        'ROLE_FIELDGROUP_CREATE',
        'ROLE_FIELDGROUP_UPDATE',
        'ROLE_FIELDGROUP_DELETE',
      ],
      ROLE_FIELDOPTION_VIEW: ['ROLE_FIELDOPTION_LIST', 'ROLE_FIELDOPTION_SHOW'],
      ROLE_FIELDOPTION_MODIFY: [
        'ROLE_FIELDOPTION_VIEW',
        'ROLE_FIELDOPTION_CREATE',
        'ROLE_FIELDOPTION_UPDATE',
        'ROLE_FIELDOPTION_DELETE',
      ],
      ROLE_FIELDOPTIONGROUP_VIEW: [
        'ROLE_FIELDOPTIONGROUP_LIST',
        'ROLE_FIELDOPTIONGROUP_SHOW',
      ],
      ROLE_FIELDOPTIONGROUP_MODIFY: [
        'ROLE_FIELDOPTIONGROUP_VIEW',
        'ROLE_FIELDOPTIONGROUP_CREATE',
        'ROLE_FIELDOPTIONGROUP_UPDATE',
        'ROLE_FIELDOPTIONGROUP_DELETE',
      ],
      ROLE_FIELDOPTIONGROUPSET_VIEW: [
        'ROLE_FIELDOPTIONGROUPSET_LIST',
        'ROLE_FIELDOPTIONGROUPSET_SHOW',
      ],
      ROLE_FIELDOPTIONGROUPSET_MODIFY: [
        'ROLE_FIELDOPTIONGROUPSET_VIEW',
        'ROLE_FIELDOPTIONGROUPSET_CREATE',
        'ROLE_FIELDOPTIONGROUPSET_UPDATE',
        'ROLE_FIELDOPTIONGROUPSET_DELETE',
      ],
      ROLE_FIELDOPTIONMERGE_VIEW: [
        'ROLE_FIELDOPTIONMERGE_LIST',
        'ROLE_FIELDOPTIONMERGE_SHOW',
      ],
      ROLE_FIELDOPTIONMERGE_MODIFY: [
        'ROLE_FIELDOPTIONMERGE_VIEW',
        'ROLE_FIELDOPTIONMERGE_CREATE',
        'ROLE_FIELDOPTIONMERGE_UPDATE',
        'ROLE_FIELDOPTIONMERGE_DELETE',
      ],
      ROLE_FORM_VIEW: ['ROLE_FORM_LIST', 'ROLE_FORM_SHOW'],
      ROLE_FORM_MODIFY: [
        'ROLE_FORM_VIEW',
        'ROLE_FORM_CREATE',
        'ROLE_FORM_UPDATE',
        'ROLE_FORM_DESIGN',
        'ROLE_FORM_DELETE',
      ],
      ROLE_FRIENDLYREPORT_VIEW: [
        'ROLE_FRIENDLYREPORT_LIST',
        'ROLE_FRIENDLYREPORT_SHOW',
      ],
      ROLE_FRIENDLYREPORT_MODIFY: [
        'ROLE_FRIENDLYREPORT_VIEW',
        'ROLE_FRIENDLYREPORT_CREATE',
        'ROLE_FRIENDLYREPORT_UPDATE',
        'ROLE_FRIENDLYREPORT_DELETE',
      ],
      ROLE_RELATIONALFILTER_VIEW: [
        'ROLE_RELATIONALFILTER_LIST',
        'ROLE_RELATIONALFILTER_SHOW',
      ],
      ROLE_RELATIONALFILTER_MODIFY: [
        'ROLE_RELATIONALFILTER_VIEW',
        'ROLE_RELATIONALFILTER_CREATE',
        'ROLE_RELATIONALFILTER_UPDATE',
        'ROLE_RELATIONALFILTER_DELETE',
      ],
      ROLE_RESOURCETABLE_VIEW: [
        'ROLE_RESOURCETABLE_LIST',
        'ROLE_RESOURCETABLE_SHOW',
      ],
      ROLE_RESOURCETABLE_MODIFY: [
        'ROLE_RESOURCETABLE_VIEW',
        'ROLE_RESOURCETABLE_CREATE',
        'ROLE_RESOURCETABLE_UPDATE',
        'ROLE_RESOURCETABLE_GENERATE',
        'ROLE_RESOURCETABLE_DELETE',
      ],
      ROLE_HELPCHAPTER_VIEW: ['ROLE_HELPCHAPTER_LIST', 'ROLE_HELPCHAPTER_SHOW'],
      ROLE_HELPCHAPTER_MODIFY: [
        'ROLE_HELPCHAPTER_VIEW',
        'ROLE_HELPCHAPTER_CREATE',
        'ROLE_HELPCHAPTER_UPDATE',
        'ROLE_HELPCHAPTER_DELETE',
      ],
      ROLE_HELPCENTRE_VIEW: [
        'ROLE_HELPCENTRE_TOPICS',
        'ROLE_HELPCENTRE_CHAPTER',
      ],
      ROLE_HELPTOPIC_VIEW: ['ROLE_HELPTOPIC_LIST', 'ROLE_HELPTOPIC_SHOW'],
      ROLE_HELPTOPIC_MODIFY: [
        'ROLE_HELPTOPIC_VIEW',
        'ROLE_HELPTOPIC_CREATE',
        'ROLE_HELPTOPIC_UPDATE',
        'ROLE_HELPTOPIC_DELETE',
      ],
      ROLE_EXPORT_VIEW: ['ROLE_EXPORT_LIST', 'ROLE_EXPORT_SHOW'],
      ROLE_EXPORT_MODIFY: [
        'ROLE_EXPORT_VIEW',
        'ROLE_EXPORT_CREATE',
        'ROLE_EXPORT_UPDATE',
        'ROLE_EXPORT_DELETE',
      ],
      ROLE_EXPORTMETADATA_VIEW: [
        'ROLE_EXPORTMETADATA_LIST',
        'ROLE_EXPORTMETADATA_SHOW',
      ],
      ROLE_EXPORTMETADATA_MODIFY: [
        'ROLE_EXPORTMETADATA_VIEW',
        'ROLE_EXPORTMETADATA_CREATE',
        'ROLE_EXPORTMETADATA_UPDATE',
        'ROLE_EXPORTMETADATA_DELETE',
      ],
      ROLE_IMPORTHISTORY_VIEW: [
        'ROLE_IMPORTHISTORY_LIST',
        'ROLE_IMPORTHISTORY_SHOW',
      ],
      ROLE_IMPORTHISTORY_MODIFY: [
        'ROLE_IMPORTHISTORY_VIEW',
        'ROLE_IMPORTHISTORY_CREATE',
        'ROLE_IMPORTHISTORY_UPDATE',
        'ROLE_IMPORTHISTORY_DELETE',
      ],
      ROLE_IMPORT_VIEW: ['ROLE_IMPORT_LIST', 'ROLE_IMPORT_SHOW'],
      ROLE_IMPORT_MODIFY: [
        'ROLE_IMPORT_VIEW',
        'ROLE_IMPORT_CREATE',
        'ROLE_IMPORT_UPDATE',
        'ROLE_IMPORT_IMPORTRECORDS',
        'ROLE_IMPORT_ORGANISATIONUNITS',
        'ROLE_IMPORT_IMPORTFIELDOPTIONS',
        'ROLE_IMPORT_IMPORTRECORDS',
        'ROLE_IMPORT_DELETE',
      ],
      ROLE_INDICATOR_VIEW: ['ROLE_INDICATOR_LIST', 'ROLE_INDICATOR_SHOW'],
      ROLE_INDICATOR_MODIFY: [
        'ROLE_INDICATOR_VIEW',
        'ROLE_INDICATOR_CREATE',
        'ROLE_INDICATOR_UPDATE',
        'ROLE_INDICATOR_DELETE',
      ],
      ROLE_TARGET_VIEW: [
        'ROLE_TARGET_LIST',
        'ROLE_TARGET_SHOW',
        'ROLE_TARGET_LISTFIELDOPTIONS',
      ],
      ROLE_TARGET_MODIFY: [
        'ROLE_TARGET_VIEW',
        'ROLE_TARGET_CREATE',
        'ROLE_TARGET_UPDATE',
        'ROLE_TARGET_DELETE',
      ],
      ROLE_MESSAGE_VIEW: [
        'ROLE_MESSAGE_INBOX',
        'ROLE_MESSAGE_SENT',
        'ROLE_MESSAGE_THREAD',
        'ROLE_MESSAGE_SEARCHUSERS',
        'ROLE_MESSAGE_SEARCH',
      ],
      ROLE_MESSAGE_MODIFY: [
        'ROLE_MESSAGE_VIEW',
        'ROLE_MESSAGE_CREATETHREAD',
        'ROLE_MESSAGE_MULTIMESSAGECREATETHREAD',
        'ROLE_MESSAGE_DELETE',
      ],
      ROLE_ORGANISATIONUNITCOMPLETENESS_VIEW: [
        'ROLE_ORGANISATIONUNITCOMPLETENESS_LIST',
        'ROLE_ORGANISATIONUNITCOMPLETENESS_SHOW',
      ],
      ROLE_ORGANISATIONUNITCOMPLETENESS_MODIFY: [
        'ROLE_ORGANISATIONUNITCOMPLETENESS_VIEW',
        'ROLE_ORGANISATIONUNITCOMPLETENESS_CREATE',
        'ROLE_ORGANISATIONUNITCOMPLETENESS_UPDATE',
        'ROLE_ORGANISATIONUNITCOMPLETENESS_AJAXUPDATE',
        'ROLE_ORGANISATIONUNITCOMPLETENESS_DELETE',
      ],
      ROLE_ORGANISATIONUNIT_VIEW: [
        'ROLE_ORGANISATIONUNIT_LIST',
        'ROLE_ORGANISATIONUNIT_SHOW',
        'ROLE_ORGANISATIONUNIT_LISTTREE',
        'ROLE_ORGANISATIONUNITGROUP_LISTTREE',
        'ROLE_ORGANISATIONUNIT_LISTHIERARCHY',
      ],
      ROLE_ORGANISATIONUNIT_MODIFY: [
        'ROLE_ORGANISATIONUNIT_VIEW',
        'ROLE_ORGANISATIONUNIT_CREATE',
        'ROLE_ORGANISATIONUNIT_UPDATE',
        'ROLE_ORGANISATIONUNIT_UPDATEHIERARCHY',
        'ROLE_ORGANISATIONUNIT_DELETE',
      ],
      ROLE_ORGANISATIONUNITGROUP_VIEW: [
        'ROLE_ORGANISATIONUNITGROUP_LIST',
        'ROLE_ORGANISATIONUNITGROUP_SHOW',
      ],
      ROLE_ORGANISATIONUNITGROUP_MODIFY: [
        'ROLE_ORGANISATIONUNITGROUP_VIEW',
        'ROLE_ORGANISATIONUNITGROUP_CREATE',
        'ROLE_ORGANISATIONUNITGROUP_UPDATE',
        'ROLE_ORGANISATIONUNITGROUP_DELETE',
      ],
      ROLE_ORGANISATIONUNITGROUPSET_VIEW: [
        'ROLE_ORGANISATIONUNITGROUPSET_LIST',
        'ROLE_ORGANISATIONUNITGROUPSET_SHOW',
      ],
      ROLE_ORGANISATIONUNITGROUPSET_MODIFY: [
        'ROLE_ORGANISATIONUNITGROUPSET_VIEW',
        'ROLE_ORGANISATIONUNITGROUPSET_CREATE',
        'ROLE_ORGANISATIONUNITGROUPSET_UPDATE',
        'ROLE_ORGANISATIONUNITGROUPSET_DELETE',
      ],
      ROLE_ORGANISATIONUNITLEVEL_VIEW: [
        'ROLE_ORGANISATIONUNITLEVEL_LIST',
        'ROLE_ORGANISATIONUNITLEVEL_SHOW',
      ],
      ROLE_ORGANISATIONUNITLEVEL_MODIFY: [
        'ROLE_ORGANISATIONUNITLEVEL_VIEW',
        'ROLE_ORGANISATIONUNITLEVEL_CREATE',
        'ROLE_ORGANISATIONUNITLEVEL_UPDATE',
        'ROLE_ORGANISATIONUNITLEVEL_REGENERATE',
        'ROLE_ORGANISATIONUNITLEVEL_DELETE',
      ],
      ROLE_ORGANISATIONUNITSTRUCTURE_VIEW: [
        'ROLE_ORGANISATIONUNITSTRUCTURE_LIST',
        'ROLE_ORGANISATIONUNITSTRUCTURE_SHOW',
      ],
      ROLE_ORGANISATIONUNITSTRUCTURE_MODIFY: [
        'ROLE_ORGANISATIONUNITSTRUCTURE_VIEW',
        'ROLE_ORGANISATIONUNITSTRUCTURE_CREATE',
        'ROLE_ORGANISATIONUNITSTRUCTURE_UPDATE',
        'ROLE_ORGANISATIONUNITSTRUCTURE_DELETE',
      ],
      ROLE_RECORDHISTORY_VIEW: [
        'ROLE_RECORDHISTORY_LIST',
        'ROLE_RECORDHISTORY_SHOW',
        'ROLE_RECORDHISTORY_SHOWEMPLOYEENAME',
        'ROLE_RECORDHISTORY_SHOWFIELDOPTION',
      ],
      ROLE_RECORDHISTORY_MODIFY: [
        'ROLE_RECORDHISTORY_VIEW',
        'ROLE_RECORDHISTORY_CREATE',
        'ROLE_RECORDHISTORY_UPDATE',
        'ROLE_RECORDHISTORY_DELETE',
      ],
      ROLE_RECORD_VIEW: [
        'ROLE_RECORD_LIST',
        'ROLE_RECORD_SHOW',
        'ROLE_RECORD_LISTFORMS',
      ],
      ROLE_RECORD_MODIFY: [
        'ROLE_RECORD_VIEW',
        'ROLE_RECORD_CREATE',
        'ROLE_RECORD_UPDATE',
        'ROLE_RECORD_CHANGEFORM',
        'ROLE_RECORD_DELETE',
      ],
      ROLE_RECORDTRAINING_VIEW: [
        'ROLE_RECORDTRAINING_LIST',
        'ROLE_RECORDTRAINING_SHOW',
        'ROLE_RECORDTRAINING_SHOWEMPLOYEENAME',
      ],
      ROLE_RECORDTRAINING_MODIFY: [
        'ROLE_RECORDTRAINING_VIEW',
        'ROLE_RECORDTRAINING_CREATE',
        'ROLE_RECORDTRAINING_UPDATE',
        'ROLE_RECORDTRAINING_DELETE',
      ],
      ROLE_RECORDVALIDATION_VIEW: ['ROLE_RECORDVALIDATION_VALIDATE'],
      ROLE_REPORTAGGREGATION_VIEW: [
        'ROLE_REPORTAGGREGATION_GENERATE',
        'ROLE_REPORTAGGREGATION_DOWNLOAD',
      ],
      ROLE_REPORTAGGREGATION_VIEWRECORDS: [
        'ROLE_REPORTAGGREGATION_VIEW',
        'ROLE_REPORTAGGREGATION_DOWNLOADRECORDS',
      ],
      ROLE_REPORTSHARING_VIEW: [
        'ROLE_REPORTSHARING_LIST',
        'ROLE_REPORTSHARING_SHOW',
      ],
      ROLE_REPORTSHARING_MODIFY: [
        'ROLE_REPORTSHARING_VIEW',
        'ROLE_REPORTSHARING_CREATE',
        'ROLE_REPORTSHARING_UPDATE',
        'ROLE_REPORTSHARING_DELETE',
      ],
      ROLE_REPORTRECORDS_VIEW: [
        'ROLE_REPORTRECORDS_LIST',
        'ROLE_REPORTRECORDS_DOWNLOAD',
      ],
      ROLE_REPORTFRIENDLYREPORT_VIEW: ['ROLE_REPORTFRIENDLYREPORT_GENERATE'],
      ROLE_REPORTHISTORY_VIEW: [
        'ROLE_REPORTHISTORY_GENERATE',
        'ROLE_REPORTHISTORY_DOWNLOAD',
      ],
      ROLE_REPORTHISTORY_VIEWRECORDS: [
        'ROLE_REPORTHISTORY_VIEW',
        'ROLE_REPORTHISTORY_DOWNLOADBYCADRE',
      ],
      ROLE_REPORTORGANISATIONUNITGROUPSET_VIEW: [
        'ROLE_REPORTORGANISATIONUNITGROUPSET_GENERATE',
      ],
      ROLE_REPORTORGANISATIONUNITLEVELS_VIEW: [
        'ROLE_REPORTORGANISATIONUNITLEVELS_GENERATE',
      ],
      ROLE_REPORTORGANISATIONUNITCOMPLETENESS_VIEW: [
        'ROLE_REPORTORGANISATIONUNITCOMPLETENESS_GENERATE',
      ],
      ROLE_USER_VIEW: ['ROLE_USER_LIST', 'ROLE_USER_SHOW'],
      ROLE_USER_MODIFY: [
        'ROLE_USER_VIEW',
        'ROLE_USER_CREATE',
        'ROLE_USER_UPDATE',
        'ROLE_USER_DELETE',
      ],
      ROLE_USERGROUP_VIEW: ['ROLE_USERGROUP_LIST', 'ROLE_USERGROUP_SHOW'],
      ROLE_USERGROUP_MODIFY: [
        'ROLE_USERGROUP_VIEW',
        'ROLE_USERGROUP_CREATE',
        'ROLE_USERGROUP_UPDATE',
        'ROLE_USERGROUP_DELETE',
      ],
      ROLE_USERPROFILE_VIEW: ['ROLE_USERPROFILE_SHOW'],
      ROLE_USERPROFILE_MODIFY: [
        'ROLE_USERPROFILE_VIEW',
        'ROLE_USERPROFILE_UPDATE',
      ],
      ROLE_USER_CHANGEPASSWORD: ['ROLE_USER_CHANGEPASSWORD'],
      ROLE_HELPCENTRE_BUNDLE_VIEW: [
        'ROLE_HELPCHAPTER_VIEW',
        'ROLE_HELPTOPIC_VIEW',
        'ROLE_HELPCENTRE_BUNDLE_MENU',
      ],
      ROLE_HELPCENTRE_BUNDLE_MODIFY: [
        'ROLE_HELPCHAPTER_MODIFY',
        'ROLE_HELPTOPIC_MODIFY',
      ],
      ROLE_USER_BUNDLE_VIEW: [
        'ROLE_USER_VIEW',
        'ROLE_USERGROUP_VIEW',
        'ROLE_USER_BUNDLE_MENU',
      ],
      ROLE_USER_BUNDLE_MODIFY: ['ROLE_USER_MODIFY', 'ROLE_USERGROUP_MODIFY'],
      ROLE_FORM_BUNDLE_VIEW: [
        'ROLE_FIELD_VIEW',
        'ROLE_FIELDGROUP_VIEW',
        'ROLE_FIELDOPTION_VIEW',
        'ROLE_FIELDOPTIONGROUP_VIEW',
        'ROLE_FIELDOPTIONGROUPSET_VIEW',
        'ROLE_RELATIONALFILTER_VIEW',
        'ROLE_ARITHMETICFILTER_VIEW',
        'ROLE_FRIENDLYREPORT_VIEW',
        'ROLE_FORM_VIEW',
        'ROLE_FORM_BUNDLE_MENU',
      ],
      ROLE_FORM_BUNDLE_MODIFY: [
        'ROLE_FIELD_MODIFY',
        'ROLE_FIELDGROUP_MODIFY',
        'ROLE_FIELDOPTION_MODIFY',
        'ROLE_FIELDOPTIONGROUP_MODIFY',
        'ROLE_FIELDOPTIONGROUPSET_MODIFY',
        'ROLE_RELATIONALFILTER_MODIFY',
        'ROLE_ARITHMETICFILTER_MODIFY',
        'ROLE_FRIENDLYREPORT_MODIFY',
        'ROLE_FORM_MODIFY',
      ],
      ROLE_RESOURCETABLE_BUNDLE_VIEW: ['ROLE_RESOURCETABLE_VIEW'],
      ROLE_RESOURCETABLE_BUNDLE_MODIFY: ['ROLE_RESOURCETABLE_MODIFY'],
      ROLE_TARGET_BUNDLE_VIEW: ['ROLE_TARGET_VIEW', 'ROLE_TARGET_BUNDLE_MENU'],
      ROLE_TARGET_BUNDLE_MODIFY: ['ROLE_TARGET_MODIFY'],
      ROLE_ORGANISATIONUNIT_BUNDLE_VIEW: [
        'ROLE_ORGANISATIONUNIT_VIEW',
        'ROLE_ORGANISATIONUNITGROUP_VIEW',
        'ROLE_ORGANISATIONUNITGROUPSET_VIEW',
        'ROLE_ORGANISATIONUNITLEVEL_VIEW',
        'ROLE_ORGANISATIONUNITSTRUCTURE_VIEW',
        'ROLE_ORGANISATIONUNIT_BUNDLE_MENU',
      ],
      ROLE_ORGANISATIONUNIT_BUNDLE_MODIFY: [
        'ROLE_ORGANISATIONUNIT_MODIFY',
        'ROLE_ORGANISATIONUNITGROUP_MODIFY',
        'ROLE_ORGANISATIONUNITGROUPSET_MODIFY',
        'ROLE_ORGANISATIONUNITLEVEL_MODIFY',
        'ROLE_ORGANISATIONUNITSTRUCTURE_MODIFY',
      ],
      ROLE_DATAQUALITY_BUNDLE_VIEW: [
        'ROLE_VALIDATION_VIEW',
        'ROLE_DATAQUALITY_BUNDLE_MENU',
      ],
      ROLE_DATAQUALITY_BUNDLE_MODIFY: ['ROLE_VALIDATION_MODIFY'],
      ROLE_INTERGRATION_BUNDLE_VIEW: [
        'ROLE_DHISDATACONNECTION_VIEW',
        'ROLE_INTERGRATION_BUNDLE_MENU',
      ],
      ROLE_INTERGRATION_BUNDLE_MODIFY: [
        'ROLE_DHISDATACONNECTION_MODIFY',
        'ROLE_DHISDATACONNECTION_SHOWMAPPING',
        'ROLE_DHISDATACONNECTION_UPDATERELATION',
        'ROLE_DHISDATACONNECTION_SYNCDATA',
      ],
      ROLE_RECORDS_BUNDLE_VIEW: [
        'ROLE_RECORD_VIEW',
        'ROLE_RECORDHISTORY_VIEW',
        'ROLE_RECORDTRAINING_VIEW',
        'ROLE_RECORDVALIDATION_VIEW',
        'ROLE_RECORDS_BUNDLE_MENU',
      ],
      ROLE_RECORDS_BUNDLE_MODIFY: [
        'ROLE_RECORDVALIDATION_VIEW',
        'ROLE_RECORD_MODIFY',
        'ROLE_RECORDHISTORY_MODIFY',
        'ROLE_RECORDTRAINING_MODIFY',
        'ROLE_RECORDVALIDATION_MODIFY',
      ],
      ROLE_REPORTS_BUNDLE_VIEW: [
        'ROLE_REPORTSHARING_VIEW',
        'ROLE_REPORTRECORDS_VIEW',
        'ROLE_REPORTFRIENDLYREPORT_VIEW',
        'ROLE_REPORTHISTORY_VIEW',
        'ROLE_REPORTORGANISATIONUNITGROUPSET_VIEW',
        'ROLE_REPORTORGANISATIONUNITLEVELS_VIEW',
        'ROLE_REPORTORGANISATIONUNITCOMPLETENESS_VIEW',
        'ROLE_REPORTS_BUNDLE_MENU',
      ],
      ROLE_REPORTS_BUNDLE_VIEWRECORDS: [
        'ROLE_REPORTS_BUNDLE_VIEW',
        'ROLE_REPORTAGGREGATION_VIEWRECORDS',
        'ROLE_REPORTHISTORY_VIEWRECORDS',
        'ROLE_REPORTRECORDS_DOWNLOADBYCADRE',
      ],
      ROLE_IMPORTEXPORT_BUNDLE_VIEW: [
        'ROLE_IMPORT_VIEW',
        'ROLE_IMPORTHISTORY_VIEW',
        'ROLE_EXPORT_VIEW',
        'ROLE_EXPORTMETADATA_VIEW',
        'ROLE_IMPORTEXPORT_BUNDLE_MENU',
      ],
      ROLE_IMPORTEXPORT_BUNDLE_MODIFY: [
        'ROLE_IMPORT_MODIFY',
        'ROLE_IMPORTHISTORY_MODIFY',
        'ROLE_EXPORT_MODIFY',
        'ROLE_EXPORTMETADATA_MODIFY',
      ],
      ROLE_DASHBOARD_BUNDLE_VIEW: ['ROLE_SETTINGS_VIEW', 'ROLE_DASHBOARD_VIEW'],
      ROLE_DASHBOARD_BUNDLE_MODIFY: [
        'ROLE_SETTINGS_MODIFY',
        'ROLE_DASHBOARD_MODIFY',
      ],
      ROLE_MESSAGE_BUNDLE_VIEW: ['ROLE_MESSAGE_VIEW'],
      ROLE_MESSAGE_BUNDLE_MODIFY: ['ROLE_MESSAGE_MODIFY'],
      ROLE_DATA_MANAGER: [
        'ROLE_RECORDS_BUNDLE_MODIFY',
        'ROLE_REPORTS_BUNDLE_VIEWRECORDS',
        'ROLE_IMPORTEXPORT_BUNDLE_MODIFY',
        'ROLE_USERPROFILE_MODIFY',
        'ROLE_DASHBOARD_BUNDLE_MODIFY',
        'ROLE_MESSAGE_BUNDLE_MODIFY',
        'ROLE_USER_CHANGEPASSWORD',
      ],
      ROLE_SUPER_USER: [
        'SUPER_USER',
        'ROLE_USER',
        'ROLE_ADMIN',
        'ROLE_DATA_MANAGER',
        'ROLE_ALLOWED_TO_SWITCH',
      ],
      ROLE_TRAINING_BUNDLE_VIEW: [
        'TRAINING_BUNDLE_VIEW',
        'ROLE_MESSAGE_MODIFY',
      ],
      ROLE_TRAINING_BUNDLE_MODFIY: [
        'TRAINING_BUNDLE_MODFIY',
        'ROLE_MESSAGE_MODIFY',
      ],
      ROLE_UNIT_MODIFY: [
        'ROLE_UNIT_CREATE',
        'ROLE_UNIT_UPDATE',
        'ROLE_UNIT_DELETE',
      ],
      ROLE_SECTION_MODIFY: [
        'ROLE_SECTION_CREATE',
        'ROLE_SECTION_UPDATE',
        'ROLE_SECTION_DELETE',
      ],
      ROLE_CURRICULUM_MODIFY: [
        'ROLE_CURRICULUM_CREATE',
        'ROLE_CURRICULUM_UPDATE',
        'ROLE_CURRICULUM_DELETE',
      ],
      ROLE_METHOD_MODIFY: [
        'ROLE_METHOD_CREATE',
        'ROLE_METHOD_UPDATE',
        'ROLE_METHOD_DELETE',
      ],
      ROLE_VENUE_MODIFY: [
        'ROLE_VENUE_CREATE',
        'ROLE_VENUE_UPDATE',
        'ROLE_VENUE_DELETE',
      ],
      ROLE_SPONSOR_MODIFY: [
        'ROLE_SPONSOR_CREATE',
        'ROLE_SPONSOR_UPDATE',
        'ROLE_SPONSOR_DELETE',
      ],
      ROLE_TRAINER_MODIFY: [
        'ROLE_TRAINER_CREATE',
        'ROLE_TRAINER_UPDATE',
        'ROLE_TRAINER_DELETE',
      ],
      ROLE_SESSION_MODIFY: [
        'ROLE_SESSION_CREATE',
        'ROLE_SESSION_UPDATE',
        'ROLE_SESSION_DELETE',
      ],
      ROLE_PARTICIPANT_MODIFY: [
        'ROLE_PARTICIPANT_CREATE',
        'ROLE_PARTICIPANT_UPDATE',
        'ROLE_PARTICIPANT_DELETE',
      ],
      ROLE_TRAINING_BUNDLE_SETTING: [
        'TRAINING_BUNDLE_SETTING',
        'ROLE_UNIT_VIEW',
        'ROLE_UNIT_MODIFY',
        'ROLE_SECTION_VIEW',
        'ROLE_SECTION_MODIFY',
        'ROLE_CURRICULUM_VIEW',
        'ROLE_CURRICULUM_MODIFY',
        'ROLE_METHOD_VIEW',
        'ROLE_METHOD_MODIFY',
        'ROLE_VENUE_VIEW',
        'ROLE_VENUE_MODIFY',
        'ROLE_SPONSOR_VIEW',
        'ROLE_SPONSOR_MODIFY',
        'ROLE_TRAINER_VIEW',
        'ROLE_TRAINER_MODIFY',
        'ROLE_PARTICIPANT_VIEW',
        'ROLE_PARTICIPANT_MODIFY',
      ],
      ROLE_TRAINING_BUNDLE_REPORT: [
        'TRAINING_BUNDLE_REPORT',
        'ROLE_TRAINING_REPORT_VIEW',
      ],
      ROLE_TRAINING_BUNDLE_SESSION: [
        'TRAINING_BUNDLE_SESSION',
        'ROLE_SESSION_VIEW',
        'ROLE_SESSION_MODIFY',
      ],
    };
    let authorities = [];
    Object.keys(previousRoles).forEach((key) => {
      if (Array.isArray(previousRoles[key])) {
        authorities = authorities.concat(
          previousRoles[key]
            .filter(
              (role) => authorities.indexOf(role.replace('ROLE_', '')) === -1,
            )
            .map((role) => role.replace('ROLE_', '')),
        );
      } else if (
        authorities.indexOf(previousRoles[key].replace('ROLE_', '')) === -1
      ) {
        authorities.push(previousRoles[key].replace('ROLE_', ''));
      }
    });
    await queryRunner.query(
      `INSERT INTO userauthority(
	created, lastupdated, id, uid, name)
	VALUES (` +
        authorities
          .map((auth, index) => `now(), now(), ${index + 1}, uid(), '${auth}'`)
          .join('),(') +
        ') ON CONFLICT DO NOTHING;',
    );
    const useroles = await queryRunner.manager.query('SELECT * FROM userrole');
    for (let userole of useroles) {
      let auths = [];
      userole.roles.split(';').forEach((artifacts) => {
        let authorities = artifacts.split(':');
        if (authorities[0] === 's') {
          auths.push(authorities[2].replace('ROLE_', ''));
        }
      });
      if (auths.length > 0) {
        await queryRunner.query(
          `INSERT INTO userauthoritymembers(
	"userroleId","userauthorityId")
	VALUES (` +
            auths
              .map(
                (auth) =>
                  `${
                    userole.id
                  }, (SELECT id FROM userauthority WHERE name='${auth
                    .split('"')
                    .join('')}')`,
              )
              .join('),(') +
            ')',
        );
      }
    }

    const users = await queryRunner.manager.query('SELECT * FROM public.user');
    for (let user of users) {
      await queryRunner.manager.query(
        `UPDATE public.user SET token='${await passwordHash('HRHIS2020')}' WHERE id=${
          user.id
        }`,
      );
    }

    await queryRunner.query(`
    CREATE TABLE public.organisationunitmembers
    (
        userid integer NOT NULL,
        organisationunitid integer NOT NULL,
        CONSTRAINT "PK_4c1bb7cd98866e76ec49e91a5b1" PRIMARY KEY ("userid", "organisationunitid"),
        CONSTRAINT "FK_9f8405fda0d56decd0f7e46d85d" FOREIGN KEY ("userid")
            REFERENCES public."user" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID,
        CONSTRAINT "FK_f54224b61c067df95828b544adb" FOREIGN KEY ("organisationunitid")
            REFERENCES public.hris_organisationunit (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    
    ALTER TABLE public.organisationunitmembers
        OWNER to postgres;
    
    -- Index: IDX_9f8405fda0d56decd0f7e46d85
    
    -- DROP INDEX public."IDX_9f8405fda0d56decd0f7e46d85";
    
    CREATE INDEX "IDX_9f8405fda0d56decd0f7e46d85"
        ON public.organisationunitmembers USING btree
        ("userid")
        TABLESPACE pg_default;
    
    -- Index: IDX_f54224b61c067df95828b544ad
    
    -- DROP INDEX public."IDX_f54224b61c067df95828b544ad";
    
    CREATE INDEX "IDX_f54224b61c067df95828b544ad"
        ON public.organisationunitmembers USING btree
        ("organisationunitid")
        TABLESPACE pg_default`);
    await queryRunner.query(`INSERT INTO organisationunitmembers("userid",organisationunitid)
(SELECT public.user.id,public.user.organisationunit_id FROM public.user WHERE public.user.organisationunit_id IS NOT NULL)`);

    await queryRunner.query(
      'ALTER TABLE "sqlview" ADD COLUMN "createdbyId" INTEGER',
    );

    await queryRunner.query(
      'ALTER TABLE "sqlview" ADD COLUMN "lastupdatedbyId" INTEGER',
    );

    await queryRunner.query(
      'ALTER TABLE "sqlview" ADD CONSTRAINT "fk_sql_view_createdby" FOREIGN KEY("createdbyId") REFERENCES "user"',
    );
    await queryRunner.query(
      'ALTER TABLE "sqlview" ADD CONSTRAINT "fk_sql_view_lastupdatedby" FOREIGN KEY("lastupdatedbyId") REFERENCES "user"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
