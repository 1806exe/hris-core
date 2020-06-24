import { MigrationInterface, QueryRunner } from 'typeorm';

export class Visualization1592482888189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const createDashboardTable = `
    CREATE SEQUENCE IF NOT EXISTS dashboard_id_seq;

    CREATE TABLE IF NOT EXISTS public.dashboard
    (
        created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        id bigint NOT NULL DEFAULT nextval('dashboard_id_seq'::regclass),
        uid character(13) COLLATE pg_catalog."default" NOT NULL,
        code character varying(25) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
        name character varying(256) COLLATE pg_catalog."default" NOT NULL,
        description text COLLATE pg_catalog."default",
        lastupdatedby character varying COLLATE pg_catalog."default",
        publicaccess character(8) COLLATE pg_catalog."default",
        externalaccess boolean,
        href text COLLATE pg_catalog."default",
        displayname character varying(256) COLLATE pg_catalog."default" NOT NULL,
        userid bigint,
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

    const createVisualizationTable = `
    CREATE SEQUENCE IF NOT EXISTS visualization_id_seq;

    CREATE TABLE IF NOT EXISTS public.visualization
    (
        created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        id bigint NOT NULL DEFAULT nextval('visualization_id_seq'::regclass),
        uid character(13) COLLATE pg_catalog."default" NOT NULL,
        code character varying(25) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
        name character varying(256) COLLATE pg_catalog."default" NOT NULL,
        description text COLLATE pg_catalog."default",
        lastupdatedby character varying COLLATE pg_catalog."default",
        publicaccess character(8) COLLATE pg_catalog."default",
        externalaccess boolean,
        domainaxislabel character varying(255) COLLATE pg_catalog."default",
        rangeaxislabel character varying(255) COLLATE pg_catalog."default",
        type character varying(40) COLLATE pg_catalog."default" NOT NULL,
        hidelegend boolean,
        nospacebetweencolumns boolean,
        regressiontype character varying(40) COLLATE pg_catalog."default" NOT NULL,
        title character varying(255) COLLATE pg_catalog."default",
        subtitle character varying(255) COLLATE pg_catalog."default",
        hidetitle boolean,
        hidesubtitle boolean,
        targetlinevalue double precision,
        targetlinelabel character varying(255) COLLATE pg_catalog."default",
        baselinevalue double precision,
        baselinelabel character varying(255) COLLATE pg_catalog."default",
        aggregationtype character varying(40) COLLATE pg_catalog."default",
        completedonly boolean,
        showdata boolean,
        hideemptyrowitems character varying(40) COLLATE pg_catalog."default",
        percentstackedvalues boolean,
        cumulativevalues boolean,
        rangeaxismaxvalue double precision,
        rangeaxisminvalue double precision,
        rangeaxissteps integer,
        rangeaxisdecimals integer,
        legenddisplaystrategy character varying(40) COLLATE pg_catalog."default",
        sortorder integer,
        measurecriteria character varying(255) COLLATE pg_catalog."default",
        regression boolean,
        cumulative boolean,
        toplimit integer,
        rowtotals boolean,
        coltotals boolean,
        rowsubtotals boolean,
        colsubtotals boolean,
        hideemptyrows boolean,
        hideemptycolumns boolean,
        digitgroupseparator character varying(40) COLLATE pg_catalog."default",
        displaydensity character varying(40) COLLATE pg_catalog."default",
        fontsize character varying(40) COLLATE pg_catalog."default",
        legenddisplaystyle character varying(40) COLLATE pg_catalog."default",
        numbertype character varying(40) COLLATE pg_catalog."default",
        showhierarchy boolean,
        showdimensionlabels boolean,
        skiprounding boolean,
        longitude double precision,
        latitude double precision,
        zoom integer,
        basemap character varying(255) COLLATE pg_catalog."default",
        userid bigint,
        CONSTRAINT "PK_1918200a782f94386026f94d539" PRIMARY KEY (id),
        CONSTRAINT "UQ_e6da6439709126f066f7874877e" UNIQUE (uid),
        CONSTRAINT "FK_ffbd862e88ef2feec177b5a9011" FOREIGN KEY (userid)
            REFERENCES public."user" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    )

    TABLESPACE pg_default;
    `;

    await queryRunner.query(createVisualizationTable);

    const createVisualizationDimensionTable = `
    CREATE SEQUENCE IF NOT EXISTS visualizationdimension_id_seq;

    CREATE TABLE IF NOT EXISTS public.visualizationdimension
    (
        created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        id bigint NOT NULL DEFAULT nextval('visualizationdimension_id_seq'::regclass),
        uid character(13) COLLATE pg_catalog."default" NOT NULL,
        dimension character varying(5) COLLATE pg_catalog."default" NOT NULL,
        layout character varying(10) COLLATE pg_catalog."default" NOT NULL,
        visualizationid bigint,
        CONSTRAINT "PK_f00c1512e803c7e84fa298b1e06" PRIMARY KEY (id),
        CONSTRAINT "UQ_2f2d36defb8bfba0de43ee7cf6e" UNIQUE (uid),
        CONSTRAINT "FK_97618f4576e2ac6f76fc6b9d260" FOREIGN KEY (visualizationid)
            REFERENCES public.visualization (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    )

    TABLESPACE pg_default;
    `;

    await queryRunner.query(createVisualizationDimensionTable);

    const createVisualizationDimensionItemTable = `
    CREATE SEQUENCE IF NOT EXISTS visualizationdimensionitem_id_seq;

    CREATE TABLE IF NOT EXISTS public.visualizationdimensionitem
    (
        created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        id bigint NOT NULL DEFAULT nextval('visualizationdimensionitem_id_seq'::regclass),
        dimensionitem character(13) COLLATE pg_catalog."default" NOT NULL,
        dimensionitemtype character varying(50) COLLATE pg_catalog."default" NOT NULL,
        visualizationdimensionid bigint,
        CONSTRAINT "PK_9a3b68597616e6d1bb115b389f2" PRIMARY KEY (id),
        CONSTRAINT "FK_7f1797678b81484632f65a7afca" FOREIGN KEY (visualizationdimensionid)
            REFERENCES public.visualizationdimension (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    )

    TABLESPACE pg_default;
    `;

    await queryRunner.query(createVisualizationDimensionItemTable);

    const createDashboardItemTable = `
    CREATE SEQUENCE IF NOT EXISTS dashboarditem_id_seq;

    CREATE TABLE public.dashboarditem
    (
        created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
        id bigint NOT NULL DEFAULT nextval('dashboarditem_id_seq'::regclass),
        uid character(13) COLLATE pg_catalog."default" NOT NULL,
        code character varying(25) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
        lastupdatedby character varying COLLATE pg_catalog."default",
        publicaccess character(8) COLLATE pg_catalog."default",
        externalaccess boolean,
        appkey character varying(255) COLLATE pg_catalog."default",
        shape character varying(50) COLLATE pg_catalog."default",
        x integer,
        y integer,
        height integer,
        width integer,
        type character varying(50) COLLATE pg_catalog."default",
        dashboardid bigint,
        visualizationid bigint,
        CONSTRAINT "PK_67334f4a46e4b156982eebb2dc4" PRIMARY KEY (id),
        CONSTRAINT "UQ_68394f9b2c87727e2dd06ea8029" UNIQUE (uid),
        CONSTRAINT "FK_1f928172b909a9c9df65c380c11" FOREIGN KEY (dashboardid)
            REFERENCES public.dashboard (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION,
        CONSTRAINT "FK_e7656c9d97a310c9c6691b9660e" FOREIGN KEY (visualizationid)
            REFERENCES public.visualization (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    )

    TABLESPACE pg_default;
`;
    await queryRunner.query(createDashboardItemTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
