import { MigrationInterface, QueryRunner } from 'typeorm';

export class processmigrations1579876890624 implements MigrationInterface {
  name = 'processmigrations1579876890624';

  public async up(queryRunner: QueryRunner): Promise<any> {
    let processMigrations = `
        CREATE TABLE public.process
        (
            created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
            lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
            id integer NOT NULL,
            uid char(13) COLLATE pg_catalog."default" NOT NULL,
            code text COLLATE pg_catalog."default" DEFAULT NULL::character varying,
            name character varying(256) COLLATE pg_catalog."default" NOT NULL,
            description text COLLATE pg_catalog."default",
            lastupdatedby character varying COLLATE pg_catalog."default",
            publicaccess character varying(8) COLLATE pg_catalog."default",
            externalaccess boolean,
            CONSTRAINT "PK_fa87251e776c56e422a7910b058" PRIMARY KEY (id),
            CONSTRAINT "UQ_c31996377c448fd1c22558bbacc" UNIQUE (uid)
        )
        WITH (
            OIDS = FALSE
        )
        TABLESPACE pg_default;
  
        ALTER TABLE public.process
            OWNER to postgres;
        `;

   await queryRunner.query(processMigrations);

   await queryRunner.query(`
   ALTER TABLE schedule
   ADD CONSTRAINT fk_processid FOREIGN KEY (processid)
   REFERENCES public."process" (id) MATCH SIMPLE
   ON UPDATE NO ACTION
   ON DELETE NO ACTION
   NOT VALID
   `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
