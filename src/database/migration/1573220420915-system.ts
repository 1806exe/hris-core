import { MigrationInterface, QueryRunner } from 'typeorm';

export class system1573220420915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let system = `
    CREATE SEQUENCE systeminfo_id_seq;
    CREATE TABLE public.systeminfo
        (
    created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
    lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
    id integer NOT NULL DEFAULT nextval('systeminfo_id_seq'::regclass),
    uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
    code character varying(25) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    lastupdatedby character varying COLLATE pg_catalog."default",
    publicaccess character varying(8) COLLATE pg_catalog."default",
    externalaccess boolean,
    value bytea,
    CONSTRAINT "PK_2d25dfc1ccb8b1931496e59890d" PRIMARY KEY (id),
    CONSTRAINT "UQ_2c30688b111ef30e4384a99a290" UNIQUE (uid)
        
        )
        WITH (
            OIDS = FALSE
        )
        TABLESPACE pg_default;
        
    CREATE SEQUENCE datastore_id_seq;
    CREATE TABLE public.datastore
(
    created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
    lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
    id integer NOT NULL DEFAULT nextval('datastore_id_seq'::regclass),
    uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
    namespace character varying(64) COLLATE pg_catalog."default" NOT NULL,
    key character varying(64) COLLATE pg_catalog."default" NOT NULL,
    value json NOT NULL,
    CONSTRAINT "PK_7f03f03a197064bdc47cf33433c" PRIMARY KEY (id),
    CONSTRAINT "UQ_3e99303f5fca1478e5e5cd7d5a5" UNIQUE (uid)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.datastore
    OWNER to postgres;

CREATE SEQUENCE systemsetting_id_seq;

 CREATE TABLE public.systemsetting
(
    created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
    lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
    id integer NOT NULL DEFAULT nextval('systemsetting_id_seq'::regclass),
    uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
    code character varying(25) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    lastupdatedby character varying COLLATE pg_catalog."default",
    publicaccess character varying(8) COLLATE pg_catalog."default",
    externalaccess boolean,
    value bytea,
    CONSTRAINT "PK_90893f262c7b8be66090937dfa1" PRIMARY KEY (id),
    CONSTRAINT "UQ_50055ee73b2385baffa6eccd1e8" UNIQUE (uid)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
        `;

    await queryRunner.query(system);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
