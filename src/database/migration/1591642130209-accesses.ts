import { MigrationInterface, QueryRunner } from 'typeorm';

export class accesses1591642130209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        CREATE SEQUENCE userroleaccess_id_seq;
        CREATE SEQUENCE useraccess_id_seq;

        CREATE TABLE public.userroleaccess
            (
                created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
                lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
                id bigint NOT NULL DEFAULT nextval('userroleaccess_id_seq'::regclass),
                uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
                access json NOT NULL,
                userroleid bigint NOT NULL,
                CONSTRAINT "PK_userroleaccess" PRIMARY KEY (id),
                CONSTRAINT "UQ_userroleaccess" UNIQUE (uid),
                CONSTRAINT "FK_userroleid" FOREIGN KEY ("userroleid")
                REFERENCES public.userrole (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE
            )

            TABLESPACE pg_default;

            ALTER TABLE public.userroleaccess
                OWNER to postgres;

            CREATE TABLE public.useraccess
            (
                created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
                lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
                id bigint NOT NULL DEFAULT nextval('useraccess_id_seq'::regclass),
                uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
                access json NOT NULL,
                userid bigint NOT NULL,
                CONSTRAINT "PK_useraccess" PRIMARY KEY (id),
                CONSTRAINT "UQ_Useraccess" UNIQUE (uid),
                CONSTRAINT "FK_userid" FOREIGN KEY ("userid")
                REFERENCES public."user" (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE
            )

            TABLESPACE pg_default;

            ALTER TABLE public.useraccess
                OWNER to postgres;

            CREATE TABLE public.sessionuseraccess
            (
                "trainingsessionId" bigint NOT NULL,
                "useraccessId" bigint NOT NULL,
                CONSTRAINT "PK_sessionuseraccess" PRIMARY KEY ("trainingsessionId", "useraccessId"),
                CONSTRAINT "FK_sessionuseraccess" FOREIGN KEY ("trainingsessionId")
                    REFERENCES public.trainingsession (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE,
                CONSTRAINT "FK_86db259ad9294a4f9cd7fb29edc" FOREIGN KEY ("useraccessId")
                    REFERENCES public.useraccess (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE
            )

            TABLESPACE pg_default;

            ALTER TABLE public.sessionuseraccess
                OWNER to postgres;
            -- Index: IDX_0fae76387fb4a613f7fc2c25c1

            -- DROP INDEX public."IDX_0fae76387fb4a613f7fc2c25c1";

            CREATE INDEX "IDX_0fae76387fb4a613f7fc2c25c1"
                ON public.sessionuseraccess USING btree
                ("trainingsessionId" ASC NULLS LAST)
                TABLESPACE pg_default;
            -- Index: IDX_86db259ad9294a4f9cd7fb29ed

            -- DROP INDEX public."IDX_86db259ad9294a4f9cd7fb29ed";

            CREATE INDEX "IDX_86db259ad9294a4f9cd7fb29ed"
                ON public.sessionuseraccess USING btree
                ("useraccessId" ASC NULLS LAST)
                TABLESPACE pg_default;

            CREATE TABLE public.sessionuserroleaccess
            (
                "trainingsessionId" bigint NOT NULL,
                "userroleaccessId" bigint NOT NULL,
                CONSTRAINT "PK_userroleaccessid" PRIMARY KEY ("trainingsessionId", "userroleaccessId"),
                CONSTRAINT "FK_userroleaccessid" FOREIGN KEY ("userroleaccessId")
                    REFERENCES public.userroleaccess (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE,
                CONSTRAINT "FK_trainingsessionid" FOREIGN KEY ("trainingsessionId")
                    REFERENCES public.trainingsession (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE
            )

            TABLESPACE pg_default;

            ALTER TABLE public.sessionuserroleaccess
                OWNER to postgres;
            -- Index: IDX_bda0e0b14c505f978e6be2f8cf

            -- DROP INDEX public."IDX_bda0e0b14c505f978e6be2f8cf";

            CREATE INDEX "IDX_bda0e0b14c505f978e6be2f8cf"
                ON public.sessionuserroleaccess USING btree
                ("userroleaccessId" ASC NULLS LAST)
                TABLESPACE pg_default;
            -- Index: IDX_f2b577fca6a47798f33803f533

            -- DROP INDEX public."IDX_f2b577fca6a47798f33803f533";

            CREATE INDEX "IDX_f2b577fca6a47798f33803f533"
                ON public.sessionuserroleaccess USING btree
                ("trainingsessionId" ASC NULLS LAST)
                TABLESPACE pg_default;
        
        ALTER TABLE "userrole" ADD COLUMN "accessId" bigint;
        ALTER TABLE "user" ADD COLUMN "accessId" bigint;

        ALTER TABLE sessionparticipant ADD COLUMN certified BOOLEAN;
        ALTER TABLE sessionparticipant ADD COLUMN assessed BOOLEAN;
        ALTER TABLE sessionparticipant ADD COLUMN certifiedby BIGINT;
        ALTER TABLE sessionparticipant ADD COLUMN certificationdate TIMESTAMP;
        ALTER TABLE sessionparticipant ADD COLUMN assessedby BIGINT;
        ALTER TABLE sessionparticipant ADD COLUMN assessmentdate TIMESTAMP;
        ALTER TABLE sessionparticipant ADD CONSTRAINT FK_CERTIFICATION_CERTIFICATION FOREIGN KEY (certifiedby) 
        REFERENCES public."user"(id);
        ALTER TABLE sessionparticipant ADD CONSTRAINT FK_CERTIFICATION_ASSESSMENT FOREIGN KEY (assessedby) 
        REFERENCES public."user"(id);


        ALTER TABLE public.formfieldmember DROP COLUMN IF EXISTS id;

        ALTER TABLE public.formfieldmember ADD COLUMN id bigint;

        ALTER TABLE public.formfieldmember ALTER COLUMN id SET DATA TYPE bigint;

        DROP SEQUENCE IF EXISTS formfieldmember_id_seq;

        CREATE SEQUENCE formfieldmember_id_seq start 1 increment 1;

        ALTER TABLE public.formfieldmember ALTER COLUMN id SET DEFAULT nextval('formfieldmember_id_seq'::regclass);

        UPDATE formfieldmember SET id = nextval('formfieldmember_id_seq');

        UPDATE formfieldmember SET id = nextval('formfieldmember_id_seq');

        ALTER TABLE public.formfieldmember ALTER COLUMN id SET NOT NULL;

        ALTER TABLE formfieldmember DROP CONSTRAINT IF EXISTS hris_form_fieldmembers_pkey;

        ALTER TABLE formfieldmember ADD CONSTRAINT hris_form_fieldmembers_pkey PRIMARY KEY (id);

        ALTER TABLE public.formfieldmember DROP COLUMN IF EXISTS uid;

        ALTER TABLE public.formfieldmember ADD COLUMN uid character varying(11);

        DROP SEQUENCE IF EXISTS formfieldmembers_uuid_seq;

        CREATE SEQUENCE formfieldmembers_uuid_seq START 100 increment 5;

        DROP FUNCTION IF EXISTS generate_uuid(length int);

        CREATE FUNCTION generate_uuid(length int)
        RETURNS text AS $$
        SELECT array_to_string(
        ARRAY(
            SELECT substring(
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                trunc(random()*62)::int+1,
                1
            )
            FROM generate_series(1,length) AS gs(x)
        )
        , ''
        )
        $$ LANGUAGE SQL
        RETURNS NULL ON NULL INPUT
        VOLATILE LEAKPROOF;

        DO $$
        BEGIN
        FOR counter IN 100..500 LOOP
            UPDATE formfieldmember SET uid = left((nextval('formfieldmembers_uuid_seq') || (SELECT * FROM generate_uuid(8))), 11) WHERE uid IS NULL;
            RAISE NOTICE 'UPDATE ROW NO: %', counter;
        END LOOP;
        END; $$;


        ALTER TABLE public.formfieldmember ALTER COLUMN uid SET NOT NULL;

        ALTER TABLE public.formfieldmember DROP COLUMN IF EXISTS description;

        ALTER TABLE public.formfieldmember DROP COLUMN IF EXISTS title;

        ALTER TABLE public.formfieldmember ADD COLUMN title character varying(255);

        ALTER TABLE public.formfieldmember ADD COLUMN description text;

        ALTER TABLE public.formfieldmember DROP COLUMN IF EXISTS lastupdatedby;

        ALTER TABLE public.formfieldmember ADD COLUMN lastupdatedby character varying(11);

        ALTER TABLE public.formfieldmember DROP COLUMN IF EXISTS publicaccess;

        ALTER TABLE public.formfieldmember ADD COLUMN publicaccess character varying(11);

        ALTER TABLE public.formfieldmember DROP COLUMN IF EXISTS externalaccess;

        ALTER TABLE public.formfieldmember ADD COLUMN externalaccess boolean;

        ALTER TABLE public.formfieldmember DROP COLUMN IF EXISTS created;


        INSERT INTO public.reportgroupmembers(
            "reportgroupId", "reportId")
            VALUES (1,13),
           (1,14),
          (2,1),
          (2,2),
          (2,3),
          (2,4),
         (3,5),
         (4,6),
         (4,7),
         (4,8),
         (4,9),
        (4,10),
        (4,11),
        (4,12);


        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
