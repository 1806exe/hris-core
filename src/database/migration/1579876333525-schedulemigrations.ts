import { MigrationInterface, QueryRunner } from 'typeorm';

export class schedulemigrations1579876333525 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let schedules = `
        CREATE TABLE public.schedule
        (
            created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
            lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
            id integer NOT NULL DEFAULT nextval('schedule_id_seq'::regclass),
            uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
            name character varying(256) COLLATE pg_catalog."default" NOT NULL,
            cron text COLLATE pg_catalog."default",
            process character varying COLLATE pg_catalog."default" NOT NULL,
            code text COLLATE pg_catalog."default",
            processsid integer NOT NULL,
            description text,
            publicaccess boolean,
            externalaccess boolean,
            CONSTRAINT "PK_schdeule" PRIMARY KEY (id),
            CONSTRAINT "UQ_schedule" UNIQUE (uid),
            lastupdatedby integer,
            CONSTRAINT fk_lastupdatedby FOREIGN KEY (lastupdatedby)
            REFERENCES public."user" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
            NOT VALID
        );
        `;
    await queryRunner.query(schedules);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
