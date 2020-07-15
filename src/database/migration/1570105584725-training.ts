import { MigrationInterface, QueryRunner } from 'typeorm';

export class training1570105584725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let Training = await queryRunner.getTable('hris_training_curriculums');

    if (Training) {
      await queryRunner.query(
        'ALTER TABLE "hris_training_curriculums" RENAME TO "trainingcurriculum"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" RENAME COLUMN "section_id" TO "sectionid"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" RENAME COLUMN "unit_id" TO "unitid"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" RENAME COLUMN "all_methods_selected" TO "allmethodsselected"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculum" ADD COLUMN IF NOT EXISTS "allmethodsselected" boolean',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_training_methods" RENAME TO "trainingtopic"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtopic" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtopic" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtopic" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtopic" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtopic" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtopic" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtopic" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtopic" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtopic" ADD COLUMN IF NOT EXISTS "description" text',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_training_sections" RENAME TO "trainingsections"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsections" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsections" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsections" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsections" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsections" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsections" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsections" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsections" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsections" ADD COLUMN IF NOT EXISTS "description" text',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_training_sponsors" RENAME TO "trainingsponsor"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" RENAME COLUMN "sponsorname" TO name',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" ADD COLUMN IF NOT EXISTS "email" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" ADD COLUMN IF NOT EXISTS "phone" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" ADD COLUMN IF NOT EXISTS "box" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsponsor" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_trainers" RENAME TO "trainingtrainer"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "firstname" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "middlename" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "lastname" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "primaryjobresponsibility" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "secondaryjobresponsibility" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "profession" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "currentjobtitle" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "placeofwork" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "organisationtype" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "trainertype" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "traineraffiliation" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "experience" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "highestlevelofqualification" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "trainerlanguage" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingtrainer" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_training_units" RENAME TO "trainingunit"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingunit" RENAME COLUMN "section_id" TO "sectionid"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingunit" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingunit" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingunit" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingunit" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingunit" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingunit" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingunit" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingunit" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingunit" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_training_venues" RENAME TO "trainingvenue"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
     
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" RENAME COLUMN "venuename" TO name',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" ADD COLUMN IF NOT EXISTS "region" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" ADD COLUMN IF NOT EXISTS "district" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" ADD COLUMN IF NOT EXISTS "description" text',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" ADD COLUMN IF NOT EXISTS "code" character varying(25)',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingvenue" ADD COLUMN IF NOT EXISTS "organisationunitid" integer',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_curriculum_methods_members" RENAME TO "trainingcurriculumtopicmember"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculumtopicmember" RENAME COLUMN "curriculum_id" TO "trainingcurriculumId"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingcurriculumtopicmember" RENAME COLUMN "method_id" TO "trainingtopicId"',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_traininginstance" RENAME TO "traininginstance"',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" RENAME COLUMN "curriculum_id" TO "curriculumid"',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" RENAME COLUMN "training_id" TO "trainingid"',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" RENAME COLUMN "district" TO organisationunit',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" ADD COLUMN IF NOT EXISTS "venue" text',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" ADD COLUMN IF NOT EXISTS "sponsor" text',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" ADD COLUMN IF NOT EXISTS "organiser" text',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" ADD COLUMN IF NOT EXISTS "createdby" text',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" ADD COLUMN IF NOT EXISTS "startdate" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "traininginstance" ADD COLUMN IF NOT EXISTS "enddate" timestamp without time zone',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_traininginstance_methods" RENAME TO "trainingsessiontopics"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsessiontopics" RENAME COLUMN "traininginstance_id" TO "trainingsessionId"',
      );
      await queryRunner.query(
        'ALTER TABLE "trainingsessiontopics" RENAME COLUMN "method_id" TO "trainingtopicId"',
      );

      await queryRunner.query(
        'ALTER TABLE "hris_trainings" RENAME TO "training"',
      );
      await queryRunner.query(
        'ALTER TABLE "training" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "training" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "training" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "training" ADD COLUMN IF NOT EXISTS "coursename" text',
      );
      await queryRunner.query(
        'ALTER TABLE "training" ADD COLUMN IF NOT EXISTS "traininginstruction" text',
      );
      await queryRunner.query(
        'ALTER TABLE "training" ADD COLUMN IF NOT EXISTS "trainingcategory" text',
      );
      await queryRunner.query(
        'ALTER TABLE "training" ADD COLUMN IF NOT EXISTS "curiculum" text',
      );

      await queryRunner.query(`
      ALTER TABLE traininginstance RENAME TO trainingsession; 
      ALTER TABLE trainingsessiontopics DROP CONSTRAINT hris_traininginstance_methods_pkey;
      ALTER TABLE trainingsessiontopics ADD CONSTRAINT trainingsessiontopics_pkey PRIMARY KEY("trainingsessionId", "trainingtopicId");
      `)
    }

    let trainingSession = `
    CREATE TABLE public.traininginstance
    (
        created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        id integer NOT NULL,
        uid character varying(256) COLLATE pg_catalog."default" NOT NULL,
        code character varying(25) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
        name character varying(256) COLLATE pg_catalog."default" NOT NULL,
        description text COLLATE pg_catalog."default",
        lastupdatedby character varying COLLATE pg_catalog."default",
        publicaccess character varying(8) COLLATE pg_catalog."default",
        externalaccess boolean,
        startdate timestamp without time zone,
        enddate timestamp without time zone,
        sectionid integer,
        organisationunitid bigint,
        venueid integer,
        sponsorid integer,
        unitid integer,
        curriculumid integer,
        organiserid integer,
        CONSTRAINT "PK_423a0626bc00cef44ca00be3be2" PRIMARY KEY (id),
        CONSTRAINT "FK_14772fcc31e449bcfecb5be0d0e" FOREIGN KEY (curriculumid)
            REFERENCES public.trainingcurriculum (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT "FK_30778db1b27df56675edf72f9ad" FOREIGN KEY (sectionid)
            REFERENCES public.trainingsections (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT "FK_7311b5eb1d2c11ea7f331dacb84" FOREIGN KEY (organisationunitid)
            REFERENCES public.organisationunit (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT "FK_76aeeee775bf56bb981764dc25e" FOREIGN KEY (organiserid)
            REFERENCES public.trainingsponsor (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT "FK_83ce766a8db4f37f18da08e0db4" FOREIGN KEY (sponsorid)
            REFERENCES public.trainingsponsor (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT "FK_8cc245eeb7e85c31b83bb6b3955" FOREIGN KEY (venueid)
            REFERENCES public.trainingvenue (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT "FK_db3070edc959ca56cda6610ea27" FOREIGN KEY (unitid)
            REFERENCES public.trainingunit (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )
    
    TABLESPACE pg_default;
    
    ALTER TABLE public.trainingsession
        OWNER to postgres;
    `;
    await queryRunner.query(trainingSession);

    // let trainingSessionMethod = `CREATE TABLE public.trainingsessiontopics
    // (
    //     "trainingsessionId" integer NOT NULL,
    //     "trainingtopicId" integer NOT NULL,
    //     CONSTRAINT "PK_442920ec880e8618e1194c1783e" PRIMARY KEY ("trainingsessionId", "trainingtopicId"),
    //     CONSTRAINT "FK_69ff46ede8e95be623bb4a0fddb" FOREIGN KEY ("trainingsessionId")
    //         REFERENCES public.trainingsession (id) MATCH SIMPLE
    //         ON UPDATE NO ACTION
    //         ON DELETE CASCADE
    //         NOT VALID,
    //     CONSTRAINT "FK_c6cf5835d03868b97d74d0ad37b" FOREIGN KEY ("trainingtopicId")
    //         REFERENCES public.trainingtopic (id) MATCH SIMPLE
    //         ON UPDATE NO ACTION
    //         ON DELETE CASCADE
    //         NOT VALID
    // )
    // WITH (
    //     OIDS = FALSE
    // )
    // TABLESPACE pg_default;
    
    // ALTER TABLE public.trainingsessiontopics
    //     OWNER to postgres;
    
    // -- Index: IDX_69ff46ede8e95be623bb4a0fdd
    
    // -- DROP INDEX public."IDX_69ff46ede8e95be623bb4a0fdd";
    
    // CREATE INDEX "IDX_69ff46ede8e95be623bb4a0fdd"
    //     ON public.trainingsessiontopics USING btree
    //     ("trainingsessionId")
    //     TABLESPACE pg_default;
    
    // -- Index: IDX_c6cf5835d03868b97d74d0ad37
    
    // -- DROP INDEX public."IDX_c6cf5835d03868b97d74d0ad37";
    
    // CREATE INDEX "IDX_c6cf5835d03868b97d74d0ad37"
    //     ON public.trainingsessiontopics USING btree
    //     ("trainingtopicId")
    //     TABLESPACE pg_default;`;

    // await queryRunner.query(trainingSessionMethod);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
