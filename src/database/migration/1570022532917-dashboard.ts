import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dashboard1570022532917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const DashboardChart = await queryRunner.getTable('hris_dashboardchart');

    if (DashboardChart) {
      await queryRunner.query('DROP TABLE "hris_dashboardchart" CASCADE');
      await queryRunner.query(
        'DROP TABLE "hris_dashboardchart_formmembers" CASCADE',
      );
      await queryRunner.query(
        'DROP TABLE "hris_dashboardchart_organisationunitmembers" CASCADE',
      );
    }

    const createDashboardTable = `
    CREATE SEQUENCE IF NOT EXISTS dashboard_id_seq;

    CREATE TABLE IF NOT EXISTS public.dashboard
    (
        created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        id integer NOT NULL DEFAULT nextval('dashboard_id_seq'::regclass),
        uid character(11) COLLATE pg_catalog."default" NOT NULL,
        code character varying(25) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
        name character varying(256) COLLATE pg_catalog."default" NOT NULL,
        description text COLLATE pg_catalog."default",
        lastupdatedby character varying COLLATE pg_catalog."default",
        publicaccess character(8) COLLATE pg_catalog."default",
        externalaccess boolean,
        href text COLLATE pg_catalog."default",
        displayname character varying(256) COLLATE pg_catalog."default" NOT NULL,
        userid integer,
        CONSTRAINT "PK_8904b99a9c07185947c5d70bfde" PRIMARY KEY (id),
        CONSTRAINT "UQ_bb9e0587e0266172504bf6b5271" UNIQUE (uid),
        CONSTRAINT "FK_737e17e1bc64698b29a6112cb1a" FOREIGN KEY (userid)
            REFERENCES public."user" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    )

    TABLESPACE pg_default;
    `;
    await queryRunner.query(createDashboardTable);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}

// ALTER TABLE chartdimension ALTER COLUMN layout DROP NOT NULL;
// ALTER TABLE chartdimensionitem ADD COLUMN uid character varying(256) COLLATE pg_catalog."default" NOT NULL;
// ALTER TABLE chartdimensionitem ADD COLUMN displayname text;
// ALTER TABLE chartdimensionitem ALTER COLUMN dimensionitem TYPE character varying(256);

// INSERT INTO
// chart(id,created, lastupdated,uid,name, publicAccess,type,subscribed,cumulativeValues,sortOrder,favorite,toplimit,displayname, percentStackedValues,noSpaceBetweenColumns,hideTitle,series,showData,parentGraphMap,regressionType,completedOnly,hideEmptyRowItems,aggregationType,hideSubtitle,title,hideLegend,category)
// VALUES
// (1,'2017-07-29T21:18:43.937', '2019-02-09T20:13:45.425','MTWXrZKjPRa','Employments','r-------','COLUMN',false,false,0,false,0,'Employments',false,false,false,'dx',true,'{}','NONE',false,'NONE','DEFAULT',false,'Employments',false,'pe'),
// (2,'2017-07-29T21:18:43.937','2019-02-09T20:13:45.425','cbnWOXfp9vW','Retirement','r-------','LINE',false,false,0,false,0,'Retirement',false,false,false,'dx',true,'{}','NONE',false,'NONE','DEFAULT',false,'Retirement',false,'pe'),
// (3,'2017-07-29T21:18:43.937','2019-02-09T20:13:45.425','x1cWTFjrxVd','Gender Ratio','r-------','PIE',false,false,0,false,0,'Gender Ratio',false,false,false,'dx',true,'{}','NONE',false,'NONE','DEFAULT',false,'Gender Ratio',false,'pe'),
// (4,'2017-07-29T21:18:43.937', '2019-02-09T20:13:45.425','CCIJuYfJqAG', 'Age Distribution', 'r-----','COLUMN',false,false,0,false,0,'Age Distribution',false,false,false,'dx',true,'{}','NONE',false,'NONE','DEFAULT',false,'Age Distribution',false,'pe');

// INSERT INTO
// chartdimension(id,dimension,chartid)
// VALUES
// (1,'dx',1),
// (2,'ou',1),
// (3,'pe',1),
// (4,'dx',2),
// (5,'ou',2),
// (6,'pe',2),
// (7,'dx',3),
// (8,'ou',3),
// (9,'pe',3),
// (10,'dx',4),
// (11,'ou',4),
// (12,'pe',4);

// INSERT INTO
// chartdimensionitem(uid,dimensionitem,displayname,dimensionitemtype,chartdimensionid)
// VALUES
// ('wo7ITisRXeE','wo7ITisRXeE','Employment','INDICATOR',1),
// ('USER ORGUNIT','USER ORGUNIT','USER ORGUNIT', 'ORGANISATIONUNIT',2),
// ('LAST_12_MONTHS','LAST_12_MONTHS','LAST_12_MONTHS','PERIOD',3),
// ('wo7ITisRXeE','wo7ITisRXeE','Retirement','INDICATOR',4),
// ('USER ORGUNIT','USER ORGUNIT','USER ORGUNIT', 'ORGANISATIONUNIT',5),
// ('LAST_12_MONTHS','LAST_12_MONTHS','LAST_12_MONTHS','PERIOD',6),
// ('yKypqIROIO9','yKypqIROIO9','Age Distribution','INDICATOR',7),
// ('USER ORGUNIT','USER ORGUNIT','USER ORGUNIT', 'ORGANISATIONUNIT',8),
// ('LAST_12_MONTHS','LAST_12_MONTHS','LAST_12_MONTHS','PERIOD',9),
// ('yKypqIROIO9','yKypqIROIO9','Age Distribution','INDICATOR',10),
// ('USER ORGUNIT','USER ORGUNIT','USER ORGUNIT', 'ORGANISATIONUNIT',11),
// ('LAST_12_MONTHS','LAST_12_MONTHS','LAST_12_MONTHS','PERIOD',12);
