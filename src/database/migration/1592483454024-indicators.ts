import { MigrationInterface, QueryRunner } from 'typeorm';

export class indicatortargets1592483454024 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
DROP TABLE IF EXISTS hris_indicator_targetfieldoption;
DROP TABLE IF EXISTS hris_indicator_target;
DROP TABLE IF EXISTS indicatorgroupmembers;
DROP TABLE IF EXISTS INDICATORGROUP;
DROP TABLE IF EXISTS INDICATOR;
CREATE SEQUENCE indicator_id_seq;
CREATE SEQUENCE indicatorgroup_id_seq;

CREATE TABLE public.indicator
(
    id bigint NOT NULL DEFAULT nextval('indicator_id_seq'::regclass),
    uid character varying(11) COLLATE pg_catalog."default",
    code character varying(50) COLLATE pg_catalog."default",
    created timestamp without time zone,
    lastupdated timestamp without time zone,
    name character varying(230) COLLATE pg_catalog."default" NOT NULL,
    shortname character varying(255) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    expression text COLLATE pg_catalog."default",
    filter text COLLATE pg_catalog."default",
    aggregationtype character varying(40) COLLATE pg_catalog."default",
    analyticstype character varying(15) COLLATE pg_catalog."default" NOT NULL,
    formid BIGINT,
    CONSTRAINT "PK_834cef9be132ef2a2a181ee3a69" PRIMARY KEY (id),
    CONSTRAINT "FK_32572ff7757e8d7b9479ab7e765" FOREIGN KEY (formid)
        REFERENCES public.form (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.indicator
    OWNER to postgres;


    CREATE TABLE public.indicatorgroup
    (
        programindicatorgroupid BIGINT NOT NULL DEFAULT nextval('indicatorgroup_id_seq'::regclass),
        uid character varying(11) COLLATE pg_catalog."default" NOT NULL,
        code character varying(50) COLLATE pg_catalog."default",
        created timestamp without time zone NOT NULL,
        lastupdated timestamp without time zone NOT NULL,
        name character varying(230) COLLATE pg_catalog."default" NOT NULL,
        description text COLLATE pg_catalog."default",
        CONSTRAINT "PK_8f12854ad59138fa04bc24a4d68" PRIMARY KEY (programindicatorgroupid),
        CONSTRAINT "UQ_067671025f330d102e996895c0d" UNIQUE (code),
        CONSTRAINT "UQ_1433e2b4f1d5a9fbad224151075" UNIQUE (uid),
        CONSTRAINT "UQ_6fcb816f39b2532f81e1482ab8d" UNIQUE (name)
    )
    
    TABLESPACE pg_default;
    
    ALTER TABLE public.indicatorgroup
        OWNER to postgres;
    -- Index: uk_2p9x16ryxtek0g6bqwd49et0c
    
    -- DROP INDEX public.uk_2p9x16ryxtek0g6bqwd49et0c;
    
    CREATE UNIQUE INDEX uk_2p9x16ryxtek0g6bqwd49et0c
        ON public.indicatorgroup USING btree
        (uid COLLATE pg_catalog."default" ASC NULLS LAST)
        TABLESPACE pg_default;
    -- Index: uk_7carnwjb5dtsk6i5dn43wy9ck
    
    -- DROP INDEX public.uk_7carnwjb5dtsk6i5dn43wy9ck;
    
    CREATE UNIQUE INDEX uk_7carnwjb5dtsk6i5dn43wy9ck
        ON public.indicatorgroup USING btree
        (name COLLATE pg_catalog."default" ASC NULLS LAST)
        TABLESPACE pg_default;
    -- Index: uk_f7wfef3jx1yl73stqs7b45ewb
    
    -- DROP INDEX public.uk_f7wfef3jx1yl73stqs7b45ewb;
    
    CREATE UNIQUE INDEX uk_f7wfef3jx1yl73stqs7b45ewb
        ON public.indicatorgroup USING btree
        (code COLLATE pg_catalog."default" ASC NULLS LAST)
        TABLESPACE pg_default;

        CREATE TABLE public.indicatorgroupmembers
        (
            "indicatorgroupProgramindicatorgroupid" BIGINT NOT NULL,
            "indicatorId" BIGINT NOT NULL,
            CONSTRAINT "PK_2ff64d3bd2bbeba82bbb38f1b69" PRIMARY KEY ("indicatorgroupProgramindicatorgroupid", "indicatorId"),
            CONSTRAINT "FK_09f7942b622d9d952d7730db60c" FOREIGN KEY ("indicatorgroupProgramindicatorgroupid")
                REFERENCES public.indicatorgroup (programindicatorgroupid) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE,
            CONSTRAINT "FK_a4f4b31cf196c9a1e4c71b1616d" FOREIGN KEY ("indicatorId")
                REFERENCES public.indicator (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE
        )
        
        TABLESPACE pg_default;
        
        ALTER TABLE public.indicatorgroupmembers
            OWNER to postgres;
        -- Index: IDX_09f7942b622d9d952d7730db60
        
        -- DROP INDEX public."IDX_09f7942b622d9d952d7730db60";
        
        CREATE INDEX "IDX_09f7942b622d9d952d7730db60"
            ON public.indicatorgroupmembers USING btree
            ("indicatorgroupProgramindicatorgroupid" ASC NULLS LAST)
            TABLESPACE pg_default;
        -- Index: IDX_a4f4b31cf196c9a1e4c71b1616
        
        -- DROP INDEX public."IDX_a4f4b31cf196c9a1e4c71b1616";
        
        CREATE INDEX "IDX_a4f4b31cf196c9a1e4c71b1616"
            ON public.indicatorgroupmembers USING btree
            ("indicatorId" ASC NULLS LAST)
            TABLESPACE pg_default;

ALTER TABLE FIELD ADD COLUMN DATATYPE TEXT;
UPDATE FIELD F SET DATATYPE = D.name
        FROM  FIELDDATATYPE D
        WHERE D.id = F."dataTypeId";
`);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
