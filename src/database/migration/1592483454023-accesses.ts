import { MigrationInterface, QueryRunner } from 'typeorm';

export class accesses1592483454023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        CREATE SEQUENCE userroleaccess_id_seq;
        CREATE SEQUENCE dashboardaccess_id_seq;
        CREATE SEQUENCE dashboarditemaccess_id_seq;
        CREATE SEQUENCE trainingsessionaccess_id_seq;
        CREATE SEQUENCE visualizationaccess_id_seq;
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

                CREATE TABLE public.dashboardaccess
                (
                    created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
                    lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
                    id bigint NOT NULL DEFAULT nextval('dashboardaccess_id_seq'::regclass),
                    uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
                    access character varying COLLATE pg_catalog."default" NOT NULL,
                    userid bigint NOT NULL,
                    CONSTRAINT "PK_c51fbd0f74fbba0662057462344" PRIMARY KEY (id),
                    CONSTRAINT "UQ_5104b94d9648ebce5d76fb851b2" UNIQUE (uid)
                )
                
                TABLESPACE pg_default;
                
                ALTER TABLE public.dashboardaccess
                    OWNER to postgres;

                    CREATE TABLE public.dashboarditemaccess
                    (
                        created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
                        lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
                        id bigint NOT NULL DEFAULT nextval('dashboarditemaccess_id_seq'::regclass),
                        uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
                        access character varying COLLATE pg_catalog."default" NOT NULL,
                        userid bigint NOT NULL,
                        CONSTRAINT "PK_f118b858d479d0b7ef46e232c08" PRIMARY KEY (id),
                        CONSTRAINT "UQ_019cdaf4de3c6f4422a9ed8fb57" UNIQUE (uid)
                    )
                    
                    TABLESPACE pg_default;
                    
                    ALTER TABLE public.dashboarditemaccess
                        OWNER to postgres;
        
CREATE TABLE public.dashboarditemuseraccess
(
    "dashboarditemId" bigint NOT NULL,
    "dashboarditemaccessId" bigint NOT NULL,
    CONSTRAINT "PK_35c4c57340405ab528dccbcf7c8" PRIMARY KEY ("dashboarditemId", "dashboarditemaccessId"),
    CONSTRAINT "FK_bf5a6b64cd9075fb773b8719137" FOREIGN KEY ("dashboarditemId")
        REFERENCES public.dashboarditem (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT "FK_bff60c9e613821b10757daf669e" FOREIGN KEY ("dashboarditemaccessId")
        REFERENCES public.dashboarditemaccess (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.dashboarditemuseraccess
    OWNER to postgres;
-- Index: IDX_bf5a6b64cd9075fb773b871913

-- DROP INDEX public."IDX_bf5a6b64cd9075fb773b871913";

CREATE INDEX "IDX_bf5a6b64cd9075fb773b871913"
    ON public.dashboarditemuseraccess USING btree
    ("dashboarditemId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: IDX_bff60c9e613821b10757daf669

-- DROP INDEX public."IDX_bff60c9e613821b10757daf669";

CREATE INDEX "IDX_bff60c9e613821b10757daf669"
    ON public.dashboarditemuseraccess USING btree
    ("dashboarditemaccessId" ASC NULLS LAST)
    TABLESPACE pg_default;


CREATE TABLE public.dashboarduseraccess
(
    "dashboardId" bigint NOT NULL,
    "dashboardaccessId" bigint NOT NULL,
    CONSTRAINT "PK_4534240dfd652f8780739e099fb" PRIMARY KEY ("dashboardId", "dashboardaccessId"),
    CONSTRAINT "FK_3ed80cbded65a04a519e350dbc3" FOREIGN KEY ("dashboardaccessId")
        REFERENCES public.dashboardaccess (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT "FK_c3220a21f51a1dd622b2b6a3c66" FOREIGN KEY ("dashboardId")
        REFERENCES public.dashboard (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.dashboarduseraccess
    OWNER to postgres;
-- Index: IDX_3ed80cbded65a04a519e350dbc

-- DROP INDEX public."IDX_3ed80cbded65a04a519e350dbc";

CREATE INDEX "IDX_3ed80cbded65a04a519e350dbc"
    ON public.dashboarduseraccess USING btree
    ("dashboardaccessId" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: IDX_c3220a21f51a1dd622b2b6a3c6

-- DROP INDEX public."IDX_c3220a21f51a1dd622b2b6a3c6";

CREATE INDEX "IDX_c3220a21f51a1dd622b2b6a3c6"
    ON public.dashboarduseraccess USING btree
    ("dashboardId" ASC NULLS LAST)
    TABLESPACE pg_default;

    CREATE TABLE public.trainingsessionaccess
(
    created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
    lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
    id bigint NOT NULL DEFAULT nextval('trainingsessionaccess_id_seq'::regclass),
    uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
    access character varying COLLATE pg_catalog."default" NOT NULL,
    userid bigint NOT NULL,
    CONSTRAINT "PK_b6a7ee04543a8d4951c96b4b4eb" PRIMARY KEY (id),
    CONSTRAINT "UQ_fbaec84a054fb26c59c8d88dab2" UNIQUE (uid)
)

TABLESPACE pg_default;

ALTER TABLE public.trainingsessionaccess
    OWNER to postgres;


    CREATE TABLE public.sessionuseraccess
    (
        "trainingsessionId" bigint NOT NULL,
        "trainingsessionaccessId" bigint NOT NULL,
        CONSTRAINT "PK_e7ef04534bbd297f6005383746e" PRIMARY KEY ("trainingsessionId", "trainingsessionaccessId"),
        CONSTRAINT "FK_0fae76387fb4a613f7fc2c25c16" FOREIGN KEY ("trainingsessionId")
            REFERENCES public.trainingsession (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT "FK_9d80dd544e4c525186a58e45b99" FOREIGN KEY ("trainingsessionaccessId")
            REFERENCES public.trainingsessionaccess (id) MATCH SIMPLE
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
    -- Index: IDX_9d80dd544e4c525186a58e45b9
    
    -- DROP INDEX public."IDX_9d80dd544e4c525186a58e45b9";
    
    CREATE INDEX "IDX_9d80dd544e4c525186a58e45b9"
        ON public.sessionuseraccess USING btree
        ("trainingsessionaccessId" ASC NULLS LAST)
        TABLESPACE pg_default;

        CREATE TABLE public.visualizationaccess
        (
            created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
            lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
            id bigint NOT NULL DEFAULT nextval('visualizationaccess_id_seq'::regclass),
            uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
            access character varying COLLATE pg_catalog."default" NOT NULL,
            userid bigint NOT NULL,
            CONSTRAINT "PK_b2e31259d460dc90ca90b9656ef" PRIMARY KEY (id),
            CONSTRAINT "UQ_c0c93eaa81e2623add2af7c6b71" UNIQUE (uid)
        )
        
        TABLESPACE pg_default;
        
        ALTER TABLE public.visualizationaccess
            OWNER to postgres;

            CREATE TABLE public.visualizationuseraccess
            (
                "visualizationId" bigint NOT NULL,
                "visualizationaccessId" bigint NOT NULL,
                CONSTRAINT "PK_f4b9b95f9eaf70bb4fd6302afe0" PRIMARY KEY ("visualizationId", "visualizationaccessId"),
                CONSTRAINT "FK_aec2b4f8582fa384e9e3670bce5" FOREIGN KEY ("visualizationaccessId")
                    REFERENCES public.visualizationaccess (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE,
                CONSTRAINT "FK_dfb3aa87acfb3b7a1555c803b9f" FOREIGN KEY ("visualizationId")
                    REFERENCES public.visualization (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE
            )
            
            TABLESPACE pg_default;
            
            ALTER TABLE public.visualizationuseraccess
                OWNER to postgres;
            -- Index: IDX_aec2b4f8582fa384e9e3670bce
            
            -- DROP INDEX public."IDX_aec2b4f8582fa384e9e3670bce";
            
            CREATE INDEX "IDX_aec2b4f8582fa384e9e3670bce"
                ON public.visualizationuseraccess USING btree
                ("visualizationaccessId" ASC NULLS LAST)
                TABLESPACE pg_default;
            -- Index: IDX_dfb3aa87acfb3b7a1555c803b9
            
            -- DROP INDEX public."IDX_dfb3aa87acfb3b7a1555c803b9";
            
            CREATE INDEX "IDX_dfb3aa87acfb3b7a1555c803b9"
                ON public.visualizationuseraccess USING btree
                ("visualizationId" ASC NULLS LAST)
                TABLESPACE pg_default;

        ALTER TABLE record ADD COLUMN certified BOOLEAN;
        ALTER TABLE record ADD COLUMN assessed BOOLEAN;
        ALTER TABLE record ADD COLUMN certifiedby BIGINT;
        ALTER TABLE record ADD COLUMN certificationdate TIMESTAMP;
        ALTER TABLE record ADD COLUMN assessedby BIGINT;
        ALTER TABLE record ADD COLUMN assessmentdate TIMESTAMP;
        ALTER TABLE record ADD CONSTRAINT FK_CERTIFICATION_CERTIFICATION FOREIGN KEY (certifiedby) 
        REFERENCES public."user"(id);
        ALTER TABLE record ADD CONSTRAINT FK_CERTIFICATION_ASSESSMENT FOREIGN KEY (assessedby) 
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

        ALTER TABLE public.formfieldmember ADD COLUMN IF NOT EXISTS created TIMESTAMP;
        ALTER TABLE public.formfieldmember ADD COLUMN IF NOT EXISTS lastupdated TIMESTAMP;
        
        UPDATE trainingsession s SET venue = v.id
        FROM  trainingvenue v
        WHERE s.venuename = v.name

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
