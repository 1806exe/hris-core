import { MigrationInterface, QueryRunner } from 'typeorm';

export class reports1594708423761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS hris_report;
        DROP TABLE IF EXISTS reportgroupmembers;

        DROP TABLE IF EXISTS report;

        DROP TABLE IF EXISTS reportgroup;

        DROP SEQUENCE IF EXISTS report_id_seq;

        CREATE SEQUENCE report_id_seq;

        CREATE TABLE public.report
        (
          created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
          lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
          id integer NOT NULL DEFAULT nextval('report_id_seq'::regclass),
          uid character(13) NOT NULL,
          code  char(50000) NULL,
          name text NOT NULL,
          description text,
          lastupdatedby character varying,
          publicaccess character(8),
          externalaccess boolean,
          uri character varying(255),
          parameters json NULL,
          type character varying(255) NOT NULL,
          createdby character varying(255),
          html char(50000) NULL,
          CONSTRAINT "PK_1af82de239cf99a5ba1f66a4660" PRIMARY KEY (id),
          CONSTRAINT "UQ_e20953580a9f370ec98c5ae94e3" UNIQUE (uid)
        )
        WITH (
          OIDS=FALSE
        );
        ALTER TABLE public.report
          OWNER TO postgres;
        
        
        DROP SEQUENCE IF EXISTS reportgroup_id_seq;
        
        CREATE SEQUENCE reportgroup_id_seq;
        
        CREATE TABLE public.reportgroup
        (
          created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
          lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
          id integer NOT NULL DEFAULT nextval('reportgroup_id_seq'::regclass),
          uid character(13) NOT NULL,
          code text DEFAULT NULL::char,
          name text NOT NULL,
          description text,
          lastupdatedby character varying,
          publicaccess character(8),
          externalaccess boolean,
          CONSTRAINT "PK_2a90e74adda4b6c08fe2998e262" PRIMARY KEY (id),
          CONSTRAINT "UQ_75ad837fd6bedc91c080ab072b2" UNIQUE (uid)
        )
        WITH (
          OIDS=FALSE
        );
        ALTER TABLE public.reportgroup
          OWNER TO postgres;
          
        
        CREATE TABLE public.reportgroupmembers
        (
          "reportgroupId" integer NOT NULL,
          "reportId" integer NOT NULL,
          CONSTRAINT "PK_af814dd7950fd7741850bb071d2" PRIMARY KEY ("reportgroupId", "reportId"),
          CONSTRAINT "FK_abb6c0c7aa6e4f7f6e084cf981e" FOREIGN KEY ("reportgroupId")
              REFERENCES public.reportgroup (id) MATCH SIMPLE
              ON UPDATE NO ACTION ON DELETE CASCADE,
          CONSTRAINT "FK_fb988f65c0c3a89c183afb68ee0" FOREIGN KEY ("reportId")
              REFERENCES public.report (id) MATCH SIMPLE
              ON UPDATE NO ACTION ON DELETE CASCADE
        )
        WITH (
          OIDS=FALSE
        );
        ALTER TABLE public.reportgroupmembers
          OWNER TO postgres;
        
        
        DROP INDEX IF EXISTS "IDX_abb6c0c7aa6e4f7f6e084cf981";
        
        DROP INDEX IF EXISTS "IDX_fb988f65c0c3a89c183afb68ee";
        
        CREATE INDEX "IDX_abb6c0c7aa6e4f7f6e084cf981"
          ON public.reportgroupmembers
          USING btree
          ("reportgroupId");
          
        CREATE INDEX "IDX_fb988f65c0c3a89c183afb68ee"
          ON public.reportgroupmembers
          USING btree
          ("reportId");
          INSERT INTO report(id,uid, name, type, code) VALUES (1, uid(),'Updates in the Last Month', 'sqlview', 'SELECT
          ou2.name "Region",
          ou.name "District",
          (
            SELECT
              COUNT(*)
            FROM record rec
            INNER JOIN _organisationunitstructure ous ON(
                ous.organisationunitid = rec.organisationunitid
                AND ou.id = ous.idlevel4
              )
            WHERE
              rec.created >= date.date
          ) "New Records",
          (
            SELECT
              COUNT(*)
            FROM record rec
            INNER JOIN _organisationunitstructure ous ON(
                ous.organisationunitid = rec.organisationunitid
                AND ou.id = ous.idlevel4
              )
            WHERE
              rec.created < date.date
              AND rec.lastupdated >= date.date
          ) "Updated Records",
          (
            SELECT
              COUNT(*)
            FROM hris_record_history rec_hist
            INNER JOIN record rec ON(rec_hist.record_id = rec.id)
            INNER JOIN _organisationunitstructure ous ON(
                ous.organisationunitid = rec.organisationunitid
                AND ou.id = ous.idlevel4
              )
            WHERE
              rec_hist.lastupdated > date.date
          ) "Updated Record History",
          (
            SELECT
              COUNT(*)
            FROM trainingsession rec
            INNER JOIN _organisationunitstructure ous ON(
                ous.organisationunitid = rec.organisationunit
                AND ou.id = ous.idlevel4
              )
            WHERE
              rec.created >= date.date
          ) "Training Records"
        FROM organisationunit ou
        INNER JOIN (
            SELECT
              (now() - ''1 months'' :: interval) :: timestamp date
          ) as date ON(true)
        INNER JOIN _organisationunitstructure ous ON(ous.organisationunitid = ou.id)
        INNER JOIN organisationunitlevel oul ON(
            ous.level = oul.level
            AND oul.level = 4
          )
        INNER JOIN organisationunit ou2 ON(ou2.id = ous.idlevel3)
        WHERE
          ou2.parentid = 1161
        ORDER BY
          ou2.name,
          ou.name');
          
    INSERT INTO report(id,uid, name, type, code) VALUES ( 2,uid(),'Updates in the Last 3 Months', 'sqlview', 
          'SELECT
                ou2.name "Region",
                ou.name "District",
                (
                  SELECT
                    COUNT(*)
                  FROM record rec
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunitid
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec.created >= date.date
                ) "New Records",
                (
                  SELECT
                    COUNT(*)
                  FROM record rec
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunitid
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec.created < date.date
                    AND rec.lastupdated >= date.date
                ) "Updated Records",
                (
                  SELECT
                    COUNT(*)
                  FROM hris_record_history rec_hist
                  INNER JOIN record rec ON(rec_hist.record_id = rec.id)
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunitid
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec_hist.lastupdated > date.date
                ) "Updated Record History",
                (
                  SELECT
                    COUNT(*)
                  FROM trainingsession rec
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunit
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec.created >= date.date
                ) "Training Records"
              FROM organisationunit ou
              INNER JOIN (
                  SELECT
                    (now() - ''3 months'' :: interval) :: timestamp date
                ) as date ON(true)
              INNER JOIN _organisationunitstructure ous ON(ous.organisationunitid = ou.id)
              INNER JOIN organisationunitlevel oul ON(
                  ous.level = oul.level
                  AND oul.level = 4
                )
              INNER JOIN organisationunit ou2 ON(ou2.id = ous.idlevel3)
              WHERE
                ou2.parentid = 1161
              ORDER BY
                ou2.name,
                ou.name');
                
    INSERT INTO report(id,uid, name, type, code) VALUES (3, uid(),'Updates in the Last 6 Months', 'sqlview', 
          'SELECT
                ou2.name "Region",
                ou.name "District",
                (
                  SELECT
                    COUNT(*)
                  FROM record rec
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunitid
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec.created >= date.date
                ) "New Records",
                (
                  SELECT
                    COUNT(*)
                  FROM record rec
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunitid
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec.created < date.date
                    AND rec.lastupdated >= date.date
                ) "Updated Records",
                (
                  SELECT
                    COUNT(*)
                  FROM hris_record_history rec_hist
                  INNER JOIN record rec ON(rec_hist.record_id = rec.id)
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunitid
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec_hist.lastupdated > date.date
                ) "Updated Record History",
                (
                  SELECT
                    COUNT(*)
                  FROM trainingsession rec
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunit
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec.created >= date.date
                ) "Training Records"
              FROM organisationunit ou
              INNER JOIN (
                  SELECT
                    (now() - ''6 months'' :: interval) :: timestamp date
                ) as date ON(true)
              INNER JOIN _organisationunitstructure ous ON(ous.organisationunitid = ou.id)
              INNER JOIN organisationunitlevel oul ON(
                  ous.level = oul.level
                  AND oul.level = 4
                )
              INNER JOIN organisationunit ou2 ON(ou2.id = ous.idlevel3)
              WHERE
                ou2.parentid = 1161
              ORDER BY
                ou2.name,
                ou.name'
                );
                
    INSERT INTO report(id,uid, name, type, code) VALUES ( 4,uid(),'Updates Made in the Past 12 Months', 'sqlview', 
                'SELECT
                      ou2.name "Region",
                      ou.name "District",
                      (
                        SELECT
                          COUNT(*)
                        FROM record rec
                        INNER JOIN _organisationunitstructure ous ON(
                            ous.organisationunitid = rec.organisationunitid
                            AND ou.id = ous.idlevel4
                          )
                        WHERE
                          rec.created >= date.date
                      ) "New Records",
                      (
                        SELECT
                          COUNT(*)
                        FROM record rec
                        INNER JOIN _organisationunitstructure ous ON(
                            ous.organisationunitid = rec.organisationunitid
                            AND ou.id = ous.idlevel4
                          )
                        WHERE
                          rec.created < date.date
                          AND rec.lastupdated >= date.date
                      ) "Updated Records",
                      (
                        SELECT
                          COUNT(*)
                        FROM hris_record_history rec_hist
                        INNER JOIN record rec ON(rec_hist.record_id = rec.id)
                        INNER JOIN _organisationunitstructure ous ON(
                            ous.organisationunitid = rec.organisationunitid
                            AND ou.id = ous.idlevel4
                          )
                        WHERE
                          rec_hist.lastupdated > date.date
                      ) "Updated Record History",
                      (
                        SELECT
                          COUNT(*)
                        FROM trainingsession rec
                        INNER JOIN _organisationunitstructure ous ON(
                            ous.organisationunitid = rec.organisationunit
                            AND ou.id = ous.idlevel4
                          )
                        WHERE
                          rec.created >= date.date
                      ) "Training Records"
                    FROM organisationunit ou
                    INNER JOIN (
                        SELECT
                          (now() - ''12 months'' :: interval) :: timestamp date
                      ) as date ON(true)
                    INNER JOIN _organisationunitstructure ous ON(ous.organisationunitid = ou.id)
                    INNER JOIN organisationunitlevel oul ON(
                        ous.level = oul.id
                        AND oul.level = 4
                      )
                    INNER JOIN organisationunit ou2 ON(ou2.id = ous.idlevel3)
                    WHERE
                      ou2.parentid = 1161
                    ORDER BY
                      ou2.name,
                      ou.name'
                      );
                      
    INSERT INTO report(id,uid, name, type, code) VALUES (5, uid(),'RRH Updates Made in the Past 9 Months', 'sqlview', 
        'SELECT
              ou2.name "Region",
              ou.name "District",
              (
                  SELECT COUNT(*) FROM record rec
                  INNER JOIN _organisationunitstructure ous ON(ous.organisationunitid = rec.organisationunitid
                          AND ou.id = ous.idlevel4
                      )
                  WHERE
                      rec.created >= date.date
              ) "New Records",
              (
                  SELECT
                      COUNT(*)
                  FROM
                      record rec
                      INNER JOIN _organisationunitstructure ous ON(
                          ous.organisationunitid = rec.organisationunitid
                          AND ou.id = ous.idlevel4
                      )
                  WHERE
                      rec.created < date.date
                      AND rec.lastupdated >= date.date
              ) "Edited Records",
              (
                  SELECT
                      COUNT(*)
                  FROM
                      hris_record_history rec_hist
                      INNER JOIN record rec ON(rec_hist.record_id = rec.id)
                      INNER JOIN _organisationunitstructure ous ON(
                          ous.organisationunitid = rec.organisationunitid
                          AND ou.id = ous.idlevel4
                      )
                  WHERE
                      rec_hist.lastupdated > date.date
              ) "Updated Record History",
              (
                  SELECT
                      COUNT(*)
                  FROM
                      trainingsession rec
                      INNER JOIN _organisationunitstructure ous ON(
                          ous.organisationunitid = rec.organisationunit
                          AND ou.id = ous.idlevel4
                      )
                  WHERE
                      rec.created >= date.date
              ) "Training Records"
          FROM
              organisationunit ou
              INNER JOIN (
                  SELECT
                      (now() - ''9 months'' :: interval) :: timestamp date
              ) as date ON(true)
              INNER JOIN _organisationunitstructure ous ON(ous.organisationunitid = ou.id)
              INNER JOIN organisationunitlevel oul ON(
                  ous.level = oul.id
                  AND oul.level = 4
              )
              INNER JOIN organisationunit ou2 ON(ou2.id = ous.idlevel3)
          WHERE
              ou2.parentid = 1161
              AND 0 = (
                  SELECT
                      COUNT(*)
                  FROM
                      organisationunit
                  WHERE
                      parentid = ou.id
              )
          ORDER BY
              ou2.name,
              ou.name'
         );
         
    INSERT INTO report(id,uid, name, type, code) VALUES (6, uid(),'RRH Updates Made in the Past 1 Months', 'sqlview', 
        'SELECT
                ou2.name "Region",
                ou.name "District",
                (
                  SELECT
                    COUNT(*)
                  FROM record rec
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunitid
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec.created >= date.date
                ) "New Records",
                (
                  SELECT
                    COUNT(*)
                  FROM record rec
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunitid
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec.created < date.date
                    AND rec.lastupdated >= date.date
                ) "Edited Records",
                (
                  SELECT
                    COUNT(*)
                  FROM hris_record_history rec_hist
                  INNER JOIN record rec ON(rec_hist.record_id = rec.id)
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunitid
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec_hist.lastupdated > date.date
                ) "Updated Record History",
                (
                  SELECT
                    COUNT(*)
                  FROM trainingsession rec
                  INNER JOIN _organisationunitstructure ous ON(
                      ous.organisationunitid = rec.organisationunit
                      AND ou.id = ous.idlevel4
                    )
                  WHERE
                    rec.created >= date.date
                ) "Training Records"
              FROM organisationunit ou
              INNER JOIN (
                  SELECT
                    (now() - ''1 month'' :: interval) :: timestamp date
                ) as date ON(true)
              INNER JOIN _organisationunitstructure ous ON(ous.organisationunitid = ou.id)
              INNER JOIN organisationunitlevel oul ON(
                  ous.level = oul.id
                  AND oul.level = 4
                )
              INNER JOIN organisationunit ou2 ON(ou2.id = ous.idlevel3)
              WHERE
                ou2.parentid = 1161
                AND 0 = (
                  SELECT
                    COUNT(*)
                  FROM organisationunit
                  WHERE
                    parentid = ou.id
                )
              ORDER BY
                ou2.name,
                ou.name'   );
                
    INSERT INTO report(id,uid, name, type, code) VALUES (7, uid(),'RRH Updates Made in the Past 3 Months', 'sqlview', 
                'SELECT
                        ou2.name "Region",
                        ou.name "District",
                        (
                            SELECT
                                COUNT(*)
                            FROM
                                record rec
                                INNER JOIN _organisationunitstructure ous ON(
                                    ous.organisationunitid = rec.organisationunitid
                                    AND ou.id = ous.idlevel4
                                )
                            WHERE
                                rec.created >= date.date
                        ) "New Records",
                        (
                            SELECT
                                COUNT(*)
                            FROM
                                record rec
                                INNER JOIN _organisationunitstructure ous ON(
                                    ous.organisationunitid = rec.organisationunitid
                                    AND ou.id = ous.idlevel4
                                )
                            WHERE
                                rec.created < date.date
                                AND rec.lastupdated >= date.date
                        ) "Edited Records",
                        (
                            SELECT
                                COUNT(*)
                            FROM
                                hris_record_history rec_hist
                                INNER JOIN record rec ON(rec_hist.record_id = rec.id)
                                INNER JOIN _organisationunitstructure ous ON(
                                    ous.organisationunitid = rec.organisationunitid
                                    AND ou.id = ous.idlevel4
                                )
                            WHERE
                                rec_hist.lastupdated > date.date
                        ) "Updated Record History",
                        (
                            SELECT
                                COUNT(*)
                            FROM
                                trainingsession rec
                                INNER JOIN _organisationunitstructure ous ON(
                                    ous.organisationunitid = rec.organisationunit
                                    AND ou.id = ous.idlevel4
                                )
                            WHERE
                                rec.created >= date.date
                        ) "Training Records"
                    FROM
                        organisationunit ou
                        INNER JOIN (
                            SELECT
                                (now() - ''1 months'' :: interval) :: timestamp date
                        ) as date ON(true)
                        INNER JOIN _organisationunitstructure ous ON(ous.organisationunitid = ou.id)
                        INNER JOIN organisationunitlevel oul ON(
                            ous.level = oul.id
                            AND oul.level = 4
                        )
                        INNER JOIN organisationunit ou2 ON(ou2.id = ous.idlevel3)
                    WHERE
                        ou2.parentid = 1161
                        AND 0 = (
                            SELECT
                                COUNT(*)
                            FROM
                                organisationunit
                            WHERE
                                parentid = ou.id
                        )
                    ORDER BY
                        ou2.name,
                        ou.name'
                       );
                       
    INSERT INTO reportgroup(id,uid,name) VALUES(1,uid(), 'Metrics');
    INSERT INTO reportgroupmembers("reportId","reportgroupId") VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
