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
                useraccess json NOT NULL,
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
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
