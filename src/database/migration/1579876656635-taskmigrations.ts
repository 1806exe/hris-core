import { MigrationInterface, QueryRunner } from 'typeorm';

export class taskmigrations1579876656635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let taskMigration = ` CREATE TABLE public.task
    (
        created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        id integer NOT NULL,
        uid char(13) COLLATE pg_catalog."default" NOT NULL,
        name character varying(256) COLLATE pg_catalog."default" NOT NULL,
        code text COLLATE pg_catalog."default",
        status text COLLATE pg_catalog."default" NOT NULL,
        startedat timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        lastupdatedby integer,
        description text,
        log jsonb NOT NULL,
        publicaccess boolean,
        externalaccess boolean,
        endedat timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        CONSTRAINT "PK_task" PRIMARY KEY (id),
        CONSTRAINT "UQ_task" UNIQUE (uid),
        CONSTRAINT fk_lastupdatedby FOREIGN KEY (lastupdatedby)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
      
      )`;
    await queryRunner.query(taskMigration);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
