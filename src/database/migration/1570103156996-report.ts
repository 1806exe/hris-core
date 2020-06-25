import { MigrationInterface, QueryRunner } from 'typeorm';

export class report1570103156996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let Report = await queryRunner.getTable('hris_report');

    if (Report) {
      await queryRunner.query('ALTER TABLE "hris_report" RENAME TO "report"');
      await queryRunner.query(
        'ALTER TABLE "report" RENAME COLUMN "datecreated" TO "created"',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "lastupdated" timestamp without time zone',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "name" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "uid" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "parameters" jsonb',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "createdby" text',
      );

      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "type" character varying(256)',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "uri" text',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "html" text',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "userid" integer',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "lastupdatedby" character varying',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "publicaccess" character varying(8)',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "externalaccess" boolean',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "code" text',
      );
      await queryRunner.query(
        'ALTER TABLE "report" ADD COLUMN IF NOT EXISTS "description" text',
      );
  
      await queryRunner.query('UPDATE "report" SET uid=uid()');
      await queryRunner.query(' ALTER TABLE "report" OWNER TO "postgres"');
      await queryRunner.query(
        'CREATE SEQUENCE report_id_seq AS BIGINT OWNED BY report.id',
      );
      await queryRunner.query(
        `ALTER TABLE report ALTER COLUMN  id SET DEFAULT nextval('report_id_seq')`,
      );
      await queryRunner.query(
        'ALTER TABLE report ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP',
      );

      await queryRunner.query(`
            CREATE TABLE public."reportgroup"
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
                CONSTRAINT "PK_f82c48f7f4d897a53a2f2255e7f" PRIMARY KEY (id)
            )

            TABLESPACE pg_default;

          ALTER TABLE public."reportgroup"
          OWNER to postgres;

          CREATE SEQUENCE reportgroup_id_seq AS BIGINT OWNED BY reportgroup.id;
          ALTER TABLE public."reportgroup" ALTER COLUMN id SET DEFAULT nextval('reportgroup_id_seq');

      `);

      await queryRunner.query(`
          CREATE TABLE public.reportgroupmembers
          (
              "reportgroupId" integer NOT NULL,
              "reportId" integer NOT NULL,
              CONSTRAINT "PK_ccbf0e9ff27c065da0997ffe71a" PRIMARY KEY ("reportgroupId", "reportId"),
              CONSTRAINT "FK_3d77f41fe60918e43eb1d9d706b" FOREIGN KEY ("reportgroupId")
                  REFERENCES public."reportgroup" (id) MATCH SIMPLE
                  ON UPDATE NO ACTION
                  ON DELETE CASCADE,
              CONSTRAINT "FK_df981dc4ca8fb4dcff049975fe3" FOREIGN KEY ("reportId")
                  REFERENCES public.report (id) MATCH SIMPLE
                  ON UPDATE NO ACTION
                  ON DELETE CASCADE
          )
          
          TABLESPACE pg_default;
          
          ALTER TABLE public.reportgroupmembers
              OWNER to postgres;
          ALTER TABLE report ALTER COLUMN uri DROP NOT NULL;
          ALTER TABLE report ALTER COLUMN parameters DROP NOT NULL;


          
          CREATE INDEX "IDX_3d77f41fe60918e43eb1d9d706"
              ON public.reportgroupmembers USING btree
              ("reportgroupId" ASC NULLS LAST)
              TABLESPACE pg_default;
          
          CREATE INDEX "IDX_df981dc4ca8fb4dcff049975fe"
              ON public.reportgroupmembers USING btree
              ("reportId" ASC NULLS LAST)
              TABLESPACE pg_default;
      `);

      await queryRunner.query(`INSERT INTO report(uid, name,  uri, parameters, type, html)
        VALUES (uid(), 'Completeness Report', '/reports/organisationunit/completeness/generate/redirect', '{"ou":true,"pe":false}', 'html', '<table
          class="records_list dataTable table table-striped table-bordered table-hover no-footer"
          cellpadding="0"
          cellspacing="0"
          border="0"
          id="DataTables_Table_0"
          role="grid"
          aria-describedby="DataTables_Table_0_info"
          style="width: 939px;"
        >
          <thead>
            <tr role="row">
              <th
                rowspan="2"
                class="sorting_asc"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                colspan="1"
                aria-sort="ascending"
                aria-label="Sn: activate to sort column ascending"
                style="width: 24px;"
              >
                Sn
              </th>
              <th
                rowspan="2"
                class="sorting"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                colspan="1"
                aria-label="Organisationunit: activate to sort column ascending"
                style="width: 518px;"
              >
                Organisationunit
              </th>
              <th colspan="3" rowspan="1">Sponsorship Application Form</th>
            </tr>
        
            <tr role="row">
              <th
                class="sorting"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-label="Entered Records: activate to sort column ascending"
                style="width: 113px;"
              >
                Entered Records
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-label="Expected Records: activate to sort column ascending"
                style="width: 123px;"
              >
                Expected Records
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="DataTables_Table_0"
                rowspan="1"
                colspan="1"
                aria-label="Percentage: activate to sort column ascending"
                style="width: 76px;"
              >
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            <tr role="row" class="odd">
              <td class="sorting_1">1</td>
              <td>
                <a
                  href="/reports/organisationunit/completeness/generate/redirect?organisationunit=9272&amp;forms=9"
                >
                  Regions &gt; Geita Region
                </a>
              </td>
              <td>0</td>
              <td class="dblclick" id="id_9272_9" title="Doubleclick to edit...">-</td>
              <td>-</td>
            </tr>
            <tr role="row" class="even">
              <td class="sorting_1">2</td>
              <td>
                <a
                  href="/reports/organisationunit/completeness/generate/redirect?organisationunit=12464&amp;forms=9"
                >
                  Referral Hospitals &gt; Bugando Referral Hospital
                </a>
              </td>
              <td>0</td>
              <td class="dblclick" id="id_12464_9" title="Doubleclick to edit...">-</td>
              <td>-</td>
            </tr>
            <tr role="row" class="odd">
              <td class="sorting_1">3</td>
              <td>
                <a
                  href="/reports/organisationunit/completeness/generate/redirect?organisationunit=12462&amp;forms=9"
                >
                  Referral Hospitals &gt; Mbeya Referral Hospital
                </a>
              </td>
              <td>0</td>
              <td class="dblclick" id="id_12462_9" title="Doubleclick to edit...">-</td>
              <td>-</td>
            </tr>
            <tr role="row" class="even">
              <td class="sorting_1">4</td>
              <td>
                <a
                  href="/reports/organisationunit/completeness/generate/redirect?organisationunit=12605&amp;forms=9"
                >
                  Health Training Institutions &gt; Newala Son
                </a>
              </td>
              <td>0</td>
              <td class="dblclick" id="id_12605_9" title="Doubleclick to edit...">-</td>
              <td>-</td>
            </tr>
            <tr role="row" class="odd">
              <td class="sorting_1">5</td>
              <td>
                <a
                  href="/reports/organisationunit/completeness/generate/redirect?organisationunit=13979&amp;forms=9"
                >
                  Regions &gt; Songwe Region
                </a>
              </td>
              <td>0</td>
              <td class="dblclick" id="id_13979_9" title="Doubleclick to edit...">-</td>
              <td>-</td>
            </tr>
            <tr role="row" class="even">
              <td class="sorting_1">6</td>
              <td>
                <a
                  href="/reports/organisationunit/completeness/generate/redirect?organisationunit=12560&amp;forms=9"
                >
                  Health Training Institutions &gt; Kcmc So Mo Radiology
                </a>
              </td>
              <td>0</td>
              <td class="dblclick" id="id_12560_9" title="Doubleclick to edit...">-</td>
              <td>-</td>
            </tr>
            <tr role="row" class="odd">
              <td class="sorting_1">7</td>
              <td>
                <a
                  href="/reports/organisationunit/completeness/generate/redirect?organisationunit=12630&amp;forms=9"
                >
                  Health Training Institutions &gt; Vctc -muheza
                </a>
              </td>
              <td>0</td>
              <td class="dblclick" id="id_12630_9" title="Doubleclick to edit...">-</td>
              <td>-</td>
            </tr>
            <tr role="row" class="even">
              <td class="sorting_1">8</td>
              <td>
                <a
                  href="/reports/organisationunit/completeness/generate/redirect?organisationunit=12686&amp;forms=9"
                >
                  Referral Hospitals &gt; Kibong''oto Tb Hospital
                </a>
              </td>
              <td>0</td>
              <td class="dblclick" id="id_12686_9" title="Doubleclick to edit...">-</td>
              <td>-</td>
            </tr>
            <tr role="row" class="odd">
              <td class="sorting_1">9</td>
              <td>
                <a
                  href="/reports/organisationunit/completeness/generate/redirect?organisationunit=14186&amp;forms=9"
                >
                  MOHCDGEC Departments &gt; Pharmacy Department
                </a>
              </td>
              <td>0</td>
              <td class="dblclick" id="id_14186_9" title="Doubleclick to edit...">-</td>
              <td>-</td>
            </tr>
            <tr role="row" class="even">
              <td class="sorting_1">10</td>
              <td>
                <a
                  href="/reports/organisationunit/completeness/generate/redirect?organisationunit=14189&amp;forms=9"
                >
                  MOHCDGEC Agencies &gt; National Aids Control Program
                </a>
              </td>
              <td>0</td>
              <td class="dblclick" id="id_14189_9" title="Doubleclick to edit...">-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
        ')
        
        `);

      await queryRunner.query(`INSERT INTO report(uid, name, uri, parameters, type, html)
        VALUES (uid(), 'Orgunit By Groupset', '/reports/organisationunit/groupset/organisationunitgroup', '{"ou":true,"pe":false}', 'html', '<table
        class="records_list dataTable table table-striped table-bordered table-hover no-footer"
        cellpadding="0"
        cellspacing="0"
        border="0"
        id="DataTables_Table_0"
        role="grid"
        aria-describedby="DataTables_Table_0_info"
      >
        <thead>
          <tr role="row">
            <th
              class="sorting_asc"
              tabindex="0"
              aria-controls="DataTables_Table_0"
              rowspan="1"
              colspan="1"
              aria-sort="ascending"
              aria-label="No.: activate to sort column ascending"
              style="width: 97px;"
            >
              No.
            </th>
            <th
              class="sorting"
              tabindex="0"
              aria-controls="DataTables_Table_0"
              rowspan="1"
              colspan="1"
              aria-label="Organisationunit Group: activate to sort column ascending"
              style="width: 482px;"
            >
              Organisationunit Group
            </th>
            <th
              class="sorting"
              tabindex="0"
              aria-controls="DataTables_Table_0"
              rowspan="1"
              colspan="1"
              aria-label="Total Facilities: activate to sort column ascending"
              style="width: 309px;"
            >
              Total Facilities
            </th>
          </tr>
        </thead>
        <tbody>
          <tr role="row" class="odd">
            <td class="sorting_1">1</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=7"
                >Army</a
              >
            </td>
            <td>139</td>
          </tr>
          <tr role="row" class="even">
            <td class="sorting_1">2</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=6"
                >Faith Based Facilities</a
              >
            </td>
            <td>934</td>
          </tr>
          <tr role="row" class="odd">
            <td class="sorting_1">3</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=8"
                >Institution</a
              >
            </td>
            <td>112</td>
          </tr>
          <tr role="row" class="even">
            <td class="sorting_1">4</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=4"
                >Private Facilities</a
              >
            </td>
            <td>1141</td>
          </tr>
          <tr role="row" class="odd">
            <td class="sorting_1">5</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=5"
                >Public Facilities</a
              >
            </td>
            <td>5404</td>
          </tr>
          <tr role="row" class="even">
            <td class="sorting_1">6</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=15"
                >Public Administration</a
              >
            </td>
            <td>155</td>
          </tr>
          <tr role="row" class="odd">
            <td class="sorting_1">7</td>
            <td>Total Count</td>
            <td>7885</td>
          </tr>
        </tbody>
      </table>'
	)  
        `);

      await queryRunner.query(`INSERT INTO report(uid, name, uri, parameters, type, html)
        VALUES (uid(), 'Orgunit By Groupset', '/reports/organisationunit/groupset/organisationunitgroup', '{"ou":true,"pe":false}', 'html', '<table
        class="records_list dataTable table table-striped table-bordered table-hover no-footer"
        cellpadding="0"
        cellspacing="0"
        border="0"
        id="DataTables_Table_0"
        role="grid"
        aria-describedby="DataTables_Table_0_info"
      >
        <thead>
          <tr role="row">
            <th
              class="sorting_asc"
              tabindex="0"
              aria-controls="DataTables_Table_0"
              rowspan="1"
              colspan="1"
              aria-sort="ascending"
              aria-label="No.: activate to sort column ascending"
              style="width: 97px;"
            >
              No.
            </th>
            <th
              class="sorting"
              tabindex="0"
              aria-controls="DataTables_Table_0"
              rowspan="1"
              colspan="1"
              aria-label="Organisationunit Group: activate to sort column ascending"
              style="width: 482px;"
            >
              Organisationunit Group
            </th>
            <th
              class="sorting"
              tabindex="0"
              aria-controls="DataTables_Table_0"
              rowspan="1"
              colspan="1"
              aria-label="Total Facilities: activate to sort column ascending"
              style="width: 309px;"
            >
              Total Facilities
            </th>
          </tr>
        </thead>
        <tbody>
          <tr role="row" class="odd">
            <td class="sorting_1">1</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=7"
                >Army</a
              >
            </td>
            <td>139</td>
          </tr>
          <tr role="row" class="even">
            <td class="sorting_1">2</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=6"
                >Faith Based Facilities</a
              >
            </td>
            <td>934</td>
          </tr>
          <tr role="row" class="odd">
            <td class="sorting_1">3</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=8"
                >Institution</a
              >
            </td>
            <td>112</td>
          </tr>
          <tr role="row" class="even">
            <td class="sorting_1">4</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=4"
                >Private Facilities</a
              >
            </td>
            <td>1141</td>
          </tr>
          <tr role="row" class="odd">
            <td class="sorting_1">5</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=5"
                >Public Facilities</a
              >
            </td>
            <td>5404</td>
          </tr>
          <tr role="row" class="even">
            <td class="sorting_1">6</td>
            <td>
              <a
                href="/reports/organisationunit/groupset/organisationunitgroup?organisationunit=1156&amp;organisationunitGroup=15"
                >Public Administration</a
              >
            </td>
            <td>155</td>
          </tr>
          <tr role="row" class="odd">
            <td class="sorting_1">7</td>
            <td>Total Count</td>
            <td>7885</td>
          </tr>
        </tbody>
      </table>'
	)  
        `);

      await queryRunner.query(`INSERT INTO report(uid, name, uri, parameters, type, html)
      VALUES (uid(), 'Orgunit By Levels ', '/reports/organisationunit/levels/', '{"ou":true,"pe":false}', 'html', '<table
      class="records_list dataTable table table-striped table-bordered table-hover"
      cellpadding="0"
      cellspacing="0"
      border="0"
      id="DataTables_Table_0"
    >
      <thead>
        <tr>
          <th>No.</th>
          <th>Regions/Departments/Institutions/Referrals</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Ocean Road Cancer Institute</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid3147"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid3147" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Muhimbili Orthpeadic Institute</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid12485"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid12485" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Muhimbili National Hospital</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid13336"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid13336" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>Mirembe Referral Hospital</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid3111"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid3111" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>Mbeya Referral Hospital</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid12462"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid12462" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>6</td>
          <td>Kibong''oto Tb Hospital</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid12686"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid12686" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>7</td>
          <td>Kcmc Referal Hospital</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid12484"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid12484" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>8</td>
          <td>Jakaya Kikwete Cardiac Institute</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid14188"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid14188" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>9</td>
          <td>Ccbrt Hospital</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid3029"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid3029" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>10</td>
          <td>Bugando Referral Hospital</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid12464"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid12464" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>11</td>
          <td>Benjamin Mkapa Referral Hospital</td>
          <td>
            <div class="radio">
              <label
                ><input
                  type="radio"
                  name="activeid14187"
                  value=""
                  checked="checked"
                />Active</label
              >
              <label
                ><input type="radio" name="activeid14187" value="" />Inacitve</label
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>'
  )  
        `);

      await queryRunner.query(`INSERT INTO report(uid, name, uri, parameters, type, html)

      VALUES (uid(), 'Records Report ', '/reports/employeerecords/', '{"ou":true,"pe":false}', 'html', '<table
      class="records_list dataTable table table-striped table-bordered table-hover no-footer"
      cellpadding="0"
      cellspacing="0"
      border="0"
      id="DataTables_Table_0"
      role="grid"
      aria-describedby="DataTables_Table_0_info"
      style="width: 1375px;"
    >
      <thead>
        <tr role="row">
          <th
            class="sorting ui-state-default sorting_asc"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-sort="ascending"
            aria-label="No.: activate to sort column ascending"
            style="width: 24px;"
          >
            <div class="DataTables_sort_wrapper">
              No.<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-triangle-1-n"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="First Name: activate to sort column ascending"
            style="width: 94px;"
          >
            <div class="DataTables_sort_wrapper">
              First Name<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Middle Name: activate to sort column ascending"
            style="width: 115px;"
          >
            <div class="DataTables_sort_wrapper">
              Middle Name<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Surname: activate to sort column ascending"
            style="width: 74px;"
          >
            <div class="DataTables_sort_wrapper">
              Surname<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Profession Education Level: activate to sort column ascending"
            style="width: 73px;"
          >
            <div class="DataTables_sort_wrapper">
              Profession Education Level<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Basic Education Level: activate to sort column ascending"
            style="width: 68px;"
          >
            <div class="DataTables_sort_wrapper">
              Basic Education Level<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Age: activate to sort column ascending"
            style="width: 27px;"
          >
            <div class="DataTables_sort_wrapper">
              Age<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Profession: activate to sort column ascending"
            style="width: 78px;"
          >
            <div class="DataTables_sort_wrapper">
              Profession<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Present Designation: activate to sort column ascending"
            style="width: 90px;"
          >
            <div class="DataTables_sort_wrapper">
              Present Designation<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Employment Status: activate to sort column ascending"
            style="width: 85px;"
          >
            <div class="DataTables_sort_wrapper">
              Employment Status<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Check Number: activate to sort column ascending"
            style="width: 102px;"
          >
            <div class="DataTables_sort_wrapper">
              Check Number<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Employment Duration: activate to sort column ascending"
            style="width: 85px;"
          >
            <div class="DataTables_sort_wrapper">
              Employment Duration<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Retirement Date: activate to sort column ascending"
            style="width: 74px;"
          >
            <div class="DataTables_sort_wrapper">
              Retirement Date<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Last Updated: activate to sort column ascending"
            style="width: 71px;"
          >
            <div class="DataTables_sort_wrapper">
              Last Updated<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
          <th
            class="sorting ui-state-default"
            tabindex="0"
            aria-controls="DataTables_Table_0"
            rowspan="1"
            colspan="1"
            aria-label="Duty Post: activate to sort column ascending"
            style="width: 60px;"
          >
            <div class="DataTables_sort_wrapper">
              Duty Post<span
                class="DataTables_sort_icon css_right ui-icon ui-icon-carat-2-n-s"
              ></span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr id="0703a7298f8ff70c8856d12e38209219" role="row" class="odd">
          <td class="sorting_1">1</td>
          <td>Abdallah</td>
          <td>Shabani</td>
          <td>Mshangama</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>31</td>
          <td>Assistant Health Laboratory Technologist</td>
          <td>Assistant Laboratory Technologist</td>
          <td>On Duty</td>
          <td>3694260739</td>
          <td>5y0m</td>
          <td>2048-12-12</td>
          <td>26/06/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="625e4e504598b06da3efcee5411db60c" role="row" class="even">
          <td class="sorting_1">2</td>
          <td>Abella</td>
          <td>Laurian</td>
          <td>Bubelwa</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>31</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>111350015</td>
          <td>5y7m</td>
          <td>2048-09-11</td>
          <td>08/12/2016</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="0bb3a78bce18b4778d7dac3c92377e2f" role="row" class="odd">
          <td class="sorting_1">3</td>
          <td>Abinusi</td>
          <td>Kazweba</td>
          <td>Juma</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>26</td>
          <td>Nurse</td>
          <td>Nurse II</td>
          <td>On Duty</td>
          <td>111382086</td>
          <td>5y6m</td>
          <td>2053-12-29</td>
          <td>04/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="c34dd978b9c580149e1839416fce6e6e" role="row" class="even">
          <td class="sorting_1">4</td>
          <td>ADAM</td>
          <td>FRANCIS</td>
          <td>MBANGA</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>2</td>
          <td>Medical Officer</td>
          <td>Medical Doctor II</td>
          <td>On Duty</td>
          <td>111934595</td>
          <td>2y8m</td>
          <td>2077-08-21</td>
          <td>03/07/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="93a0b8af57741c83a6e21ffb3202773b" role="row" class="odd">
          <td class="sorting_1">5</td>
          <td>Adelhelma</td>
          <td>Menas</td>
          <td>Mwiga</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>35</td>
          <td>Nurse</td>
          <td>Nurse II</td>
          <td>On Duty</td>
          <td>110800967</td>
          <td>7y6m</td>
          <td>2044-01-31</td>
          <td>30/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="59c124531f505adb2b8a7fdcf5c2858e" role="row" class="even">
          <td class="sorting_1">6</td>
          <td>Adrienne</td>
          <td>Atieno</td>
          <td>Oringo</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>35</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer I</td>
          <td>On Duty</td>
          <td>11424572</td>
          <td>11y1m</td>
          <td>2044-04-08</td>
          <td>03/11/2014</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="2f31f9c8fa39dd28886b9fa54e595c3b" role="row" class="odd">
          <td class="sorting_1">7</td>
          <td>ADRIENNE</td>
          <td>ATIENO</td>
          <td>ORINGO</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>36</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer II</td>
          <td>On Duty</td>
          <td>11424572</td>
          <td>11y1m</td>
          <td>2043-04-13</td>
          <td>02/02/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="eb73d98631eacbccc2d8f8c8c62c5670" role="row" class="even">
          <td class="sorting_1">8</td>
          <td>AGNES</td>
          <td>J</td>
          <td>MINDE</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>27</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111307395</td>
          <td>5y9m</td>
          <td>2052-11-15</td>
          <td>30/05/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="a6d3b00d853d60ecebf3b49bdf967f0d" role="row" class="odd">
          <td class="sorting_1">9</td>
          <td>ALI</td>
          <td>KHAMIS</td>
          <td>ALI</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>31</td>
          <td>Dental Therapist</td>
          <td>Dental Therapist I</td>
          <td>On Duty</td>
          <td>111352221</td>
          <td>5y7m</td>
          <td>2049-01-02</td>
          <td>07/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="fc50f739e06a8e6a3207c13270c9fd78" role="row" class="even">
          <td class="sorting_1">10</td>
          <td>Ally</td>
          <td>Said</td>
          <td>Mohily</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>56</td>
          <td>Environmental Health Officer</td>
          <td>Senior Assistant Environmental Health Officer</td>
          <td>On Duty</td>
          <td>7809497</td>
          <td>31y6m</td>
          <td>2023-05-02</td>
          <td>04/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="0a3e4288c2508447346d04ac98d28c9f" role="row" class="odd">
          <td class="sorting_1">11</td>
          <td>Ally</td>
          <td>Babu</td>
          <td>Makwana</td>
          <td>Advance Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>50</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Senior Assistant Environmental Health Officer</td>
          <td>On Duty</td>
          <td>9682519</td>
          <td>17y8m</td>
          <td>2029-07-19</td>
          <td>03/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="3f74fcfa1ecac4de14761e3e6f0a69ea" role="row" class="even">
          <td class="sorting_1">12</td>
          <td>AMINA</td>
          <td>SELEMANI</td>
          <td>SEIF</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>43</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>10905586</td>
          <td>12y9m</td>
          <td>2036-10-22</td>
          <td>18/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="be1a6fac7533c64397ae8cedd1e61f8b" role="row" class="odd">
          <td class="sorting_1">13</td>
          <td>Amiry</td>
          <td>Ramadhani</td>
          <td>Bajah</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>47</td>
          <td>Pharmacist</td>
          <td>Pharmacist I</td>
          <td>On Duty</td>
          <td>10713727</td>
          <td>13y6m</td>
          <td>2032-09-22</td>
          <td>18/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="a1c5f9fa65342e886b6f8556a0547743" role="row" class="even">
          <td class="sorting_1">14</td>
          <td>Amos</td>
          <td>Gideon</td>
          <td>Gamaya</td>
          <td>Advance Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>40</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>11975993</td>
          <td>9y3m</td>
          <td>2039-05-24</td>
          <td>03/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="28ca614921ede68bb174508220ad49a7" role="row" class="odd">
          <td class="sorting_1">15</td>
          <td>Angel</td>
          <td>Antony</td>
          <td>Mkoka</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>34</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Study Leave</td>
          <td>110711183</td>
          <td>7y10m</td>
          <td>2046-01-23</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="85cb97008ae0500c5e13bfa88ee9a46a" role="row" class="even">
          <td class="sorting_1">16</td>
          <td>Anna</td>
          <td>Peter</td>
          <td>Kiritha</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>28</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>111684673</td>
          <td>4y9m</td>
          <td>2051-12-25</td>
          <td>19/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="6d5d409e6020de596b17bf036ffbd730" role="row" class="odd">
          <td class="sorting_1">17</td>
          <td>ANNA</td>
          <td>ISAYA</td>
          <td>KATAIMALA</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>31</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>111712593</td>
          <td>4y11m</td>
          <td>2048-07-19</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="228cbbe5b34f8f4c8d9d4d5ea5964013" role="row" class="even">
          <td class="sorting_1">18</td>
          <td>Asha</td>
          <td>Fadhili</td>
          <td>Mungi</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>48</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Senior Assistant Environmental Health Officer</td>
          <td>On Duty</td>
          <td>7350221</td>
          <td>32y3m</td>
          <td>2031-06-25</td>
          <td>28/11/2013</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="15ccdee600de78511b4a8ca750cbb625" role="row" class="odd">
          <td class="sorting_1">19</td>
          <td>ASUMPTER</td>
          <td>ANGELO</td>
          <td>NKWERA</td>
          <td>Bachelor Degree</td>
          <td>Ordinary Secondary Education</td>
          <td>34</td>
          <td>Social Welfare Officer</td>
          <td>Social Welfare Officer II</td>
          <td>On Duty</td>
          <td>111384411</td>
          <td>5y6m</td>
          <td>2045-12-23</td>
          <td>30/05/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="b4517f179a644a2b2a1c5b8e3628321e" role="row" class="even">
          <td class="sorting_1">20</td>
          <td>Athumani</td>
          <td>Hassan</td>
          <td>Zanangwa</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>41</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer I</td>
          <td>On Duty</td>
          <td>11495299</td>
          <td>10y10m</td>
          <td>2038-12-31</td>
          <td>11/10/2016</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="1e79a878edb10a2fa83c05d12b533b3a" role="row" class="odd">
          <td class="sorting_1">21</td>
          <td>Azizi</td>
          <td>Juma</td>
          <td>Mkote</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>51</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>8836072</td>
          <td>26y9m</td>
          <td>2028-08-27</td>
          <td>23/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="ca7520002c51b0cdac2ff41038cc414e" role="row" class="even">
          <td class="sorting_1">22</td>
          <td>Azmina</td>
          <td>Nathoo</td>
          <td>Abdulkarim</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>31</td>
          <td>Health Laboratory Technologist</td>
          <td>Laboratory Technologist II</td>
          <td>On Duty</td>
          <td>00000O</td>
          <td>5y7m</td>
          <td>2048-03-11</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="584e5c6762bbb8663275a54a4bed8e10" role="row" class="odd">
          <td class="sorting_1">23</td>
          <td>Bakari</td>
          <td>Ally</td>
          <td>Mhina</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>62</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>2458624359629</td>
          <td>37y7m</td>
          <td>2017-03-12</td>
          <td>18/11/2016</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="e88be56fdf383576c2f5eb74034360ad" role="row" class="even">
          <td class="sorting_1">24</td>
          <td>Beatrice</td>
          <td>Pastory</td>
          <td>Ihangwe</td>
          <td>Certificate</td>
          <td>Primary Education</td>
          <td>57</td>
          <td>Nurse</td>
          <td>Senior Nurse</td>
          <td>On Duty</td>
          <td>5638183</td>
          <td>38y5m</td>
          <td>2022-05-21</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="c7dc8595c5bde26e1f6ea941c54dd65b" role="row" class="odd">
          <td class="sorting_1">25</td>
          <td>Benedicta</td>
          <td>Mathayo</td>
          <td>Bengesi</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>51</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>7277746</td>
          <td>32y2m</td>
          <td>2028-07-14</td>
          <td>18/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="3951f3cc180bd1fb236332b84dcbe3d4" role="row" class="even">
          <td class="sorting_1">26</td>
          <td>Bernadeta</td>
          <td>Armogast</td>
          <td>Laswai</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>55</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>6988184</td>
          <td>34y3m</td>
          <td>2024-05-26</td>
          <td>18/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="813bf37a2f36aac08a6558158c7fd2ab" role="row" class="odd">
          <td class="sorting_1">27</td>
          <td>BERNANDO</td>
          <td>LEONARDI</td>
          <td>MSHANA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>2</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>000000</td>
          <td>2y1m</td>
          <td>2077-02-13</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="e9321bd149a6f23732d4e71bad8dcc4b" role="row" class="even">
          <td class="sorting_1">28</td>
          <td>Bryceson</td>
          <td>Zablon</td>
          <td>Shoo</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>51</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>8888543</td>
          <td>26y4m</td>
          <td>2028-02-08</td>
          <td>18/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="5ea0d7b9cdccfd4e14275e300cc464d1" role="row" class="odd">
          <td class="sorting_1">29</td>
          <td>BRYCESON</td>
          <td>ZABRON</td>
          <td>SHOO</td>
          <td>Advance Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>51</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>8888543</td>
          <td>26y4m</td>
          <td>2028-02-07</td>
          <td>15/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="dc2779aae8a02400a44bddd6acd9aca5" role="row" class="even">
          <td class="sorting_1">30</td>
          <td>CECILIA</td>
          <td>JOSEPH</td>
          <td>MBELE</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>44</td>
          <td>Medical Attendant</td>
          <td>Senior Medical Attendant</td>
          <td>On Duty</td>
          <td>110568482</td>
          <td>8y1m</td>
          <td>2035-05-24</td>
          <td>07/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="f6c12cdd54e4f0c22800d00480256fd5" role="row" class="odd">
          <td class="sorting_1">31</td>
          <td>Charles</td>
          <td>Magoge</td>
          <td>Wambura</td>
          <td>Advance Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>52</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Principal Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>8967639</td>
          <td>25y5m</td>
          <td>2027-09-02</td>
          <td>03/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="fbd23e930c6c7dbf7a47e8220a2e3712" role="row" class="even">
          <td class="sorting_1">32</td>
          <td>CHEMERE</td>
          <td>JOHN</td>
          <td>SIRIRA</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>36</td>
          <td>Medical Doctor</td>
          <td>Medical Doctor I</td>
          <td>On Duty</td>
          <td>111288736</td>
          <td>5y8m</td>
          <td>2043-07-10</td>
          <td>07/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="5d161579e92cca42539038edfe54a98e" role="row" class="odd">
          <td class="sorting_1">33</td>
          <td>Conjesta</td>
          <td>Barongereje</td>
          <td>Obeid</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>30</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>12345678</td>
          <td>8y9m</td>
          <td>2049-10-16</td>
          <td>24/06/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="0f1d895c997a558ee27ea9e54bd6daee" role="row" class="even">
          <td class="sorting_1">34</td>
          <td>Dativa</td>
          <td>Melkiory</td>
          <td>Mahembe</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>31</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111310374</td>
          <td>5y8m</td>
          <td>2048-07-13</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="ddc311912b5b7028fb849e6973234cd8" role="row" class="odd">
          <td class="sorting_1">35</td>
          <td>DAVID</td>
          <td>RICHARD</td>
          <td>TARIMO</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>42</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer I</td>
          <td>On Duty</td>
          <td>110372935</td>
          <td>7y9m</td>
          <td>2037-12-28</td>
          <td>26/03/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="3c768a6f374a9a97042fb95583e0ae03" role="row" class="even">
          <td class="sorting_1">36</td>
          <td>DOMINICUS</td>
          <td>ELIAS</td>
          <td>KABOGO</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>33</td>
          <td>Dental Technologist</td>
          <td>Dental Technologist II</td>
          <td>On Duty</td>
          <td>11993991</td>
          <td>9y9m</td>
          <td>2046-06-10</td>
          <td>09/07/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="970a5c7e65deec238ec57f4e82ce3d00" role="row" class="odd">
          <td class="sorting_1">37</td>
          <td>DORAH</td>
          <td>JULIUS</td>
          <td>MINJA</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>47</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>12001194</td>
          <td>9y8m</td>
          <td>2032-01-28</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="1801a256fd1a3f529e7688fa194910f4" role="row" class="even">
          <td class="sorting_1">38</td>
          <td>Dorosia</td>
          <td>Samwel</td>
          <td>Mtanga</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>53</td>
          <td>Assistant Nursing Officer</td>
          <td>Senior Assistant Nursing Officer</td>
          <td>On Duty</td>
          <td>8938415</td>
          <td>27y6m</td>
          <td>2026-10-19</td>
          <td>10/07/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="4d22bc99e0bd09624227dc5d303e8a86" role="row" class="odd">
          <td class="sorting_1">39</td>
          <td>DROSTA</td>
          <td>ELIAS</td>
          <td>TIBAIJUKA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>47</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>10714090</td>
          <td>13y8m</td>
          <td>2032-08-01</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="c00883cbf4a482f9317dfbeb78d4e5a4" role="row" class="even">
          <td class="sorting_1">40</td>
          <td>EASTER</td>
          <td>WILSON</td>
          <td>GWILLA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>25</td>
          <td>Assistant Nursing Officer</td>
          <td>Accountant I</td>
          <td>On Duty</td>
          <td>111503640</td>
          <td>4y11m</td>
          <td>2054-03-28</td>
          <td>13/07/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="9983f11e2f688b5eaec216fbf9e4eaed" role="row" class="odd">
          <td class="sorting_1">41</td>
          <td>Edgar</td>
          <td>Augustine</td>
          <td>Temba</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>47</td>
          <td>Pharmacist</td>
          <td>Pharmacist II</td>
          <td>On Duty</td>
          <td>11975085</td>
          <td>10y0m</td>
          <td>2032-05-29</td>
          <td>06/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="156abe003c7c662373e7c1ed35cc33ae" role="row" class="even">
          <td class="sorting_1">42</td>
          <td>EDINA</td>
          <td>JULIUS</td>
          <td>RUBOHA</td>
          <td>None</td>
          <td>Ordinary Secondary Education</td>
          <td>34</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>112073776</td>
          <td>1y5m</td>
          <td>2045-11-27</td>
          <td>17/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="1813d82416d7c515fb1a9a14823cb856" role="row" class="odd">
          <td class="sorting_1">43</td>
          <td>Edith</td>
          <td>Martin</td>
          <td>Kijazi</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>55</td>
          <td>Nursing Officer</td>
          <td>Nursing Officer II</td>
          <td>On Duty</td>
          <td>6576017</td>
          <td>29y0m</td>
          <td>2024-02-19</td>
          <td>03/07/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="a325803defe0c80fb314f6ea66c9e6f1" role="row" class="even">
          <td class="sorting_1">44</td>
          <td>Edwin</td>
          <td>Martin</td>
          <td>Muhondezi</td>
          <td>Masters Degree</td>
          <td>Advanced Secondary Education</td>
          <td>41</td>
          <td>Medical Specialist</td>
          <td>Medical Specialist I</td>
          <td>On Duty</td>
          <td>11726368</td>
          <td>10y5m</td>
          <td>2038-09-03</td>
          <td>05/07/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="703e4c6c87076ccf84ab1de8165ebb44" role="row" class="odd">
          <td class="sorting_1">45</td>
          <td>ELIA</td>
          <td>CHRISTOPHER</td>
          <td>MSEMWA</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>30</td>
          <td>Medical Doctor</td>
          <td>Medical Doctor I</td>
          <td>On Duty</td>
          <td>112048510</td>
          <td>1y5m</td>
          <td>2049-05-02</td>
          <td>04/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="c31a3ac5b88616f8d555c535822c9189" role="row" class="even">
          <td class="sorting_1">46</td>
          <td>ELIAC</td>
          <td>CHRISOSTOMUS</td>
          <td>MSEMWA</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>30</td>
          <td>Medical Doctor</td>
          <td>Medical Doctor II</td>
          <td>On Duty</td>
          <td>112048510</td>
          <td>1y5m</td>
          <td>2049-05-02</td>
          <td>12/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="d9ac4d578be4ef8fd20decb6798ceb27" role="row" class="odd">
          <td class="sorting_1">47</td>
          <td>Elisia</td>
          <td>Liwinda</td>
          <td>Mpangala</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>44</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>12278971</td>
          <td>9y2m</td>
          <td>2035-11-19</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="19610f561c4fca1227d82e797febd1fe" role="row" class="even">
          <td class="sorting_1">48</td>
          <td>Eliud</td>
          <td>Christopher</td>
          <td>Kishebuka</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>35</td>
          <td>Health Laboratory Technologist</td>
          <td>Laboratory Technologist I</td>
          <td>On Duty</td>
          <td>2458624359629</td>
          <td>9y1m</td>
          <td>2044-03-22</td>
          <td>01/07/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="39ff0adeb67c0224e55f2519bebd8520" role="row" class="odd">
          <td class="sorting_1">49</td>
          <td>EMANUEL</td>
          <td>L</td>
          <td>GINYIMAN</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>28</td>
          <td>Assistant Nursing Officer</td>
          <td>Assistant Nursing Officer I</td>
          <td>On Duty</td>
          <td>112054675</td>
          <td>1y5m</td>
          <td>2051-12-23</td>
          <td>12/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="b114087e15e9f2d582c9604d10792d29" role="row" class="even">
          <td class="sorting_1">50</td>
          <td>EMILIANA</td>
          <td>JACKSON</td>
          <td>KYOGOLO</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>33</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>111043886</td>
          <td>6y6m</td>
          <td>2046-08-23</td>
          <td>03/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="72f3a8386f7823738aebf25b613631cf" role="row" class="odd">
          <td class="sorting_1">51</td>
          <td>EMILY</td>
          <td></td>
          <td>LIHAWA</td>
          <td>Masters Degree</td>
          <td>Advanced Secondary Education</td>
          <td>47</td>
          <td>Medical Officer</td>
          <td>Principal Medical Doctor I</td>
          <td>On Duty</td>
          <td>12241889</td>
          <td>9y1m</td>
          <td>2032-11-03</td>
          <td>22/03/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="fd79b5f6aed8806580f72663cff50e2d" role="row" class="even">
          <td class="sorting_1">52</td>
          <td>Ester</td>
          <td>Ezekiel</td>
          <td>Manase</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>49</td>
          <td>Nurse</td>
          <td>Nurse II</td>
          <td>On Duty</td>
          <td>110774283</td>
          <td>7y7m</td>
          <td>2030-11-14</td>
          <td>01/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="3aa0ddc785e2501ca98ffc743ecf59e2" role="row" class="odd">
          <td class="sorting_1">53</td>
          <td>Evans</td>
          <td>Marshall</td>
          <td>Magare</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>47</td>
          <td>Pharmaceutical Technologist</td>
          <td>Pharmaceutical Technologist I</td>
          <td>On Duty</td>
          <td>11529189</td>
          <td>10y6m</td>
          <td>2032-08-06</td>
          <td>30/06/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="50316bb8c3727c9823e0a9bab8989d30" role="row" class="even">
          <td class="sorting_1">54</td>
          <td>Fatuma</td>
          <td>Abdallah</td>
          <td>Rajabu</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>35</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>12390535</td>
          <td>8y9m</td>
          <td>2044-09-27</td>
          <td>31/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="57d52bf2c482282bcd0c01cefd7ed5a4" role="row" class="odd">
          <td class="sorting_1">55</td>
          <td>Fausta</td>
          <td>Joseph</td>
          <td>Mgina</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>34</td>
          <td>Assistant Health Laboratory Technologist</td>
          <td>Assistant Laboratory Technologist</td>
          <td>On Duty</td>
          <td>110999115</td>
          <td>6y6m</td>
          <td>2045-11-08</td>
          <td>05/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="659d5670659287fe839890e25d664d63" role="row" class="even">
          <td class="sorting_1">56</td>
          <td>FAUSTER</td>
          <td>JOHN</td>
          <td>MISSAY</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>44</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>111381428</td>
          <td>5y9m</td>
          <td>2035-06-06</td>
          <td>03/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="9c5b3bba23a58c5b4dc6bc2ba98cd482" role="row" class="odd">
          <td class="sorting_1">57</td>
          <td>Felisiana</td>
          <td>Philip</td>
          <td>Urio</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>36</td>
          <td>Medical Attendant</td>
          <td>Senior Medical Attendant</td>
          <td>On Duty</td>
          <td>110523834</td>
          <td>8y6m</td>
          <td>2043-05-19</td>
          <td>03/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="744e5f9368a17866adba2f0cb4924dd5" role="row" class="even">
          <td class="sorting_1">58</td>
          <td>Fidelis</td>
          <td>Shirima</td>
          <td>Silvano</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>38</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>11975661</td>
          <td>9y11m</td>
          <td>2041-11-24</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="e4a87f12a4a27084b7e8ba3daf5a62b6" role="row" class="odd">
          <td class="sorting_1">59</td>
          <td>Flora</td>
          <td>Iswaga</td>
          <td>Magembe</td>
          <td>Bachelor Degree</td>
          <td>Ordinary Secondary Education</td>
          <td>39</td>
          <td>Assistant Nursing Officer</td>
          <td>Assistant Nursing Officer I</td>
          <td>On Duty</td>
          <td>10716038</td>
          <td>13y4m</td>
          <td>2040-03-28</td>
          <td>13/07/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="da6cef8e6a9ac983cf7338dc76c530aa" role="row" class="even">
          <td class="sorting_1">60</td>
          <td>Flora</td>
          <td>Paul</td>
          <td>Mahimbo</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>26</td>
          <td>Nurse</td>
          <td>Nurse II</td>
          <td>On Duty</td>
          <td>111684696</td>
          <td>4y9m</td>
          <td>2053-06-05</td>
          <td>07/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="fd4a9493cf7fe9c5150210ac8334924b" role="row" class="odd">
          <td class="sorting_1">61</td>
          <td>FLORIDA</td>
          <td>JOSEPHATI</td>
          <td>BARUTI</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>34</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>111068166</td>
          <td>6y2m</td>
          <td>2045-09-25</td>
          <td>07/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="988ceacc548eb7460ff2d35ec0e491e2" role="row" class="even">
          <td class="sorting_1">62</td>
          <td>Frank</td>
          <td>Angelo</td>
          <td>Mgatta</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>30</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>111468327</td>
          <td>5y0m</td>
          <td>2049-09-24</td>
          <td>19/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="9b05e1098e478681edf26bbb191cba1b" role="row" class="odd">
          <td class="sorting_1">63</td>
          <td>frida</td>
          <td>Francis</td>
          <td>Mgaya</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>30</td>
          <td>Assistant Nursing Officer</td>
          <td>Assistant Nursing Officer I</td>
          <td>On Duty</td>
          <td>12393052</td>
          <td>8y6m</td>
          <td>2049-02-22</td>
          <td>03/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="91673780640a214b8115cf95c319b07b" role="row" class="even">
          <td class="sorting_1">64</td>
          <td>Gaudensia</td>
          <td>Agrey</td>
          <td>Kukome</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>41</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>11975915</td>
          <td>10y0m</td>
          <td>2038-10-13</td>
          <td>16/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="bb1b9ca2760e34550a300910dd976d1e" role="row" class="odd">
          <td class="sorting_1">65</td>
          <td>Geofrey</td>
          <td>Evodia</td>
          <td>Zenda</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>32</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>111040199</td>
          <td>6y5m</td>
          <td>2047-02-12</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="0db29a2daffb60715141b1f0388d9753" role="row" class="even">
          <td class="sorting_1">66</td>
          <td>GEOPHREY</td>
          <td>EVODIA</td>
          <td>ZENDA</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>32</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111040199</td>
          <td>6y5m</td>
          <td>2047-02-12</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="009e13a017cac3d92c6506729e2bfd93" role="row" class="odd">
          <td class="sorting_1">67</td>
          <td>Gerwalda</td>
          <td>Pilmin</td>
          <td>Mumba</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>52</td>
          <td>Nursing Officer</td>
          <td>Principal Nursing Officer I</td>
          <td>On Duty</td>
          <td>8836212</td>
          <td>26y10m</td>
          <td>2027-08-23</td>
          <td>18/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="0cfb83e67deaa67dbce04c454b63d42e" role="row" class="even">
          <td class="sorting_1">68</td>
          <td>Gilbonce</td>
          <td>Mwakapinga</td>
          <td>Betson</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>40</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer II</td>
          <td>On Leave Without Payment</td>
          <td>11191786</td>
          <td>12y0m</td>
          <td>2039-09-02</td>
          <td>30/06/2016</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="8e9e60b3d6fafc49c985ddde7112fbac" role="row" class="odd">
          <td class="sorting_1">69</td>
          <td>GLORYMARIA</td>
          <td></td>
          <td>KUNAMBI</td>
          <td>Bachelor Degree</td>
          <td>Ordinary Secondary Education</td>
          <td>44</td>
          <td>Medical Officer</td>
          <td>Medical Doctor II</td>
          <td>On Duty</td>
          <td>10751978</td>
          <td>12y6m</td>
          <td>2035-05-15</td>
          <td>22/03/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="2a9770d8e473b30cbf686ce1b5cff65c" role="row" class="even">
          <td class="sorting_1">70</td>
          <td>GODSHA</td>
          <td>JULIUS</td>
          <td>AKWANYA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>33</td>
          <td>Technologist/Technician(Prosthetic)</td>
          <td>Laboratory Technologist II</td>
          <td>On Duty</td>
          <td>000000</td>
          <td>2y0m</td>
          <td>2046-05-26</td>
          <td>02/02/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="8908acb739f38b52f27d2d0253229c9d" role="row" class="odd">
          <td class="sorting_1">71</td>
          <td>Hadija</td>
          <td>Abdallah</td>
          <td>Siogopi</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>48</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>12336052</td>
          <td>8y9m</td>
          <td>2031-12-24</td>
          <td>30/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="57a34128d4ebb30d7857ad655c5b8f92" role="row" class="even">
          <td class="sorting_1">72</td>
          <td>Hadija</td>
          <td>Abdalllah</td>
          <td>Ukasha</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>25</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>111686789</td>
          <td>5y0m</td>
          <td>2054-02-06</td>
          <td>07/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="9f3b72db8a16509c7f385afab0b7341e" role="row" class="odd">
          <td class="sorting_1">73</td>
          <td>Hamis</td>
          <td>Omari</td>
          <td>Kamangu</td>
          <td>Advance Diploma</td>
          <td></td>
          <td>49</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>9164284</td>
          <td>24y0m</td>
          <td>2030-06-30</td>
          <td>28/11/2013</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="6ab203d78efcca9ac93a4e951c315c1a" role="row" class="even">
          <td class="sorting_1">74</td>
          <td>Hamisi</td>
          <td>Saidi</td>
          <td>Mahamba</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>31</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>111310342</td>
          <td>5y8m</td>
          <td>2048-02-04</td>
          <td>19/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="f2e6df0db0bdcd572ead6bdad936db4a" role="row" class="odd">
          <td class="sorting_1">75</td>
          <td>HANCE</td>
          <td>NYIMBO</td>
          <td>MUHANGWA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>40</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>11975890</td>
          <td>4y7m</td>
          <td>2039-12-23</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="3f2885772375082ba9095eb61af4b0f9" role="row" class="even">
          <td class="sorting_1">76</td>
          <td>Hassan</td>
          <td>Petrobas</td>
          <td>Yesaya</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>47</td>
          <td>Assistant Health Laboratory Technologist</td>
          <td>Senior Assistant Laboratory Technologist</td>
          <td>On Duty</td>
          <td>9752036</td>
          <td>18y3m</td>
          <td>2032-11-17</td>
          <td>28/11/2013</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="92c757a71b124c947257b3a76d6aa966" role="row" class="odd">
          <td class="sorting_1">77</td>
          <td>Hawa</td>
          <td>Bakari</td>
          <td>Nimaila</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>47</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>9581759</td>
          <td>18y7m</td>
          <td>2032-11-26</td>
          <td>08/12/2016</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="0ccf38fa265458ed1da3319f3053fc8e" role="row" class="even">
          <td class="sorting_1">78</td>
          <td>HONEST</td>
          <td>GABLIEL</td>
          <td>LYMO</td>
          <td>Advance Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>51</td>
          <td>Assistant Medical Officer</td>
          <td>Assistant Medical Officer I</td>
          <td>On Duty</td>
          <td>10649626</td>
          <td>11y11m</td>
          <td>2028-06-21</td>
          <td>04/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="5d30f9f2f4114874d7748e568af31796" role="row" class="odd">
          <td class="sorting_1">79</td>
          <td>Ibrahim</td>
          <td>Mohamed</td>
          <td>Mzingi</td>
          <td>Advance Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>57</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Principal Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>7216396</td>
          <td>33y7m</td>
          <td>2022-04-15</td>
          <td>06/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="fc0fe6e790f1d17a03ac7bc8830b7165" role="row" class="even">
          <td class="sorting_1">80</td>
          <td>ILUMINATHA</td>
          <td>J</td>
          <td>CLAVERY</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>39</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>10905740</td>
          <td>13y2m</td>
          <td>2040-12-26</td>
          <td>01/09/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="df6c58de55eea8040412c9c5c2290f0a" role="row" class="odd">
          <td class="sorting_1">81</td>
          <td>JANUARY</td>
          <td>JOHN</td>
          <td>KIKOVE</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>52</td>
          <td>Health Assistant</td>
          <td>Health Officer II</td>
          <td>On Duty</td>
          <td>8449898</td>
          <td>29y7m</td>
          <td>2027-09-30</td>
          <td>15/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="019a9ecbddff81909b895fba9df6945e" role="row" class="even">
          <td class="sorting_1">82</td>
          <td>JOHN</td>
          <td>EWALD</td>
          <td>OISSO</td>
          <td>Advance Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>48</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer I</td>
          <td>On Duty</td>
          <td>11386720</td>
          <td>11y1m</td>
          <td>2032-01-12</td>
          <td>31/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="beb76e7ce256060e796fa5ece3b32ad0" role="row" class="odd">
          <td class="sorting_1">83</td>
          <td>Joyce</td>
          <td>Heavenlight</td>
          <td>Massawe</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>52</td>
          <td>Assistant Nursing Officer</td>
          <td>Assistant Nursing Officer II</td>
          <td>On Duty</td>
          <td>8941082</td>
          <td>27y10m</td>
          <td>2027-08-04</td>
          <td>15/08/2014</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="e4c296ae418029390a61fd1d54892a40" role="row" class="even">
          <td class="sorting_1">84</td>
          <td>Joyce</td>
          <td>Yusuph</td>
          <td>Tambwe</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>32</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>9877777</td>
          <td>5y6m</td>
          <td>2047-05-14</td>
          <td>19/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="c0d5b8061e828f0767aaa57cd4d2f9b8" role="row" class="odd">
          <td class="sorting_1">85</td>
          <td>Joyce</td>
          <td>Anthon</td>
          <td>Msese</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>33</td>
          <td>Health Laboratory Technologist</td>
          <td>Laboratory Technologist I</td>
          <td>On Duty</td>
          <td>12292214</td>
          <td>9y0m</td>
          <td>2046-05-29</td>
          <td>17/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="1720dcdc716cc6d5be64291d905e86fa" role="row" class="even">
          <td class="sorting_1">86</td>
          <td>JOYCE</td>
          <td>JONATHAN</td>
          <td>MASALA</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>23</td>
          <td>Nurse</td>
          <td>Nurse II</td>
          <td>On Duty</td>
          <td>000000</td>
          <td>2y1m</td>
          <td>2056-06-21</td>
          <td>03/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="e531fc5cb301b3220e5bbce114b2557a" role="row" class="odd">
          <td class="sorting_1">87</td>
          <td>JOYCE</td>
          <td>ALEX</td>
          <td>MGANA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>29</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111322219</td>
          <td>5y7m</td>
          <td>2050-05-10</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="24981fec005f83f23bd2e2f9b4e8ec8e" role="row" class="even">
          <td class="sorting_1">88</td>
          <td>JOYCELUCY</td>
          <td>EDWARD</td>
          <td>SOMMY</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>31</td>
          <td>Assistant Nursing Officer</td>
          <td>Assistant Nursing Officer I</td>
          <td>On Duty</td>
          <td>112054668</td>
          <td>1y4m</td>
          <td>2048-07-10</td>
          <td>04/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="24e469dc9f77df8cbb663f8e441428a8" role="row" class="odd">
          <td class="sorting_1">89</td>
          <td>Juliana</td>
          <td>Raymond</td>
          <td>Massawe</td>
          <td>Secondary School</td>
          <td></td>
          <td>45</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>9860601</td>
          <td>16y7m</td>
          <td>2034-06-19</td>
          <td>28/11/2013</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="8a3ec7dca77398756e3e29dcde254e90" role="row" class="even">
          <td class="sorting_1">90</td>
          <td>Juma</td>
          <td>Ramadhani</td>
          <td>Kifaru</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>59</td>
          <td>Medical Record Technician</td>
          <td>Medical Record Technician II</td>
          <td>On Duty</td>
          <td>5997088</td>
          <td>38y2m</td>
          <td>2020-12-31</td>
          <td>14/07/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="98df3b95a1dd519e819edd56a8936060" role="row" class="odd">
          <td class="sorting_1">91</td>
          <td>KHADIJA</td>
          <td>A</td>
          <td>OMARI</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>1</td>
          <td>Assistant Nursing Officer</td>
          <td>Assistant Nursing Officer I</td>
          <td>On Duty</td>
          <td>112054661</td>
          <td>30y11m</td>
          <td>2078-01-24</td>
          <td>10/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="ddb07a6f0709da081b05842c71d90007" role="row" class="even">
          <td class="sorting_1">92</td>
          <td>KISIMBA</td>
          <td>AHMAD</td>
          <td>MSOLOMI</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>43</td>
          <td>Dental Therapist</td>
          <td>Dental Therapist I</td>
          <td>On Duty</td>
          <td>12294096</td>
          <td>10y2m</td>
          <td>2036-06-28</td>
          <td>07/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="68050302be7eeb70bc4d2388b7ca75a9" role="row" class="odd">
          <td class="sorting_1">93</td>
          <td>Leonard</td>
          <td>Luther</td>
          <td>Mwamkoa</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>45</td>
          <td>Medical Doctor</td>
          <td>Medical Doctor II</td>
          <td>On Duty</td>
          <td>10832471</td>
          <td>13y0m</td>
          <td>2035-01-08</td>
          <td>20/12/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="347b0c8856e9f4af98dfda760632f2fe" role="row" class="even">
          <td class="sorting_1">94</td>
          <td>LETICIA</td>
          <td>P</td>
          <td>MATOGO</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>3</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>112072064</td>
          <td>1y5m</td>
          <td>2077-01-06</td>
          <td>10/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="c99df2158793e309470278862e5acf78" role="row" class="odd">
          <td class="sorting_1">95</td>
          <td>Lilian</td>
          <td>George</td>
          <td>Mnzava</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>59</td>
          <td>Clinical Officer</td>
          <td>Principal Clinical Officer I</td>
          <td>On Duty</td>
          <td>6272043</td>
          <td>38y6m</td>
          <td>2020-11-25</td>
          <td>06/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="acb640012842e0c75c7650ac59a3c09b" role="row" class="even">
          <td class="sorting_1">96</td>
          <td>LILIAN</td>
          <td>JOHN</td>
          <td>MISANGO</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>34</td>
          <td>Social Welfare Officer</td>
          <td>Social Welfare Officer I</td>
          <td>On Duty</td>
          <td>12221672</td>
          <td>9y3m</td>
          <td>2045-11-26</td>
          <td>30/05/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="ca374c88f91398cf99ef284f70bd5392" role="row" class="odd">
          <td class="sorting_1">97</td>
          <td>LINDANI</td>
          <td>G</td>
          <td>GAGA</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>31</td>
          <td>Medical Officer</td>
          <td>Medical Doctor II</td>
          <td>On Duty</td>
          <td>112048463</td>
          <td>1y9m</td>
          <td>2048-08-07</td>
          <td>21/03/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="3387f011a6d867a543e9074d55d47282" role="row" class="even">
          <td class="sorting_1">98</td>
          <td>LUCIA</td>
          <td>RICHARD</td>
          <td>MAGANGA</td>
          <td>Secondary School</td>
          <td>Ordinary Secondary Education</td>
          <td>26</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>111351125</td>
          <td>5y7m</td>
          <td>2053-06-12</td>
          <td>07/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="43d774d9fef8ab94a737203c88f6bcaa" role="row" class="odd">
          <td class="sorting_1">99</td>
          <td>Lucy</td>
          <td>Nalogwa</td>
          <td>Shani</td>
          <td>Bachelor Degree</td>
          <td>Ordinary Secondary Education</td>
          <td>36</td>
          <td>Social Welfare Officer</td>
          <td>Social Welfare Officer II</td>
          <td>On Duty</td>
          <td>111384245</td>
          <td>5y6m</td>
          <td>2043-04-23</td>
          <td>15/12/2014</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="049b92087dee866faf93035ad72793de" role="row" class="even">
          <td class="sorting_1">100</td>
          <td>Lulu</td>
          <td>Juma</td>
          <td>Selemani</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>31</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>12386395</td>
          <td>8y9m</td>
          <td>2048-12-24</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="49251738da8f66be948d50c06a640611" role="row" class="odd">
          <td class="sorting_1">101</td>
          <td>Maria</td>
          <td>Ndorobo</td>
          <td>Dui</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>30</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>12345678</td>
          <td></td>
          <td>2049-02-11</td>
          <td>25/06/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="0f914f8ab47e581b9fb37bf4fd1d3c9d" role="row" class="even">
          <td class="sorting_1">102</td>
          <td>MARIAJEMA</td>
          <td>S</td>
          <td>MGANGA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>32</td>
          <td>Dental Therapist</td>
          <td>Dental Therapist I</td>
          <td>On Duty</td>
          <td>11838263</td>
          <td>10y2m</td>
          <td>2047-10-03</td>
          <td>15/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="6cb6f2b50d97cb1b609e943378260683" role="row" class="odd">
          <td class="sorting_1">103</td>
          <td>Mariam</td>
          <td>SAD</td>
          <td>Fakhi</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>35</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer I</td>
          <td>On Duty</td>
          <td>11989475</td>
          <td>9y9m</td>
          <td>2044-09-10</td>
          <td>03/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="1c9f8eecc91a53f3f6b73f49e7811042" role="row" class="even">
          <td class="sorting_1">104</td>
          <td>MARIAM</td>
          <td>ABEID</td>
          <td>KALELA</td>
          <td>Advance Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>31</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer II</td>
          <td>On Duty</td>
          <td>111491232</td>
          <td>5y0m</td>
          <td>2048-11-23</td>
          <td>04/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="88b3d04b2c5d8e3334437947b01f9063" role="row" class="odd">
          <td class="sorting_1">105</td>
          <td>Martha</td>
          <td>Elia</td>
          <td>Mungoya</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>30</td>
          <td>Health Laboratory Technologist</td>
          <td>Laboratory Technologist II</td>
          <td>On Duty</td>
          <td>12345678</td>
          <td>4y9m</td>
          <td>2049-06-02</td>
          <td>04/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="8cc0715af8877eb94847f3b1c53bf095" role="row" class="even">
          <td class="sorting_1">106</td>
          <td>Martin</td>
          <td>Style</td>
          <td>Kalongolela</td>
          <td>Advance Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>51</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Principal Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>8647306</td>
          <td>28y3m</td>
          <td>2028-12-09</td>
          <td>21/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="36e48ee91ad262d061b95faa9c78bfc2" role="row" class="odd">
          <td class="sorting_1">107</td>
          <td>MARTIN</td>
          <td>MICHAEL</td>
          <td>PANDUKA</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>35</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111023036</td>
          <td>6y5m</td>
          <td>2044-12-28</td>
          <td>03/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="20213936928d3e7eb081cbd142526437" role="row" class="even">
          <td class="sorting_1">108</td>
          <td>Mary</td>
          <td>Athanas</td>
          <td>Mpochela</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>49</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>7747461</td>
          <td>31y3m</td>
          <td>2030-05-04</td>
          <td>28/11/2013</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="7da3572062ea9d7fec24d7434e6389fa" role="row" class="odd">
          <td class="sorting_1">109</td>
          <td>Mary</td>
          <td>Jonathan</td>
          <td>Mkwavi</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>45</td>
          <td>Environmental Health Assistant</td>
          <td>Senior Assistant Environmental Health Officer</td>
          <td>On Duty</td>
          <td>12297915</td>
          <td>8y11m</td>
          <td>2034-12-27</td>
          <td>03/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="84aa01ed4e694e9aec931181f066bdb2" role="row" class="even">
          <td class="sorting_1">110</td>
          <td>MASAGA</td>
          <td>SAGANA</td>
          <td>IKWABE</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>32</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111463875</td>
          <td>4y11m</td>
          <td>2047-03-29</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="1676386e0b2ea1c98b3d948d5f36e21b" role="row" class="odd">
          <td class="sorting_1">111</td>
          <td>MASOUD</td>
          <td>A</td>
          <td>MSOLOMI</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>29</td>
          <td>Laboratory Attendant</td>
          <td>Laboratory Attendant</td>
          <td>On Duty</td>
          <td>112050292</td>
          <td>1y5m</td>
          <td>2050-03-11</td>
          <td>17/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="96d006656843c81fb0c9a933b8bab3ba" role="row" class="even">
          <td class="sorting_1">112</td>
          <td>MGENI</td>
          <td>MAHMOUD</td>
          <td>MPINGA</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>33</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer I</td>
          <td>On Duty</td>
          <td>110746652</td>
          <td>7y11m</td>
          <td>2046-08-14</td>
          <td>07/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="6cf1a03d0bafdb17f608d2cff4325511" role="row" class="odd">
          <td class="sorting_1">113</td>
          <td>Michael</td>
          <td>Francis</td>
          <td>Gweba</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>52</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Principal Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>7191787</td>
          <td>34y0m</td>
          <td>2027-10-11</td>
          <td>28/11/2013</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="91ef91885516b3434d6563a2c15f293e" role="row" class="even">
          <td class="sorting_1">114</td>
          <td>Michael</td>
          <td>Victor</td>
          <td>Ngowi</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>29</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>123456678</td>
          <td>5y0m</td>
          <td>2050-09-12</td>
          <td>19/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="eb9ebb7a15fd9726712e6d99a0c35f47" role="row" class="odd">
          <td class="sorting_1">115</td>
          <td>MICHAEL</td>
          <td>VICTOR</td>
          <td>NGOWI</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>29</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111478476</td>
          <td>4y11m</td>
          <td>2050-09-12</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="e073fe823d088b0576caa4b47311e0d1" role="row" class="even">
          <td class="sorting_1">116</td>
          <td>Mina</td>
          <td>GABRIEL</td>
          <td>Mkami</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>43</td>
          <td>Health Laboratory Technologist</td>
          <td>Laboratory Technologist II</td>
          <td>On Duty</td>
          <td>10985414</td>
          <td>12y9m</td>
          <td>2036-07-29</td>
          <td>25/03/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="33bb2377a359ba62261586ce46b984c7" role="row" class="odd">
          <td class="sorting_1">117</td>
          <td>Mkuu</td>
          <td>Barnabas</td>
          <td>Hanje</td>
          <td>Advance Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>57</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>5920130</td>
          <td>34y3m</td>
          <td>2022-08-22</td>
          <td>28/11/2013</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="6a4a12a854c36cfe2f2e49f14cc75fbd" role="row" class="even">
          <td class="sorting_1">118</td>
          <td>MOHAMED</td>
          <td>JUMA</td>
          <td>NGASINDA</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>32</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111347035</td>
          <td>5y7m</td>
          <td>2048-01-11</td>
          <td>03/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="cbbab6e73c8e86aed7e37808ea02a4a8" role="row" class="odd">
          <td class="sorting_1">119</td>
          <td>Muhhamed</td>
          <td>Abdul</td>
          <td>Salim</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>26</td>
          <td>Pharmaceutical Technologist</td>
          <td>Pharmaceutical Technologist I</td>
          <td>On Duty</td>
          <td>111482935</td>
          <td>4y10m</td>
          <td>2053-06-02</td>
          <td>30/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="de48595361bdf5171070e1e619120601" role="row" class="even">
          <td class="sorting_1">120</td>
          <td>Mwajuma</td>
          <td>Yusuf</td>
          <td>Mdemu</td>
          <td>Diploma</td>
          <td></td>
          <td>53</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>7813360</td>
          <td>31y4m</td>
          <td>2026-08-17</td>
          <td>28/11/2013</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="bc39e5d96f56d7db199dce75c9138902" role="row" class="odd">
          <td class="sorting_1">121</td>
          <td>Mwajuma</td>
          <td>Fikeni</td>
          <td>Mohamedi</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>37</td>
          <td>Medical Attendant</td>
          <td>Principal Medical Attendant</td>
          <td>On Duty</td>
          <td>12300775</td>
          <td>9y0m</td>
          <td>2042-12-23</td>
          <td>31/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="1251415e2c1a9a2c45355ab6ebfd103a" role="row" class="even">
          <td class="sorting_1">122</td>
          <td>MWAJUMA</td>
          <td>ALLY</td>
          <td>PINDINGU</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>46</td>
          <td>Medical Doctor</td>
          <td>Medical Doctor II</td>
          <td>On Duty</td>
          <td>9731392</td>
          <td>19y3m</td>
          <td>2033-12-28</td>
          <td>30/09/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="38f2786f379c84d28c22fa0aa405a66b" role="row" class="odd">
          <td class="sorting_1">123</td>
          <td>Mwanahawa</td>
          <td>Uledi</td>
          <td>Salum</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>36</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>110561883</td>
          <td>8y1m</td>
          <td>2043-07-06</td>
          <td>05/03/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="349c715ec82a80a1f06efc4c48d4b042" role="row" class="even">
          <td class="sorting_1">124</td>
          <td>NAKEMBETWA</td>
          <td>J</td>
          <td>MKUMBO</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>1</td>
          <td>Pharmacist</td>
          <td>Pharmacist I</td>
          <td>On Duty</td>
          <td>112054645</td>
          <td>1y5m</td>
          <td>2078-07-31</td>
          <td>05/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="8967e8d39dcef1217dddeb07e582013a" role="row" class="odd">
          <td class="sorting_1">125</td>
          <td>NASRIYA</td>
          <td>N</td>
          <td>KHAMIS</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>31</td>
          <td>Medical Doctor</td>
          <td>Medical Doctor I</td>
          <td>On Duty</td>
          <td>112048517</td>
          <td>1y5m</td>
          <td>2048-04-18</td>
          <td>05/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="ade14352fb891a6becab5055eb364ba6" role="row" class="even">
          <td class="sorting_1">126</td>
          <td>Neema</td>
          <td>Doris</td>
          <td>Camara</td>
          <td>Bachelor Degree</td>
          <td>Ordinary Secondary Education</td>
          <td>33</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>0000</td>
          <td>9y2m</td>
          <td>2046-05-12</td>
          <td>23/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="7a83bc34739997f8325aa626f5147c5d" role="row" class="odd">
          <td class="sorting_1">127</td>
          <td>Neema</td>
          <td>Wera</td>
          <td>Mushi</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>39</td>
          <td>Assistant Health Laboratory Technologist</td>
          <td>Senior Assistant Laboratory Technologist</td>
          <td>On Duty</td>
          <td>10985399</td>
          <td>12y9m</td>
          <td>2040-05-23</td>
          <td>20/12/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="4a393f3680a0fc21b52c0dac86a10e24" role="row" class="even">
          <td class="sorting_1">128</td>
          <td>NEEMA</td>
          <td>MTUNDI</td>
          <td>IRUGA</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>29</td>
          <td>Nurse</td>
          <td>Nurse II</td>
          <td>On Duty</td>
          <td>111002585</td>
          <td>6y6m</td>
          <td>2050-05-01</td>
          <td>18/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="95216f1f10231af362dacd1676912a7c" role="row" class="odd">
          <td class="sorting_1">129</td>
          <td>Never</td>
          <td>Leopold</td>
          <td>Malangalila</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>39</td>
          <td>Nurse</td>
          <td>Senior Nurse</td>
          <td>On Duty</td>
          <td>12206948</td>
          <td>9y8m</td>
          <td>2040-06-13</td>
          <td>01/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="fda6791195baed7ebc0faae52a6a25c8" role="row" class="even">
          <td class="sorting_1">130</td>
          <td>NOEL</td>
          <td>MFUMBULWA</td>
          <td>CHARLES</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>30</td>
          <td>Medical Officer</td>
          <td>Medical Doctor II</td>
          <td>On Duty</td>
          <td>112048486</td>
          <td>1y5m</td>
          <td>2049-12-23</td>
          <td>21/03/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="b3ce38241f7301ca15353a73d6f9f7f3" role="row" class="odd">
          <td class="sorting_1">131</td>
          <td>NYABERO</td>
          <td>JOHN</td>
          <td>MAHAWA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>41</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer I</td>
          <td>On Duty</td>
          <td>000000</td>
          <td>2y1m</td>
          <td>2038-05-20</td>
          <td>03/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="5a65f216e0b1dbc32041d41e3008a9ea" role="row" class="even">
          <td class="sorting_1">132</td>
          <td>Nyakilama</td>
          <td>Sailas</td>
          <td>Bwire</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>29</td>
          <td>Nurse</td>
          <td>Nurse II</td>
          <td>On Duty</td>
          <td>111003427</td>
          <td>6y5m</td>
          <td>2050-10-08</td>
          <td>19/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="aae8a8b1c808dea8c82ea3872ad6e344" role="row" class="odd">
          <td class="sorting_1">133</td>
          <td>OMARI</td>
          <td>WAZIRI</td>
          <td>MHANDO</td>
          <td>Diploma</td>
          <td>Primary Education</td>
          <td>61</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>4656405</td>
          <td>41y11m</td>
          <td>2018-09-12</td>
          <td>03/07/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="19fc3ec20dade6f665ef363e0bc8653f" role="row" class="even">
          <td class="sorting_1">134</td>
          <td>PASCHAL</td>
          <td>HUNGWI</td>
          <td>MAYALA</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>32</td>
          <td>Health Laboratory Scientist</td>
          <td>Health Laboratory Scientist II</td>
          <td>On Duty</td>
          <td>112095573</td>
          <td>1y5m</td>
          <td>2047-07-06</td>
          <td>21/03/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="561939fedb52398816adf030d5b517c7" role="row" class="odd">
          <td class="sorting_1">135</td>
          <td>PATRICK</td>
          <td>MAZENGO</td>
          <td>CHIBWANA</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>36</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111474376</td>
          <td>4y11m</td>
          <td>2043-12-29</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="aa0575be1439e93e5c298857a141a038" role="row" class="even">
          <td class="sorting_1">136</td>
          <td>PAULINA</td>
          <td>PETER</td>
          <td>KWEKA</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>30</td>
          <td>Medical Attendant</td>
          <td>Senior Medical Attendant</td>
          <td>On Duty</td>
          <td>1114413661</td>
          <td>5y3m</td>
          <td>2049-12-08</td>
          <td>03/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="dd02ab0f1cd722db01811904bb8d4bb0" role="row" class="odd">
          <td class="sorting_1">137</td>
          <td>PENDO</td>
          <td>AMANI</td>
          <td>KENGWA</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>27</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>11152295</td>
          <td>4y4m</td>
          <td>2052-04-26</td>
          <td>19/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="ae4cc8ac2d1a761adf1cb4ba01e84495" role="row" class="even">
          <td class="sorting_1">138</td>
          <td>PENDO</td>
          <td>ELIAS</td>
          <td>KAGGUNDU</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>47</td>
          <td>Social Welfare Officer</td>
          <td>Social Welfare Officer II</td>
          <td>On Duty</td>
          <td>8967499</td>
          <td>26y6m</td>
          <td>2032-05-21</td>
          <td>30/05/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="00dc3c1c8bcd02ce9decbcdedcae1b24" role="row" class="odd">
          <td class="sorting_1">139</td>
          <td>PENDO</td>
          <td>SADIKIEL</td>
          <td>MMBANDO</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>28</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer I</td>
          <td>On Duty</td>
          <td>0000000</td>
          <td>2y1m</td>
          <td>2051-02-27</td>
          <td>03/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="aadbcc4131d15490905155703584a54d" role="row" class="even">
          <td class="sorting_1">140</td>
          <td>PRISCA</td>
          <td>GENNER</td>
          <td>MWAIJANDE</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>27</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111470155</td>
          <td>4y11m</td>
          <td>2052-03-25</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="7cd04550c2e05afc755a9bff90f7eda5" role="row" class="odd">
          <td class="sorting_1">141</td>
          <td>RAIYA</td>
          <td>A</td>
          <td>HAMADI</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>36</td>
          <td>Medical Officer</td>
          <td>Medical Doctor II</td>
          <td>On Duty</td>
          <td>111039885</td>
          <td>1y5m</td>
          <td>2043-07-31</td>
          <td>22/03/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="578bbc99540a119b4469a672e10f6a41" role="row" class="even">
          <td class="sorting_1">142</td>
          <td>RASHID</td>
          <td>A</td>
          <td>MHINA</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>47</td>
          <td>Medical Officer</td>
          <td>Medical Doctor II</td>
          <td>On Duty</td>
          <td>111751889</td>
          <td>4y10m</td>
          <td>2032-06-14</td>
          <td>21/03/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="00f6769df3a1e3417d9b17f4d39a7b35" role="row" class="odd">
          <td class="sorting_1">143</td>
          <td>REBECAH</td>
          <td>ZABRON</td>
          <td>RUVANDA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>42</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer I</td>
          <td>On Duty</td>
          <td>11940973</td>
          <td>10y1m</td>
          <td>2037-05-03</td>
          <td>16/04/2016</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="66248333b3a32644528efda4ac170925" role="row" class="even">
          <td class="sorting_1">144</td>
          <td>Rebecca</td>
          <td>Dickson</td>
          <td>Mlelwa</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>31</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>111038363</td>
          <td>5y7m</td>
          <td>2048-05-04</td>
          <td>19/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="377fe895cf43b71b92666a17171368a1" role="row" class="odd">
          <td class="sorting_1">145</td>
          <td>Rebeka</td>
          <td>Amosi</td>
          <td>Mnandi</td>
          <td>Certificate</td>
          <td>Primary Education</td>
          <td>39</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>11397289</td>
          <td>11y2m</td>
          <td>2040-12-12</td>
          <td>26/03/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="db19a6ad1b04c5621d479d421ceb55ca" role="row" class="even">
          <td class="sorting_1">146</td>
          <td>Regina</td>
          <td>Timothy</td>
          <td>Mbonde</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>30</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>12306188</td>
          <td>9y2m</td>
          <td>2049-02-20</td>
          <td>30/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="15191c23d18d03dad04a408cf321696e" role="row" class="odd">
          <td class="sorting_1">147</td>
          <td>Regnald</td>
          <td>Shepherdson</td>
          <td>Mlay</td>
          <td>Masters Degree</td>
          <td>Ordinary Secondary Education</td>
          <td>50</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Principal Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>8832694</td>
          <td>26y10m</td>
          <td>2029-12-18</td>
          <td>03/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="c9ab09ec1c0804fbc05e5fed1ac17d5c" role="row" class="even">
          <td class="sorting_1">148</td>
          <td>Rehema</td>
          <td>Rajabu</td>
          <td>Rashidi</td>
          <td>Certificate</td>
          <td>Primary Education</td>
          <td>62</td>
          <td>Nurse</td>
          <td>Principal Nurse I</td>
          <td>On Duty</td>
          <td>5087666</td>
          <td>39y6m</td>
          <td>2017-07-24</td>
          <td>03/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="78cc51b7db4d15f60cba336f51642343" role="row" class="odd">
          <td class="sorting_1">149</td>
          <td>RENATUS</td>
          <td>ANATORY</td>
          <td>RWEHABURA</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>34</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111023143</td>
          <td>6y6m</td>
          <td>2045-08-07</td>
          <td>04/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="8dfdfc3122a1df72730218b1ba1fcc59" role="row" class="even">
          <td class="sorting_1">150</td>
          <td>Ritha</td>
          <td>Frans</td>
          <td>Sulle</td>
          <td>Primary School</td>
          <td>Ordinary Secondary Education</td>
          <td>39</td>
          <td>Nurse</td>
          <td>Nurse Grade II</td>
          <td>On Duty</td>
          <td>111719683</td>
          <td>4y7m</td>
          <td>2040-02-18</td>
          <td>20/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="8d46b256cc0f3c2c909504a406e1dabe" role="row" class="odd">
          <td class="sorting_1">151</td>
          <td>RITHA</td>
          <td>MEINRARD</td>
          <td>KAMBANGA</td>
          <td>Advance Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>53</td>
          <td>Assistant Medical Officer</td>
          <td>Senior Assistant Medical Officer</td>
          <td>On Duty</td>
          <td>8949099</td>
          <td>26y8m</td>
          <td>2026-12-17</td>
          <td>18/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="6964399ba85a44b73fb12888b8ed8dd5" role="row" class="even">
          <td class="sorting_1">152</td>
          <td>RITHA</td>
          <td>FRATENI</td>
          <td>SULLE</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>39</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>111719683</td>
          <td>4y7m</td>
          <td>2040-02-18</td>
          <td>19/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="c29dc9101c0bb8a3de9cb7d87189630e" role="row" class="odd">
          <td class="sorting_1">153</td>
          <td>ROSE</td>
          <td>JOHN</td>
          <td>CHUNDU</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>36</td>
          <td>Social Welfare Officer</td>
          <td>Senior Social Welfare Officer</td>
          <td>On Duty</td>
          <td>11214209</td>
          <td>11y11m</td>
          <td>2043-04-30</td>
          <td>30/05/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="b7fcac815d263d858f8ebc2472f8df3e" role="row" class="even">
          <td class="sorting_1">154</td>
          <td>Safihuma</td>
          <td>Rashidi</td>
          <td>Mdee</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>47</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>8448868</td>
          <td>29y6m</td>
          <td>2032-08-01</td>
          <td>19/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="0efa57ab3c5c02b42745759d6c081bed" role="row" class="odd">
          <td class="sorting_1">155</td>
          <td>Said</td>
          <td>Nkusa</td>
          <td>Dossa</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>47</td>
          <td>Records Management Assistant</td>
          <td>Records Management Assistant I</td>
          <td>On Duty</td>
          <td>9704644</td>
          <td>17y8m</td>
          <td>2032-11-30</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="69f639a9894b65aef7fa52899a29fd03" role="row" class="even">
          <td class="sorting_1">156</td>
          <td>Salimu</td>
          <td>Badi</td>
          <td>Msuya</td>
          <td>Advance Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>42</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Principal Assistant Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>10583315</td>
          <td>14y4m</td>
          <td>2037-09-22</td>
          <td>19/12/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="9842ef1a4340e908e35b7e1a75fd913d" role="row" class="odd">
          <td class="sorting_1">157</td>
          <td>SALMA</td>
          <td>ALI</td>
          <td>HAMAD</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>30</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer II</td>
          <td>On Duty</td>
          <td>111468194</td>
          <td>5y0m</td>
          <td>2049-11-10</td>
          <td>16/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="ec747fc9c444c3154715b32317a683a4" role="row" class="even">
          <td class="sorting_1">158</td>
          <td>SAMSON</td>
          <td>LUSEKELO</td>
          <td>MWAHOYO</td>
          <td>Certificate</td>
          <td>Primary Education</td>
          <td>60</td>
          <td>Health Assistant</td>
          <td>Senior Assistant Environmental Health Officer</td>
          <td>On Duty</td>
          <td>5319341</td>
          <td>35y2m</td>
          <td>2019-12-24</td>
          <td>03/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="656ddb25c44047abe1734aa940bfd259" role="row" class="odd">
          <td class="sorting_1">159</td>
          <td>Sarah</td>
          <td>Emmanuel</td>
          <td>Mwakijolo</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>33</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>12388753</td>
          <td>8y9m</td>
          <td>2046-06-23</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="8535121bfcfb612c9e06a55b88149375" role="row" class="even">
          <td class="sorting_1">160</td>
          <td>SARAH</td>
          <td>EMMANUEL</td>
          <td>MWAKIJOLO</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>33</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>12388753</td>
          <td>8y9m</td>
          <td>2046-06-23</td>
          <td>15/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="1a4e2efae14e4c9c06aa8b68c4e8b0ef" role="row" class="odd">
          <td class="sorting_1">161</td>
          <td>Sauda</td>
          <td>Bakari</td>
          <td>Mwango</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>32</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>111310224</td>
          <td>5y8m</td>
          <td>2047-10-25</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="84dbae1702b859d1a23bdfa85cee4a1c" role="row" class="even">
          <td class="sorting_1">162</td>
          <td>Selemani</td>
          <td>Abdallah</td>
          <td>Mfinanga</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>32</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>12345678</td>
          <td>5y0m</td>
          <td>2047-03-04</td>
          <td>19/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="7da88b4885b44b139b059ae130d3eabb" role="row" class="odd">
          <td class="sorting_1">163</td>
          <td>SHARIFA</td>
          <td>MUSTAK</td>
          <td>ALBAHAI</td>
          <td>Certificate</td>
          <td>Advanced Secondary Education</td>
          <td>28</td>
          <td>Clinical Assistant</td>
          <td>Clinical Assistant</td>
          <td>On Duty</td>
          <td>111518555</td>
          <td>4y9m</td>
          <td>2051-03-18</td>
          <td>05/12/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="ae2293d00b754a6c419c23318b85f668" role="row" class="even">
          <td class="sorting_1">164</td>
          <td>SHARIFA</td>
          <td>NURU</td>
          <td>MTANDA</td>
          <td>Advance Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>34</td>
          <td>Records Management Assistant</td>
          <td>Records Management Officer II</td>
          <td>On Duty</td>
          <td>111760595</td>
          <td>4y6m</td>
          <td>2045-08-22</td>
          <td>04/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="92a4f82823900eb7d7afef6a6f555904" role="row" class="odd">
          <td class="sorting_1">165</td>
          <td>Sheila</td>
          <td>Ali</td>
          <td>Kaporo</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>36</td>
          <td>Assistant Nursing Officer</td>
          <td>Assistant Nursing Officer II</td>
          <td>On Duty</td>
          <td>110779065</td>
          <td>7y10m</td>
          <td>2043-04-10</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="3237f8bdf84c59a02cb4d0d2855403b9" role="row" class="even">
          <td class="sorting_1">166</td>
          <td>Shufaa</td>
          <td>Nassor</td>
          <td>Mitawa</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>32</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>111310270</td>
          <td>5y8m</td>
          <td>2047-04-09</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="c3d430135df6d38d2efa17fcecdc44f5" role="row" class="odd">
          <td class="sorting_1">167</td>
          <td>SHUFAA</td>
          <td>NASSOR</td>
          <td>MITAWA</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>32</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111310270</td>
          <td>5y8m</td>
          <td>2047-04-09</td>
          <td>19/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="ae6e9c0a032bd8d8deb8a94b7a5917b7" role="row" class="even">
          <td class="sorting_1">168</td>
          <td>SIFA</td>
          <td>KASSIMU</td>
          <td>MPONDA</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>38</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>110740086</td>
          <td>7y8m</td>
          <td>2041-07-06</td>
          <td>09/07/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="37b1223e2b459e74bc7dc4d530cabe80" role="row" class="odd">
          <td class="sorting_1">169</td>
          <td>SIMON</td>
          <td>NESTORY</td>
          <td>WASANDARA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>32</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>111023217</td>
          <td>6y6m</td>
          <td>2047-03-25</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="043618a02de5471b92b8bb2725c8c4c8" role="row" class="even">
          <td class="sorting_1">170</td>
          <td>Sofia</td>
          <td>Swalehe</td>
          <td>Ntomola</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>54</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Principal Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>8012481</td>
          <td>31y6m</td>
          <td>2025-06-17</td>
          <td>28/11/2013</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="335620ffbd0b5a32ac861d0675411f4c" role="row" class="odd">
          <td class="sorting_1">171</td>
          <td>Sophia</td>
          <td>Joseph</td>
          <td>Chitawala</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>28</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>1112844</td>
          <td>5y9m</td>
          <td>2051-09-15</td>
          <td>04/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="f8841ff30832293402772e63eebf02f5" role="row" class="even">
          <td class="sorting_1">172</td>
          <td>SOPHIA</td>
          <td>SWALEHE</td>
          <td>NTOMOLA</td>
          <td>Masters Degree</td>
          <td>Advanced Secondary Education</td>
          <td>54</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>8012481</td>
          <td>29y7m</td>
          <td>2025-09-23</td>
          <td>15/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="b99b91f2f34d40f8e97bc3f89f58a69f" role="row" class="odd">
          <td class="sorting_1">173</td>
          <td>Stella</td>
          <td>Ludovick</td>
          <td>Mdutta</td>
          <td>Certificate</td>
          <td>Primary Education</td>
          <td>53</td>
          <td>Nurse</td>
          <td>Senior Nurse</td>
          <td>On Duty</td>
          <td>7840126</td>
          <td>8y7m</td>
          <td>2026-12-26</td>
          <td>06/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="5848aba31471785303b59b3f5e330c84" role="row" class="even">
          <td class="sorting_1">174</td>
          <td>STELLA</td>
          <td>SIMON</td>
          <td>MLIMBA</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>39</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>111391385</td>
          <td>5y8m</td>
          <td>2040-10-22</td>
          <td>04/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="df711cb168543f2448c8f096a1dee0df" role="row" class="odd">
          <td class="sorting_1">175</td>
          <td>Subilaga</td>
          <td>Selemani</td>
          <td>Luganga</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>40</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>9999111199</td>
          <td>4y10m</td>
          <td>2039-11-22</td>
          <td>10/07/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="dafb425de38bd752ca1706b25aa736e0" role="row" class="even">
          <td class="sorting_1">176</td>
          <td>Sylaus</td>
          <td>Musiba</td>
          <td>Kunaga</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>62</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>5731235</td>
          <td>38y7m</td>
          <td>2017-11-26</td>
          <td>18/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="54ad4662b73b41c76a528608f176bbe4" role="row" class="odd">
          <td class="sorting_1">177</td>
          <td>Tafawa</td>
          <td>Abdallah</td>
          <td>Kapungu</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>42</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer I</td>
          <td>On Duty</td>
          <td>111287715</td>
          <td>5y8m</td>
          <td>2037-12-30</td>
          <td>03/06/2019</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="e3174ccb885c0d8f9796104d8b5e9c0a" role="row" class="even">
          <td class="sorting_1">178</td>
          <td>Theodora</td>
          <td>Daniel</td>
          <td>Mbunda</td>
          <td>Masters Degree</td>
          <td>Advanced Secondary Education</td>
          <td>39</td>
          <td>Medical Officer</td>
          <td>Medical Doctor II</td>
          <td>On Secondment</td>
          <td>1067220</td>
          <td>7y10m</td>
          <td>2040-05-22</td>
          <td>26/09/2016</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="cf2f9790abd81e3742095105e50b2da9" role="row" class="odd">
          <td class="sorting_1">179</td>
          <td>Tumaini</td>
          <td>Nemey</td>
          <td>Mosha</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>28</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>111744968</td>
          <td>4y11m</td>
          <td>2051-11-13</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="304ea8afe30c098b589e4e242a407277" role="row" class="even">
          <td class="sorting_1">180</td>
          <td>TUMAINI</td>
          <td>A</td>
          <td>MINJA</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>25</td>
          <td>Biomedical Engineering Technician</td>
          <td>Biomedical Engineering Technician I</td>
          <td>On Duty</td>
          <td>112059158</td>
          <td>1y5m</td>
          <td>2054-04-01</td>
          <td>17/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="e5c486e29c9d2f002a03c017516d64d3" role="row" class="odd">
          <td class="sorting_1">181</td>
          <td>Ummy</td>
          <td>Michael</td>
          <td>Mbara</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>27</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>111497401</td>
          <td>4y10m</td>
          <td>2052-06-20</td>
          <td>05/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="637f1f0321607da11ec10d6e7ce9d725" role="row" class="even">
          <td class="sorting_1">182</td>
          <td>Veronika</td>
          <td>Joseph</td>
          <td>Abdallah</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>45</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>8980827</td>
          <td>25y1m</td>
          <td>2034-10-29</td>
          <td>18/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="e2f0ec4ee47633c8209fd098489267fb" role="row" class="odd">
          <td class="sorting_1">183</td>
          <td>Vides</td>
          <td>Abraham</td>
          <td>Kyuta</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>30</td>
          <td>Environmental Health Assistant</td>
          <td>Environmental Health Assistant II</td>
          <td>On Duty</td>
          <td>111312680</td>
          <td>5y9m</td>
          <td>2049-12-17</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="4aaf653392f36959356941d941fc02f0" role="row" class="even">
          <td class="sorting_1">184</td>
          <td>Walter</td>
          <td>Eliangiringa</td>
          <td>Macha</td>
          <td>Advance Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>47</td>
          <td>Assistant Environmental Health Officer</td>
          <td>Assistant Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>10713875</td>
          <td>13y8m</td>
          <td>2032-11-03</td>
          <td>03/02/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="64cacaf3ed0c321acbf20b463d86a52c" role="row" class="odd">
          <td class="sorting_1">185</td>
          <td>whisco</td>
          <td>Zakaria</td>
          <td>Ologi</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>34</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>111491595</td>
          <td>4y11m</td>
          <td>2045-06-26</td>
          <td>31/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="14aa4d8d5abf1e0c7d8ccba7cbf4d96d" role="row" class="even">
          <td class="sorting_1">186</td>
          <td>Winfrida</td>
          <td>Herman</td>
          <td>Malongo</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>43</td>
          <td>Nurse</td>
          <td>Senior Nurse</td>
          <td>On Duty</td>
          <td>11194662</td>
          <td>11y11m</td>
          <td>2036-09-18</td>
          <td>30/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="2059f708f86b0777db514a7fea3a8abb" role="row" class="odd">
          <td class="sorting_1">187</td>
          <td>YAHYA</td>
          <td>SAID</td>
          <td>OMARI</td>
          <td>Diploma</td>
          <td>Primary Education</td>
          <td>61</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>7218220</td>
          <td>33y2m</td>
          <td>2018-10-06</td>
          <td>03/07/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="71b69a31f0f8255e8c6e67655935b6dd" role="row" class="even">
          <td class="sorting_1">188</td>
          <td>Yohanes</td>
          <td>Silipamwambo</td>
          <td>Msigwa</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>36</td>
          <td>Health Laboratory Technologist</td>
          <td>Laboratory Technologist II</td>
          <td>On Duty</td>
          <td>123946650</td>
          <td>8y6m</td>
          <td>2043-09-28</td>
          <td>19/12/2016</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="93c8ff26af25847986aa40f5eed10f08" role="row" class="odd">
          <td class="sorting_1">189</td>
          <td>Yusuphu</td>
          <td>Daudi</td>
          <td>Magoma</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>43</td>
          <td>Dental Surgeon</td>
          <td>Dental Surgeon II</td>
          <td>On Duty</td>
          <td>12315096</td>
          <td>9y2m</td>
          <td>2036-11-26</td>
          <td>22/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="48a9d09bd604541f91269c10594973a7" role="row" class="even">
          <td class="sorting_1">190</td>
          <td>Zaina</td>
          <td>Mwenda</td>
          <td>Mwashitete</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>43</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>9166886</td>
          <td>23y11m</td>
          <td>2036-01-24</td>
          <td>18/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="6f1921a2fef1c159882cf0a2b7939091" role="row" class="odd">
          <td class="sorting_1">191</td>
          <td>ZAINA</td>
          <td>SAID</td>
          <td>SALUM</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>29</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer I</td>
          <td>On Duty</td>
          <td>110722245</td>
          <td>7y9m</td>
          <td>2050-08-21</td>
          <td>07/02/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="b87b936f6a8f3b06937a36eb17b9d80e" role="row" class="even">
          <td class="sorting_1">192</td>
          <td>Zainab</td>
          <td>Jumanne</td>
          <td>Kitembe</td>
          <td>Masters Degree</td>
          <td>Advanced Secondary Education</td>
          <td>50</td>
          <td>Social Welfare Officer</td>
          <td>Social Welfare Officer II</td>
          <td>On Duty</td>
          <td>8928104</td>
          <td>26y1m</td>
          <td>2029-04-10</td>
          <td>18/11/2015</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="3779188dce571f70be5f16f9856ba331" role="row" class="odd">
          <td class="sorting_1">193</td>
          <td>Zainabu</td>
          <td>Hashim</td>
          <td>Semkuya</td>
          <td>Diploma</td>
          <td>Advanced Secondary Education</td>
          <td>40</td>
          <td>Clinical Officer</td>
          <td>Clinical Officer II</td>
          <td>On Duty</td>
          <td>11261052</td>
          <td>11y8m</td>
          <td>2039-12-04</td>
          <td>17/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="d8508655c6b82884bb43941253602a26" role="row" class="even">
          <td class="sorting_1">194</td>
          <td>ZAINABU</td>
          <td>ABDALLAH</td>
          <td>MSHANA</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>37</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>111821413</td>
          <td>4y10m</td>
          <td>2042-01-31</td>
          <td>14/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="9210c1b300e0f703ede2a61bf1c51dcc" role="row" class="odd">
          <td class="sorting_1">195</td>
          <td>Zakhia</td>
          <td>Abdallah</td>
          <td>Nurdin</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>26</td>
          <td>Assistant Health Laboratory Technologist</td>
          <td>Assistant Laboratory Technologist</td>
          <td>On Duty</td>
          <td>111728859</td>
          <td>4y10m</td>
          <td>2053-09-29</td>
          <td>19/01/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="1306ac936b03e312f667e816e2710ec8" role="row" class="even">
          <td class="sorting_1">196</td>
          <td>ZAKIA</td>
          <td>RAMADHANI</td>
          <td>MLUGU</td>
          <td>Bachelor Degree</td>
          <td>Advanced Secondary Education</td>
          <td>32</td>
          <td>Health Secretary</td>
          <td>Health Secretary I</td>
          <td>On Duty</td>
          <td>110516019</td>
          <td>8y4m</td>
          <td>2047-12-24</td>
          <td>31/01/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="7ab581a0a938edd50edb7ec514892520" role="row" class="odd">
          <td class="sorting_1">197</td>
          <td>ZENA</td>
          <td>AMOS</td>
          <td>LESILWA</td>
          <td>Certificate</td>
          <td>Ordinary Secondary Education</td>
          <td>37</td>
          <td>Medical Attendant</td>
          <td>Medical Attendant</td>
          <td>On Duty</td>
          <td>112072127</td>
          <td>1y5m</td>
          <td>2042-04-03</td>
          <td>17/09/2018</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="68ca3d733384ffcdd498b8ef2c85e3a6" role="row" class="even">
          <td class="sorting_1">198</td>
          <td>Ziada</td>
          <td>Abdul</td>
          <td>Kashoba</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>42</td>
          <td>Environmental Health Assistant</td>
          <td>Environmental Health Assistant I</td>
          <td>On Duty</td>
          <td>9917022</td>
          <td>16y3m</td>
          <td>2037-05-16</td>
          <td>04/07/2016</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="4c69683aa9e1fc6c471a814d2f2fd6b8" role="row" class="odd">
          <td class="sorting_1">199</td>
          <td>ZIADA</td>
          <td>ABDUL</td>
          <td>KASHOBA</td>
          <td>Diploma</td>
          <td>Primary Education</td>
          <td>42</td>
          <td>Health Assistant</td>
          <td>Health Assistant II</td>
          <td>On Duty</td>
          <td>9917022</td>
          <td>16y4m</td>
          <td>2037-05-16</td>
          <td>15/09/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="f35d8ab4fc1fa55bccb06f92553d3c24" role="row" class="even">
          <td class="sorting_1">200</td>
          <td>ZUHURA</td>
          <td>RAMADHANI</td>
          <td>NKOKOO</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>34</td>
          <td>Nurse</td>
          <td>Nurse I</td>
          <td>On Duty</td>
          <td>12339672</td>
          <td>9y1m</td>
          <td>2045-05-28</td>
          <td>23/11/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
        <tr id="07c95030acf65b721a9bc3349bd48fa5" role="row" class="odd">
          <td class="sorting_1">201</td>
          <td>Zunu</td>
          <td>Ally</td>
          <td>Cassonta</td>
          <td>Diploma</td>
          <td>Ordinary Secondary Education</td>
          <td>57</td>
          <td>Environmental Health Officer</td>
          <td>Environmental Health Officer II</td>
          <td>On Duty</td>
          <td>8256881</td>
          <td>30y4m</td>
          <td>2022-11-12</td>
          <td>19/12/2017</td>
          <td>Ilala Municipal Council</td>
        </tr>
      </tbody>
    </table>
    '
  )  
        `);

      await queryRunner.query(`INSERT INTO report(uid, name, type, code) VALUES ( uid(),'Updates in the Last Month', 'sqlview', 'SELECT
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
      ou.name')`);

      await queryRunner.query(`INSERT INTO report(uid, name, type, code) VALUES ( uid(),'Updates in the Last 3 Months', 'sqlview', 
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
            ou.name')`);

      await queryRunner.query(`INSERT INTO report(uid, name, type, code) VALUES ( uid(),'Updates in the Last 6 Months', 'sqlview', 
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
            )`);

      await queryRunner.query(`INSERT INTO report(uid, name, type, code) VALUES ( uid(),'Updates Made in the Past 12 Months', 'sqlview', 
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
                  )`);

      await queryRunner.query(`INSERT INTO report(uid, name, type, code) VALUES ( uid(),'RRH Updates Made in the Past 9 Months', 'sqlview', 
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
     )`);

      await queryRunner.query(`INSERT INTO report(uid, name, type, code) VALUES ( uid(),'RRH Updates Made in the Past 1 Months', 'sqlview', 
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
            ou.name'   )`);

      await queryRunner.query(`INSERT INTO report(uid, name, type, code) VALUES ( uid(),'RRH Updates Made in the Past 3 Months', 'sqlview', 
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
                   )`);
      await queryRunner.query(`
                   INSERT INTO public.reportgroup(uid, name, description)
                    VALUES (uid(), 'Training Reports', 'Training module reports'),(uid(), 'Organization Reports', ''),
                    (uid(), 'Employee Records', ''), (uid(),'Other Reports','');
                           -- INSERT INTO public.reportgroupmembers(
                           --     "reportgroupId", "reportId")
                           --     VALUES (1,13),
                           --     (1,14),
                           --     (2,1),
                           --     (2,2),
                           --     (2,3),
                           --     (2,4),
                           --     (3,5),
                           --     (4,6),
                           --     (4,7),
                           --     (4,8),
                           --     (4,9),
                           --     (4,10),
                           --     (4,11),
                           --     (4,12);
                               `);
      await queryRunner.query(`
                               INSERT INTO public.report(
                                 uid, name, parameters, type, code)
                                 VALUES(uid(),'Trained Providers','{"ou": true,"pe": false,"training":{"sessions": true,"units": true,"curriculumn": true,"topics": true,"organizers": true,"sponsors": true,"qualifications": true,"deliverymode": true,"providers": true,"dateRange": true}}', 'html', '<table id="data" class="dataTable table table-striped table-bordered table-hover no-footer" cellpadding="0" cellspacing="0" border="0">
                                         <thead id="dataHeader"><tr><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>Region Name</th><th>District Name</th><th>Duty Post</th><th>Facility Ownership</th><th>Facility Type</th> </tr></thead>
                                         <tbody id="dataBody"><tr role="row"><td>Agness</td><td>Augustino</td><td>Mwanga</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Agness</td><td>Charles</td><td>Mgonja</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Agness</td><td>Peter</td><td>Ngatuni</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Agness</td><td>Simon</td><td>Temu</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Ally</td><td>Ramadhani</td><td>Mzaha</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Aloycia</td><td>Andrew</td><td>Ndunguru</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Andrica</td><td>Ikandilo</td><td>Weja</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Angela</td><td>Mshana</td><td>Kiangi</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Anna</td><td>Kigocha</td><td>Okeng''o</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Ariche</td><td>Adam</td><td>Mbimbi</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ASHURA</td><td>JUMA</td><td>POLLE</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Bahati</td><td>Sadiki</td><td>Mziray</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Baya</td><td>Hassani</td><td>Kissiwa</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>BEATRICE</td><td></td><td>NGENZI</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>BEAUTY</td><td>MWANYESYA</td><td>MWAMBEBULE</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Cesilia</td><td>Ibrahim</td><td>Sengulo</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Chemere</td><td>John</td><td>Sirira</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Christopher</td><td>M.</td><td>Mnzava</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Denis</td><td>John</td><td>Mdoe</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Dinna</td><td>K</td><td>Kisigalile</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ELIWANE</td><td>JACOB</td><td>MANDE</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Eliya</td><td>Yesaya</td><td>Mmbando</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>emanuel</td><td>rumisha</td><td>maeda</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Esperansi</td><td>Ndunda</td><td>Elias</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ESTHER</td><td>JOSEPH</td><td>KOMBA</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>evans</td><td>jacob</td><td>matalu</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Fatuma</td><td>Hamza</td><td>Athumani</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Felister</td><td>J.</td><td>Ngulubayi</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>felix</td><td>j</td><td>shimba</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Fortunata</td><td>Joseph</td><td>Mtaturu</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>GRACE</td><td>DORIS</td><td>SANGAWE</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Hadija</td><td>Ibrahimu</td><td>Tengeza</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Hadija</td><td>Kassim</td><td>Likwata</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Helena</td><td>Ferdinand</td><td>Mtani</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>HILDA</td><td>MOSES</td><td>NDIBALEMA</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Hindu</td><td>Rajabu</td><td>Mvungi</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Hudson</td><td>August</td><td>Manyanga</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Irene</td><td>J.</td><td>Phinehas</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>jane</td><td>n</td><td>madete</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Janeth</td><td>Andriani</td><td>Mwenda</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Joan</td><td>James</td><td>Mngodo</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Josephine</td><td>Simon</td><td>Zawadi</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>judith</td><td>salema</td><td>philip</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Lameck</td><td>David</td><td>Malekela</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>LAST</td><td>NDIKUPONDWA</td><td>MWAKASITU</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>leticia</td><td>j</td><td>tunganija</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MARGARETH</td><td>LUCAS</td><td>IBOBO</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mariam</td><td>Khamisy</td><td>Bondi</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mariam</td><td>Lameck</td><td>Mpinga</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mariam</td><td>Mohamed</td><td>Hatibu</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Marietha</td><td>mathias</td><td>Lyapa</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MARTHA</td><td>ERNEST</td><td>LEOLE</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mary</td><td>Fabian</td><td>Machemba</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MARY</td><td>EDWARD</td><td>SHIJA</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Matheso</td><td>Godfrey</td><td>Kamani</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mathias</td><td>Calist</td><td>Njau</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mercy</td><td>Fredrick</td><td>Maleko</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mlangwa</td><td>Juma</td><td>Mguta</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Musa</td><td>Maroko</td><td>Wambura</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mwinyimkuu</td><td>Ally</td><td>Muhogoro</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Naikwa</td><td>Robert</td><td>Mshitu</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>neema</td><td>afihini</td><td>ijani</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>NEEMA</td><td>C</td><td>SHAO</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Nuru</td><td>Saidi</td><td>Awadh</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Prosperia</td><td>Joseph</td><td>Luoga</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Rehema</td><td>Enock</td><td>Karova</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>REHEMA</td><td>ERICK</td><td>KABELEGE</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Ritha</td><td>Paul</td><td>Dimosso</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Robert</td><td>M</td><td>Magoma</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Rose</td><td>Marco</td><td>Ntambuto</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Samwel</td><td>Magita</td><td>Mwita</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Sangalala</td><td>Chikulupi</td><td>Mtingele</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Sarah</td><td>Michael</td><td>Lucumay</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Scolastica</td><td>Joseph</td><td>Bayongo</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Secilia</td><td>Felister</td><td>Luoga</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>SHABANI</td><td>SAIDI</td><td>NGULUPI</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Siaba</td><td>Hatibu</td><td>Mshana</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Simon</td><td>Kasian</td><td>Kazimbaya</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>SOPHIA</td><td>JOSEPH</td><td>MWASAMBOGO</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>SOPHIA</td><td>NAWANDO</td><td>BALISIDYA</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Sunday</td><td></td><td>Msaghaa</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Susan</td><td>Joseph</td><td>Moshi</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Swaleh</td><td>Suleiman</td><td>Mohamed</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Theresia</td><td>Leslie</td><td>Akidda</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>THOBIAS</td><td>NYAMBOTO</td><td>ODIEMBO</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Vedastus</td><td>Joseph</td><td>Masenga</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Wema</td><td>Erasto</td><td>Sindano</td><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>Amana Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Amina</td><td>Samwel</td><td>Mtanga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>511KJ Gongo la Mboto Dispensary</td><td>Army</td><td>Dispensary</td></tr><tr role="row"><td>Fausta</td><td>Bitson</td><td>Simfukwe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>511KJ Gongo la Mboto Dispensary</td><td>Army</td><td>Dispensary</td></tr><tr role="row"><td>Mwansada</td><td>Seif</td><td>Mgaya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>511KJ Gongo la Mboto Dispensary</td><td>Army</td><td>Dispensary</td></tr><tr role="row"><td>Veronica</td><td>Sixmund</td><td>Tilia</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>511KJ Gongo la Mboto Dispensary</td><td>Army</td><td>Dispensary</td></tr><tr role="row"><td>Ester</td><td></td><td>Kingazi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Arafa Ses Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Esterdina</td><td>Amon</td><td>Nicodem</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Aviation Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Flora</td><td>Metusela</td><td>Nkulila</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Bonyokwa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rosemary</td><td>Raphael</td><td>Temba</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Bonyokwa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Shukuru</td><td>Robert</td><td>Mwakatundu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Bonyokwa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Dominica</td><td>Flidolini</td><td>Mlaponi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Anglican Health Center</td><td>Faith Based Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Alexandrina</td><td>Michael</td><td>Kajuna</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Alvera</td><td>Andrew</td><td>Ntembelea</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Aurelia</td><td>Michael</td><td>Mushi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Bansa</td><td>Rahabu</td><td>Gwimile</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Beatrice</td><td>Elia</td><td>Mziray</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>David</td><td>Phim</td><td>Kihombo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Ernesta</td><td>Joseph</td><td>Mushi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Esther</td><td>Sweetbert</td><td>Milanzi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Fatuma</td><td>Hussein</td><td>Kiboma</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Hadija</td><td>Mohamed</td><td>Nyamungumi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Helena</td><td>Emanuel</td><td>Nyatto</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Irene</td><td>Elisante</td><td>Mmari</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Irene</td><td>Mbamkunda</td><td>Leodigard</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Isack</td><td>Daniel</td><td>Makundi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Jacqueline</td><td>Bhagaile</td><td>Maganga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Jalala</td><td>Iddi</td><td>Mapinda</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Jane</td><td>Maliaki</td><td>Marunda</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Janeth</td><td>Peter</td><td>Nyera</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Jesca</td><td>Eliabu</td><td>Sesuni</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Julius</td><td>Michael</td><td>Keto</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Luchia</td><td>Nelson</td><td>Pwele</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Marietha</td><td>Joseph</td><td>Haule</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Milka</td><td>Mathew</td><td>Mathania</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Msafiri</td><td>Mjata</td><td>Karata</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Mwamini</td><td>Ibrahim</td><td>Sengo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Ndonya</td><td>Hussein</td><td>Salumu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Neema</td><td>Bakari</td><td>Kingobi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Neema</td><td>Hussein</td><td>Mushi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Neema</td><td>Noah</td><td>Ntabaye</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Oliver</td><td>Bethuel</td><td>Mshanga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Peter</td><td>Mussa</td><td>Ntambi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Sharifa</td><td>Abdulhaman</td><td>Kalembo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Sina</td><td>John</td><td>Mjanga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Sophia</td><td>Ismail</td><td>Gwando</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Sponsor</td><td>Athanas</td><td>Mbilinyi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Stella</td><td>Nebath</td><td>Kasumba</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Violet</td><td>Imani</td><td>James</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Wallace</td><td>Caswell</td><td>Likonde</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Wema</td><td>Paul</td><td>Kyala</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>zaituni</td><td>ibrahim</td><td>godi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buguruni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Daniel</td><td>Raulian</td><td>Rwegasira</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buyuni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Daniel</td><td>Shija</td><td>Busumba</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buyuni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Felista</td><td>Felician</td><td>Matovu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buyuni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Florida</td><td>Alphonce</td><td>Mgaya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buyuni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Juma</td><td>Abdallah</td><td>Mpapi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buyuni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Maryselina</td><td>Mbonea</td><td>Maeda</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buyuni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Peter</td><td>Arestariki</td><td>Kavishe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Buyuni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Sr. Levina</td><td>Onesmo</td><td>Ntimba</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Cardinal Rugambwa  Hospital at District Level</td><td>Faith Based Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Adelina</td><td>Mwayalala</td><td>Alipipi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Barry</td><td>Saimoni</td><td>Fundi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Besta</td><td>Benidict</td><td>Sanga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Christina</td><td>Aldo</td><td>Kabonge</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Clavera</td><td>Cleophace</td><td>Mutarubukwa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Deogratias</td><td>Joseph</td><td>Haule</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Fatuma</td><td>Matola</td><td>Omari</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Flomeni</td><td>Swai</td><td>Andrew</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Hadija</td><td>Omari</td><td>Chamzimu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Herman</td><td>Honoratus</td><td>Lihako</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Joyce</td><td>Betram</td><td>Mnyani</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Joyce</td><td>Raphael</td><td>Mwampyate</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Monica</td><td>John</td><td>Msyani</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mwanyika</td><td>Mohamed</td><td>Mkwizu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Prisca</td><td>Mathias</td><td>Mwela</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rehema</td><td>Angetile</td><td>Musomba</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Sophia</td><td>Yona</td><td>Mwakila</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Thereza</td><td>Stephen</td><td>Balamtuma</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Chanika Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Joyce</td><td>Rashid</td><td>Nkalandula</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Dr. Hammeer Health Centre</td><td>Private Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Malosha</td><td>Shadrack</td><td>Katemi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Dr. Hammeer Health Centre</td><td>Private Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Salma</td><td>Abuu</td><td>Omary</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Dr. Hammeer Health Centre</td><td>Private Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Zuhura</td><td>Kibwana</td><td>Singano</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Dr. Hammeer Health Centre</td><td>Private Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Catherine</td><td>Francis</td><td>Akili</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gerezani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Leticia</td><td>Mutalemwa</td><td>Albert</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gerezani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Maisha</td><td>Ismail</td><td>Kawambwa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gerezani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mary</td><td>P.Stanford</td><td>Mpangala</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gerezani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rehema</td><td>Erick</td><td>Kabelege</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gerezani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Sophia</td><td>Aloyce</td><td>Keya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gerezani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Marietha</td><td>Maninsu</td><td>Alex</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gongo la Mboto Bahari Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Albertina</td><td>Philipo</td><td>Kumosa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gongo la mboto Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Eliwane</td><td>Jacob</td><td>Mande</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gongo la mboto Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Sarah</td><td>Paul</td><td>Mwafalo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gongo la mboto Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Togolani</td><td>Emanueli</td><td>Yohana</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Gongo la mboto Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Anna</td><td>Isaya</td><td>Kataimala</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Guluka kwa lala Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Christina</td><td>Hezron</td><td>Msule</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Guluka kwa lala Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Clara</td><td>William</td><td>Ndosi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Guluka kwa lala Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Aisha</td><td>Zuheri</td><td>Ali</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Idc Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Grace</td><td>Joseph</td><td>Sianga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Idc Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mwanahamisi</td><td>Mussa</td><td>Mkonga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Idc Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Shida</td><td>Guydon</td><td>Mpangala</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Idc Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Abinusi</td><td>Kazweba</td><td>Juma</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Adelhelma</td><td>Menas</td><td>Mwiga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Ajily</td><td>Mohamed</td><td>Kagambo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>ANNA</td><td>ISAYA</td><td>KATAIMALA</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Beatrice</td><td>Elam</td><td>Mbwilo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Edith</td><td>Martin</td><td>Kijazi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Ester</td><td>Ezekiel</td><td>Manase</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>frida</td><td>Francis</td><td>Mgaya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>HONEST</td><td>GABLIEL</td><td>LYMO</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Joyce</td><td>Heavenlight</td><td>Massawe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Never</td><td>Leopold</td><td>Malangalila</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Rehema</td><td>Rajabu</td><td>Rashidi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Sofia</td><td>Swalehe</td><td>Ntomola</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Stella</td><td>Ludovick</td><td>Mdutta</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Winfrida</td><td>Herman</td><td>Malongo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Ilala Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Faith</td><td>Jane</td><td>Magembe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kanisa la Mungu Dispensary</td><td>Faith Based Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Hadija</td><td>Ameiry</td><td>Ramadhani</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kimwani Ilala Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Anna</td><td>Daudi</td><td>Mpoli</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kinyerezi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Anthony</td><td>Samson</td><td>Zambi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kinyerezi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Gloria</td><td>Raphael</td><td>Mahenge</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kinyerezi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Gwantwa</td><td>Solomon</td><td>Mwambage</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kinyerezi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Jackline</td><td>Yunus</td><td>Katakata</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kinyerezi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Justina</td><td>George</td><td>Masanja</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kinyerezi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rogate</td><td>Ndetaiyo</td><td>Ayo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kinyerezi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Theresia</td><td>Fabian</td><td>Mkama</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kinyerezi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Vivian</td><td>Joseph</td><td>Temu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kinyerezi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Zuleha</td><td>Makame</td><td>Ally</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kinyerezi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Agripina</td><td>Thadeus</td><td>Mushi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kipawa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Joyce</td><td>Adam</td><td>Komba</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kipawa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Juster</td><td>John</td><td>Bwire</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kipawa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Saburi</td><td>Habibu</td><td>Mpumbita</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kipawa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Valerian</td><td>James</td><td>Mbweja</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kipawa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Veronica</td><td>Kassian</td><td>Mbonde</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kipawa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Ashura</td><td>Rashidi</td><td>Kawambwa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Doris</td><td>Abednego</td><td>Omolo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Hellena</td><td>Daniel</td><td>Ndanga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Imani</td><td>Samwel</td><td>Chanai</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Lettina</td><td>Jacob</td><td>Mgeni</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mwashabani</td><td>Juma</td><td>Shahah</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Naisoeli</td><td>Megroor</td><td>Dilli</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Nuru</td><td>Mathias</td><td>Mwangili</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Pili</td><td>Lusafisha</td><td>Masaga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rehema</td><td>Shabani</td><td>Allinoti</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Sigifrid</td><td>Francis</td><td>Shee</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Suzan</td><td>Raphael</td><td>Joseph</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Veronica</td><td>David</td><td>Mwiyoha</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Walta</td><td>Felix</td><td>Lupogo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Yonitha</td><td>Michael</td><td>Kamundi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mwanahawa</td><td>Mjata</td><td>Kika</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kitunda Relini Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Idda</td><td>Kassian</td><td>Kayombo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kivule Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Neema</td><td>Ezekiel</td><td>Mbafu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kivule Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Pulkeria</td><td>Frumence</td><td>Kinyaia</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kivule Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Queen</td><td>Eliakim</td><td>Masenga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kivule Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Salum</td><td>Mohamed</td><td>Muhando</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kivule Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Seraphia</td><td>Paulo</td><td>Lesso</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kivule Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Sophia</td><td>Ramadhani</td><td>Nkokoo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kivule Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Zuhura</td><td>Said</td><td>Mwanalito</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kivule Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Anitha</td><td>Amiri</td><td>Yekenya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Dorothy</td><td>Augustine</td><td>Mrekatete</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Dorothy</td><td>Venance</td><td>Itambu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Edina</td><td>Dominic</td><td>Mgongolwa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Happy</td><td>Kepher</td><td>Kunasa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Joseph</td><td>Kayuga</td><td>Robert</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Leila</td><td>Salum</td><td>Seif</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mercyline</td><td>Peter</td><td>Shoo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mohamedi</td><td>Juma</td><td>Nyanganyi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Neda</td><td>Ernest</td><td>Alberto</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Neema</td><td>Amos</td><td>Tilia</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Queen</td><td>Iloge</td><td>Lutufyo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Salome</td><td>Ashery</td><td>Mbilinyi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Salome</td><td>Mbwambo</td><td>Alfred</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Triphonia</td><td>Sangana</td><td>Mhagama</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Umbanaeli</td><td>Eliaika</td><td>Swai</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Zenais</td><td>Augusti</td><td>Malle</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Kiwalani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Asha</td><td>Achi</td><td>Shekulavu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Majohe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Bertha</td><td>Kanon</td><td>Nkuba</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Majohe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Fidea</td><td>Antony</td><td>Haule</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Majohe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Hendrieta</td><td>Erasto</td><td>Chonjo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Majohe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Joyce</td><td>Joseph</td><td>Mayila</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Majohe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Latifa</td><td>Abdallah</td><td>Mfangavo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Majohe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Nyendo</td><td>David</td><td>Mzuli</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Majohe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>oscar</td><td>laiton</td><td>Kanugwe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Majohe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Tatu</td><td>Omari</td><td>Makiya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Majohe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Grasia</td><td>Livinus</td><td>Mtewele</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mivuleni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Abdulaziz</td><td>Hussein</td><td>Mnenwa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Agnes</td><td>John</td><td>Salewa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Agripina</td><td>Hugho</td><td>Massawe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Albentina</td><td>Method</td><td>Mwinuka</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Annah</td><td>John</td><td>Ngururi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Asia</td><td>Kassim</td><td>Sappa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Banjobile</td><td>Anyimike</td><td>Masika</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Bertha</td><td>Nalogwa</td><td>Solomon</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Edith</td><td>Manase</td><td>Mboga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Edna</td><td>Andrew</td><td>Kiondo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Elirehema</td><td>Abraham</td><td>Kajiru</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Elizabeth</td><td>Christpher</td><td>Mwaimu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Elizabeth</td><td>Mbekenga</td><td>Mshana</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Esther</td><td>Stephano</td><td>Masaka</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Felician</td><td>Romanus</td><td>Haule</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Fortunata</td><td>Felician</td><td>Ismail</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Getrude</td><td>Emanuel</td><td>Mollel</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Grace</td><td>John</td><td>Mgema</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Grace</td><td>Meindrad</td><td>Millanzi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Hawa</td><td>Kassim</td><td>Mbena</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Hussein</td><td>Katana</td><td>Mugyabuso</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Jackline</td><td>Bartalome</td><td>Saguti</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Jane</td><td>Peter</td><td>Makabali</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Joyce</td><td>Kahamba</td><td>Mwambije</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Julius</td><td>Ferdinand</td><td>Fupi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Jutilia</td><td>Damiani</td><td>Maina</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Lucy</td><td>Edward</td><td>Mkalle</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Magreth</td><td>L</td><td>Ibobo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mahija</td><td>Ally</td><td>Mashombo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Maria</td><td>William</td><td>Mgusii</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mary</td><td>Hajra</td><td>Kiungai</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mary</td><td>Jairus</td><td>Sobayi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mary</td><td>Zephania</td><td>Mgandi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Matilda</td><td>Raphael</td><td>Kihanga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mwasu</td><td>Mbonafingi</td><td>Mwikola</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Nasra</td><td>Salum</td><td>Gumbo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Richard</td><td>Niyo</td><td>Murihano</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Rose</td><td></td><td>Mbeyela</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Rose</td><td>Augusti</td><td>Meela</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Rose</td><td>Emanuel</td><td>Makaidi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Salama</td><td>Robert</td><td>Masanja</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Salima</td><td>Ally</td><td>Kisenga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Sikudhani</td><td>Shonje</td><td>Yotham</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Sophia</td><td>Lameck</td><td>Mgaya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Stella</td><td>Mambea</td><td>Mshana</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Tabu</td><td>Halfan</td><td>Kimaro</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Ukende</td><td>Julius</td><td>Makalla</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Vicky</td><td>Sindyanga</td><td>Mwabaleke</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Wagesa</td><td>Secunda</td><td>Wambura</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Yusta</td><td>Geryson</td><td>Kitomo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mnazi Mmoja Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Agripina</td><td>Anselmi</td><td>Mushi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mongo la Ndege Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Edda</td><td>Stephano</td><td>Sife</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mongo la Ndege Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Fransis</td><td>Selestine</td><td>Malsel</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mongo la Ndege Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Herswida</td><td>Menans</td><td>Ndunguru</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mongo la Ndege Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Jesca</td><td>Robert</td><td>Barabara</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mongo la Ndege Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Lilian</td><td>Rumisha</td><td>Rumisha</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mongo la Ndege Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Safiel</td><td>John</td><td>Elienea</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mongo la Ndege Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Salome</td><td>Emmanuel</td><td>Silungwe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mongo la Ndege Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Esther</td><td>Jacob</td><td>John</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Msongola Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Esther</td><td>Robert</td><td>Lugendo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Msongola Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Haiba</td><td>kiluwi</td><td>Wanguvu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Msongola Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Hassan</td><td>Mohamedi</td><td>Mbwana</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Msongola Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Kandida</td><td>Paschal</td><td>Chalamila</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Msongola Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Njili</td><td>Kajakelu</td><td>Mwangosi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Msongola Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Salome</td><td>Gasper</td><td>Kweka</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Msongola Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Tunu</td><td>David</td><td>Chileweji</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Msongola Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Betty</td><td>Salum</td><td>Kiwelu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mvuti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Faustina</td><td>Faustine</td><td>Mutagwa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mvuti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Gema</td><td>ALex</td><td>Shao</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mvuti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Gloria</td><td>Jeremia</td><td>Mkumbwa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mvuti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Munde</td><td>Nchembi</td><td>Lupugo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mvuti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Sharifu</td><td>Rashid</td><td>Nihuka</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mvuti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Suleiman</td><td>Kombo</td><td>Faki</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Mvuti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Blandina</td><td>Michael</td><td>Ntiriniga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Pugu Kajiungeni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Gloria</td><td>Anna</td><td>Majiyapwani</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Pugu Kajiungeni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MASHAVU</td><td>JUMA</td><td>MKAYALA</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Pugu Kajiungeni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MWAJUMA</td><td>MOHAMED</td><td>MSAFIRI</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Pugu Kajiungeni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SABINA</td><td>JOSHUA</td><td>MASSAY</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Pugu Kajiungeni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Stella</td><td>Justinian</td><td>Rwangoga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Pugu Kajiungeni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Coletha</td><td>Joseph</td><td>Kambona</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Elida</td><td>Josephat</td><td>Mambo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Khazama</td><td>Saidi</td><td>Khamadi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LATIFA</td><td>Adam</td><td>Kilasi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Loyce</td><td>Ng''washi</td><td>Izengo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MBOKA</td><td>BURTON</td><td>LUTENGANO</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Naomi</td><td>Hamisi</td><td>Mwangake</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Nayela</td><td>Linda</td><td>Missingo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Pendo</td><td>William</td><td>Eliya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rufina</td><td>Selestino</td><td>Tawete</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Theodora</td><td>Peter</td><td>Bidaa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Segerea Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Amina</td><td>Twaha</td><td>Mchawa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Asha</td><td>Athumani</td><td>Mlanza</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Beatrice</td><td>Mhumba</td><td>Marandu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Bertha</td><td>Anthony</td><td>Kagile</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Chiku</td><td>Sudi</td><td>Simba</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Coletha</td><td>Alphonsi</td><td>Mgaya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Elizabeth</td><td>Bernadi</td><td>Adamu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Evelyn</td><td>Wilson</td><td>Zagwi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Grace</td><td>Isaya</td><td>Bakari</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Judith</td><td>Stephano</td><td>Rugambuka</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LAMLA</td><td>MOHAMEDI</td><td>NGONYANI</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Lilian</td><td>Daniel</td><td>Misigaro</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Madeva</td><td>Pia</td><td>Lucas</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Modest</td><td>Betold</td><td>Mwinuka</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mwantumu</td><td>Ally</td><td>Magota</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Paul</td><td>Daniel</td><td>Mtei</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Regina</td><td>Thomas</td><td>Uronu</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Thadeus</td><td>Valentine</td><td>Makwanda</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Zaituni</td><td>Linus</td><td>Mayembe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata A Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Lucy</td><td>John</td><td>Ngambira</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata Kisiwani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Redemta</td><td>Pastory</td><td>Bamnoba</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata Kisiwani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Zainabu</td><td>Iddi</td><td>Msigwa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata Kisiwani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Alfa</td><td>Shedrack</td><td>Foya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Anna</td><td>V</td><td>Sembe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Asha</td><td>Ahmadi</td><td>Bungala</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Ashura</td><td>Salum</td><td>Kimera</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Burton</td><td>Anzanukye</td><td>Ngewe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Celina</td><td>Benognus</td><td>Kaundila</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Consolata</td><td>Rainald</td><td>Chiee</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Elifinya</td><td>Reuben</td><td>Mafie</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Fatuma</td><td>Shabani</td><td>Mawona</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Flora</td><td>Amos</td><td>Mwangusa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Happiness</td><td>Aloyce</td><td>Luena</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Magreth</td><td>Elia</td><td>Kazimoto</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Martha</td><td>Charles</td><td>Gwanchele</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mwajuma</td><td>Amiri</td><td>Byarugaba</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Neema</td><td>Joseph</td><td>Ndunguru</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Pamela</td><td>Peter</td><td>Kidodo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Semeni</td><td>Ally</td><td>Mtauka</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Tabata NBC Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Anacleta</td><td>Joseph</td><td>Kisanga</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Beatrice</td><td>Ndekeza</td><td>Mhazi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Berlina</td><td>Nyakunga</td><td>Job</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Betty</td><td>David</td><td>Msigwa</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Edwin</td><td>Regnald</td><td>Mang''ongo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Frida</td><td>Francis</td><td>Mgaya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Jovina</td><td>Celestine</td><td>Tibamanya</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Kissa</td><td>Joseph</td><td>Mwangomo</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Lailath</td><td>Athumani</td><td>Mbaraka</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Numpe</td><td>Lott</td><td>Seme</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Prisca</td><td>James</td><td>Bujiku</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rehema</td><td>Rajab</td><td>Rashid</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Ruwaichi</td><td>Thomas</td><td>Kitiwi</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Selina</td><td>Saimon</td><td>Mirumbe</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Tabu</td><td>Hemed</td><td>Ponela</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Vingunguti Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Lily</td><td>Frank</td><td>Mwakalebela</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Yongwe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Dotto</td><td>Mazengo</td><td>Kashinje</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Zingiziwa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Paulina</td><td>Paul</td><td>Konso</td><td>Dar Es Salaam Region</td><td>Ilala Municipal Council</td><td>Zingiziwa Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>DOMINICA</td><td>CONSTANTINO</td><td>MFAUME</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Buyuni Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Gladys</td><td>Rick</td><td>Kaduri</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Buyuni Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NEEMA</td><td>SAMSON</td><td>MANYAMA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Buyuni Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PAULO</td><td>BOAY</td><td>KARENGI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Buyuni Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>TINDWA</td><td>PIUS</td><td>TINDWA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Buyuni Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Regina</td><td>METHEW</td><td>Nongo</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Chekeni mwasonga Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EVA</td><td>JOSEPH</td><td>SAMBAI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Gezaulole Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MONICA</td><td>CHACHA</td><td>PAUL</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Gezaulole Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NIENDIWE</td><td>KIONDO</td><td>AYO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Gezaulole Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Agnes</td><td>Bahati</td><td>Ahazi</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Gomvu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Evelin</td><td>Cathibeth</td><td>Martin</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Gomvu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EVELINE</td><td>CATHIBERT</td><td>MARTIN</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Gomvu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>William</td><td>George</td><td>Martin</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Gomvu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Anna</td><td>Elia</td><td>Mangi</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibada Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>GRACEANA</td><td>NDAWHIBA</td><td>MONDO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibada Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ISABELA</td><td>SAMMEL</td><td>IPOPO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibada Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MAGRETI</td><td>RUMISHA</td><td>MALEKO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibada Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mboza</td><td>M.</td><td>Kaghembe</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibada Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MOHAMED</td><td>SALIM</td><td>HAMAD</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibada Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NETTY</td><td>NAMSHAN</td><td>CHANDE</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibada Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SELINA</td><td>SELINA</td><td>KAPAMA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibada Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>AGNES</td><td>JOSEPH</td><td>MOKIWA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibugumo Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>BEATRICE</td><td>ZENO</td><td>KOMBA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibugumo Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EMMANUEL</td><td>DAWSON</td><td>TEMU</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kibugumo Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ALLY</td><td>ABDALLAH</td><td>KUMBUKA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>ANCILLA</td><td>ROGASTIAN</td><td>LASWAI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Angelita</td><td>Pantaleo</td><td>kirway</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>DAFRES</td><td>PETER</td><td>CHIRWA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Deodata</td><td>Antoni</td><td>Magoda</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>ESTER</td><td>Ephraim</td><td>LUTANJUKIRWA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>EVELYNE</td><td>CHRISTOPHER</td><td>TUPPA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Faourz</td><td>Muhamed</td><td>Marzouk</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>GLORY</td><td>DICKSON</td><td>MAGOMA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Grace</td><td>Erioth</td><td>Kiswaga</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Grace</td><td>Isack</td><td>Kabenian</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>JOSEPH</td><td>MWINGA</td><td>MWERA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>khwaima</td><td>PAULO</td><td>MAO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>LEVINA</td><td>NICCO</td><td>MASISA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>MARIAM</td><td>KHAMIS</td><td>OMARY</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>monica</td><td>CASTORY</td><td>MORIS</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>MONICA</td><td>THADEI</td><td>JOHN</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>NURU</td><td>MATHIAS</td><td>MWANGILI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>PETER</td><td>JOHN</td><td>WAWAE</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>REGINA</td><td>BERNARD</td><td>MAGANI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Rose</td><td>Komalija</td><td>Nyakaka</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Ruth</td><td>Ernest</td><td>Pokela</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>RUTH</td><td>PHILIBERT</td><td>MHANDO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>WINFRIDA</td><td>GODFREY</td><td>MBWAMBO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>BERTHA</td><td>ALOYCE</td><td>MATIYA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>DORICE</td><td>MELCHIOR</td><td>BATULAINE</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kigamboni Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>EMMANUEL</td><td>ROBERT</td><td>GREGORY</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kimbiji Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Fatina</td><td>Athuman</td><td>Chambo</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kimbiji Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Mwafitina</td><td>Habibu</td><td>Ponza</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kimbiji Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>YUSTINA</td><td>DAWITE</td><td>SUMAYE</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kimbiji Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>BONAVITHA</td><td>NICKODEMUS</td><td>MWANKEMWA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kisarawe II Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LILIANI</td><td>NASHON</td><td>MOSIMBETE</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kisarawe II Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NTABULI</td><td>EPHRAIMU</td><td>MWALUKUTA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kisarawe II Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Pericia</td><td>Brown</td><td>Mwaituka</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Kisarawe II Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EGILIA</td><td>TIDO</td><td>MBUNDA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Mbutu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>KALISTA</td><td>SILVESTA</td><td>WAYA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Mbutu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>CATHERINE</td><td>MARTIN</td><td>MTUI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Mjimwema Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>UPENDO</td><td>FREDY</td><td>MWAMBULAMBO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Mjimwema Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NDAMBA</td><td>DEOGRATIUS</td><td>SIGONDA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Mkamba Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Lega</td><td>Komanya</td><td>Mabondo</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Mwongozo Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MICHAEL</td><td>KILONZO</td><td>MCHOME</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Nunge Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rose</td><td></td><td>Mahundi</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Nunge Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>AMBONISYE</td><td>ZAMBIA</td><td>SIGARA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Tundwi Songani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mwajuma</td><td>Miraji</td><td>Juma</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Tundwi Songani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PETRO</td><td>AKONAAY</td><td>NG''AYDA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Tundwi Songani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SHEMSIA</td><td>SELEMAN</td><td>HASSAN</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Tundwi Songani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>AMINA</td><td>ABASI</td><td>KINYASI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Anastasia</td><td>Vicent</td><td>Chakumba</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>CAROLINE</td><td>DANIEL</td><td>KUMBI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>CONSOLATA</td><td>COSTANTIN</td><td>MBEYA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>DAVID</td><td>MANYAMA</td><td>NYAMBAYA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EMMANUEL</td><td>MATHIAS</td><td>PETRO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EPIFANIA</td><td>CYPRIAN</td><td>MYAMBA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ESTER</td><td>PAUL</td><td>GODFREY</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FESTIDO</td><td>FRANCIS</td><td>MWAISUMO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Gift</td><td>Kumbakumba</td><td>Luis</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>HASSANALI</td><td>ABDU</td><td>MSUYA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JAMILA</td><td>MSHAMU</td><td>MWIRU</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Joana</td><td>Iddi</td><td>Mshana</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JOHN</td><td>EMMANUEL</td><td>MGONJA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JOHN</td><td>HIZA</td><td>LUKINDO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JOYCE</td><td>LEONARD</td><td>MKOMA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Judith</td><td>Godlove</td><td>Katemba</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>KHADIJA</td><td>MUSSA</td><td>ALAWI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MAGDALENA</td><td>JOHN</td><td>MSAMBAZI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Maimuna</td><td>Awadhi</td><td>Mwaya</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARIA</td><td>MICHAELA</td><td>MADIYA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARYLINE</td><td>JACOB</td><td>MOSHI</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MWANLALI</td><td>MOHAMED</td><td>QULLATEN</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NURU</td><td>CHARLES</td><td>NDOMONDO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PENDO</td><td>JOSEPH</td><td>SINGU</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PRISCA</td><td>FLORENCE</td><td>MJATA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>REHEMA</td><td>CHARLES</td><td>NYACHUMA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>RHODA</td><td>EXAUD</td><td>SANGA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>RIGOBERT</td><td>EVERIST</td><td>DIMOSO</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>RUTH</td><td>SHADRACK</td><td>MWAIPONYA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Sarah</td><td>FELISTER</td><td>Kadula</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Sophia</td><td>Said</td><td>Selemani</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Subira</td><td>Salehe</td><td>Mipiko</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SUZANA</td><td>PETER</td><td>CHUWA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Teodora</td><td>Said</td><td>Lusinge</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>UPENDO</td><td>BATISTA</td><td>MLAWA</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Wesiko</td><td>John</td><td>Shagembe</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ZAINABU</td><td>MASSONG</td><td>WAHARU</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Vijibweni Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FAUSTINE</td><td>HAMISI</td><td>BARACK</td><td>Dar Es Salaam Region</td><td>Kigamboni Municipal Council</td><td>Yaleyale Puna Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Asha</td><td>Mohamed</td><td>Nalino</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>AIF Huduma Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Joshua</td><td>Kigungi</td><td>Mbwambo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Arafa Uzuri Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>CATHERINE</td><td>JERADI</td><td>MAJALA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Boko Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ELIZABETH</td><td>PHILIPO</td><td>MAMO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Boko Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>GODLOVE</td><td>NYAMAYOYO</td><td>MAGAFU</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Boko Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JAQUELINE</td><td>MATHEW</td><td>NYANGE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Boko Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LIDES</td><td>PIUS</td><td>MLAGILA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Boko Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Maria</td><td>Ephraim</td><td>Mwamanda</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Boko Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mary</td><td>Emmanuel</td><td>Chapote</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Boko Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Ahmed</td><td>Mohamed</td><td>Sebao</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ANNA</td><td>NELSON</td><td>NKANDA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Asha</td><td>Mohamed</td><td>Nalimo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Catherine</td><td>John</td><td>Mganga</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Josephine</td><td>Albert</td><td>Shirima</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARYEMANUELA</td><td>ROGATI</td><td>TAIRO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Meinedorah</td><td>Hilary</td><td>Duhu</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MONICA</td><td>MAKANGE</td><td>HOSEA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mwanamvua</td><td>Mzee</td><td>Challo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PAMELA</td><td>WINSTONE</td><td>ARIWA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Theresia</td><td>chacha</td><td>chacha</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Theresia</td><td>Lucas</td><td>Ngonyani</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>VICTORIA</td><td>APOLINARY</td><td>MASHWEKO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>YUSTER</td><td>THOMAS</td><td>MALLYA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Bunju 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Ericadia</td><td>Ignas</td><td>Kikoti</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Edward Michaudi Health Center</td><td>Faith Based Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Genesi</td><td>Mushobozi</td><td>Mukurasi</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Edward Michaudi Health Center</td><td>Faith Based Facilities</td><td>Health Centre</td></tr><tr role="row"><td>NYANTONDO</td><td>MWITA</td><td>MANYAMA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Hananasif Dispensary</td><td></td><td></td></tr><tr role="row"><td>ANNA</td><td>BENEDICTO</td><td>KAZUMBA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Hananasif	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Emelda</td><td>James</td><td>Nasson</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Hananasif	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Irene</td><td>Shangwel</td><td>Mbwambo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Hananasif	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rehema</td><td>Leonard</td><td>Mrope</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Hananasif	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SALOME</td><td>STEPHANI</td><td>LYAO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Hananasif	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SHOMARI</td><td>ALLY</td><td>CHAOGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Hananasif	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>BEATRICE</td><td>DISMAS</td><td>NYENZA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>JS Babhra Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>CONSOLATA</td><td>ALBERT</td><td>BEBWA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>JS Babhra Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>DORA</td><td>JANETH</td><td>NTEMO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>JS Babhra Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>THERESIA</td><td>JOHN</td><td>AMASSY</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>JS Babhra Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ALCHARD</td><td>DOMISIAN</td><td>KAKIZIBA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kambangwa Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Arafa</td><td>Juma</td><td>Nyanganyi</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kambangwa Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>BERNADETHA</td><td>AIDANI</td><td>MWAKIFWAMBA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kambangwa Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Cornelia</td><td>Thadeus</td><td>Salumondo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kambangwa Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>FATUMA</td><td>SAIDI</td><td>ALMAS</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kambangwa Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>LINA</td><td>ASSENGA</td><td>GENES</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kambangwa Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Nietiwe</td><td>Eliewaka</td><td>Kirumbi</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kambangwa Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Noelina</td><td>Paul</td><td>Tegete</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kambangwa Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Norbertha</td><td>Maurus</td><td>Kayombo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kambangwa Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Octavian</td><td>Maremia</td><td>Assey</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kambangwa Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Flora</td><td>Godfrey</td><td>Mziray</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kawe 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Happiness</td><td>John</td><td>Mkumbo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kawe 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JACQULINE</td><td>THOMAS</td><td>KESSY</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kawe 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>REHEMA</td><td>SAID</td><td>SEIF</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kawe 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SULEIMAN</td><td>MICHAEL</td><td>ABRAHAM</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kawe 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>VERAH</td><td>JEREMIAH</td><td>MULAKI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kawe 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ZINDUNA</td><td>JUMA</td><td>MKELE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kawe 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ABDULHALIM</td><td>MUDRICK</td><td>ISMAIL</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kigogo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EMMANUEL</td><td>NATHANAEL</td><td>KOMBE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kigogo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>GRACE</td><td>HUGO</td><td>NGONYANI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kigogo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SALEHE</td><td>AMINI</td><td>KINYORO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kigogo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>DAMARIS</td><td>AMANDI</td><td>NYAMONDO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kijitonyama Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ELIZABETH</td><td>PETER</td><td>SILWIMBA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kijitonyama Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FAUSTA</td><td>PAUL</td><td>MALLYA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kijitonyama Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>HONESTA</td><td>YORDAN</td><td>NSUHA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kijitonyama Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JOAKIM</td><td>THADEI</td><td>HAULE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kijitonyama Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LUCY</td><td>CORNEL</td><td>IRIYA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kijitonyama Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PILLY</td><td>ABDULAKARIM</td><td>SIJAONA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kijitonyama Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rose</td><td>Henry</td><td>Temu</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kijitonyama Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SECILIA</td><td>FELISTER</td><td>LUOGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kijitonyama Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ZAHARAN</td><td>STUARTY</td><td>SHANGALI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kijitonyama Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Juliana</td><td>Douglas</td><td>Maduhu</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kimara Central Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Agnes</td><td>Nicholaus</td><td>Mgaya</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kinondoni Municipal Council</td><td></td><td></td></tr><tr role="row"><td>CHIKU</td><td>ERASTO</td><td>MAZIKU</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kinondoni Municipal Council</td><td></td><td></td></tr><tr role="row"><td>LINDAEL</td><td>EPHRAEM</td><td>KARAMA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kinondoni Municipal Council</td><td></td><td></td></tr><tr role="row"><td>MAKALA</td><td>YESAYA</td><td>NEJA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kinondoni Municipal Council</td><td></td><td></td></tr><tr role="row"><td>Nusura</td><td>Simba</td><td>Kessy</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kinondoni Municipal Council</td><td></td><td></td></tr><tr role="row"><td>Sanura</td><td>Hamis</td><td>Kondo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kinondoni Municipal Council</td><td></td><td></td></tr><tr role="row"><td>SIENA</td><td>CORNEL</td><td>LWIWA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kinondoni Municipal Council</td><td></td><td></td></tr><tr role="row"><td>Rebecca</td><td>Noah</td><td>Mbilli</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Beach Health Center</td><td>Private Facilities</td><td>Health Centre</td></tr><tr role="row"><td>BEATRICE</td><td>WILLIAM</td><td>MUSHI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>HAWA</td><td>CHATANG''OMBE</td><td>SANGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Jane</td><td>Patrick</td><td>Mtenga</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LUSEKELO</td><td>JOSHUA</td><td>MWAKYELU</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MOSHI</td><td>SAID</td><td>NYANDUGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NATIHAIKA</td><td>EMMANUEL</td><td>MRIMIA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NYEMO</td><td>FRANCIS</td><td>MAZANDA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PAULINA</td><td>THADEUS</td><td>MAO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PERPETUA</td><td>PROCHES</td><td>SHAYO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Prisca</td><td>Donath</td><td>Shirima</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Tumaini</td><td>Nkenja</td><td>Semu</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Kunduchi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ASHA</td><td>RAJAB</td><td>MFINANGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mabwepande	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Christowelu</td><td>Onesphoro</td><td>Mande</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mabwepande	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FARIDA</td><td>IBRAHIM</td><td>RAMADHANI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mabwepande	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FAT-HIYA</td><td>MOHAMED</td><td>AMRI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mabwepande	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JULIANA</td><td>DOUGLAS</td><td>MADUHU</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mabwepande	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Paulina</td><td>Charles</td><td>Ndwela</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mabwepande	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Doroles</td><td>Dismas</td><td>Msilu</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Madale Dispensary</td><td></td><td></td></tr><tr role="row"><td>MARCK</td><td>CHRISTIAN</td><td>KIMARIO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Madale Dispensary</td><td></td><td></td></tr><tr role="row"><td>ANNA</td><td>PETER</td><td>MBYAMA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Madale	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PRUDENCE</td><td>MUGYABUSO</td><td>RWEJUNA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Madale	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>UKENDE</td><td>MIGUNGA</td><td>DYELU</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Madale	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>BAKITA</td><td>EMMANUEL</td><td>LUOGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>CATHERINE</td><td>RAPHAEL</td><td>SEMIZIGI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>CHESCA</td><td>YOHANES</td><td>MBILINYI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>DIANA</td><td>NELSON</td><td>MUNG''ONG''O</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>EILEEN</td><td>DAVID</td><td>WANDI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>ESTHER</td><td>EMMANUEL</td><td>KOMBA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>HAMIDA</td><td>ERNESIA</td><td>SENDAMA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>HAPPINESS</td><td>WIMILE</td><td>MBEYELA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Johnmary</td><td>Rweyumiza</td><td>Rugayana</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>JUDITH</td><td>PAUL</td><td>MWAKIPESILE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Sarah</td><td>John</td><td>Simama</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>STELLA</td><td>JOSEPH</td><td>KIVUGO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>SUZAN</td><td>DAVIS</td><td>MABEBA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>VERONICA</td><td>DOMINICK</td><td>MSANGI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Magomeni 	Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>LUCY</td><td>SIMON</td><td>KAPELA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Makongo Juu.	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARIAM</td><td>BETHOD</td><td>MSAKA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Makongo Juu.	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Neema</td><td>Joel</td><td>Matimbi</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Makongo Juu.	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SECILIA</td><td>BENSON</td><td>GISUNTE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Makongo Juu.	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Theresia</td><td>Sabas</td><td>Shayo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Makongo Juu.	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Albertina</td><td>James</td><td>Maerere</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Marie Stopes Hospital Mwenge</td><td>Private Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Aldan</td><td>Steven</td><td>Chale</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Marie Stopes Hospital Mwenge</td><td>Private Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Arafa</td><td>Mabrouk</td><td>Haji</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Marie Stopes Hospital Mwenge</td><td>Private Facilities</td><td>Hospitals</td></tr><tr role="row"><td>eliambuya</td><td>Eliasauti</td><td>Tenga</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Marie Stopes Hospital Mwenge</td><td>Private Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Emmiliana</td><td>Mackirman</td><td>Woisso</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Marie Stopes Hospital Mwenge</td><td>Private Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Jane</td><td>Awscar</td><td>Lyimo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Marie Stopes Hospital Mwenge</td><td>Private Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Sarah</td><td>Bethuel</td><td>Massam</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Marie Stopes Hospital Mwenge</td><td>Private Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Vida</td><td>Hubert</td><td>Kisamo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Marie Stopes Hospital Mwenge</td><td>Private Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Annande</td><td>Ezekiel</td><td>Kombe</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Masana   Hospital at District Level</td><td>Private Facilities</td><td>Hospitals</td></tr><tr role="row"><td>HUSNA</td><td>YUSUPH</td><td>MWANGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Masana   Hospital at District Level</td><td>Private Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ALPHONCINA</td><td>PAUL</td><td>KESSY</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbopo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ELIZABETH</td><td>JOACHIM</td><td>SHAYO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbopo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Esther</td><td>Francis</td><td>Mwone</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbopo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JOYCE</td><td>LISUNGU</td><td>MAKULUNI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbopo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>RIGHTNUS</td><td>DUNIA</td><td>ALBOGAST</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbopo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>VAILETY</td><td>EMMANUEL</td><td>BETTY</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbopo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>YASINTA</td><td>JONATHAN</td><td>MWAILUBI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbopo 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Anna</td><td>Samweli</td><td>Malundi</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbweni Dispensary</td><td></td><td></td></tr><tr role="row"><td>Grencia</td><td>Nuhu</td><td>Ndimugwango</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbweni Dispensary</td><td></td><td></td></tr><tr role="row"><td>BEATA</td><td>NURU</td><td>SHABANI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbweni 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Ernesta</td><td>Sabasi</td><td>Kavishe</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbweni 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ROSE</td><td>ADAMSON</td><td>KALINGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbweni 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ELIEKA</td><td>MARKO</td><td>NYITI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbweni Mpiji</td><td>Public Facilities</td><td></td></tr><tr role="row"><td>Neema</td><td>Thobias</td><td>Mzava</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mbweni Mpiji</td><td>Public Facilities</td><td></td></tr><tr role="row"><td>Asha</td><td>Shabani</td><td>Phopola</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mlalakuwa	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>BAHATI</td><td>KABALIKA</td><td>HUMPHREY</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mlalakuwa	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Gaudensia</td><td>Nestory</td><td>Kato</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mlalakuwa	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JESCA</td><td>JEREMIA</td><td>BUNYAGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mlalakuwa	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>YAHYA</td><td>JUMA</td><td>MAKOA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mlalakuwa	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LUCY</td><td>GILBERT</td><td>SUBETH</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mpiji Mbweni Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Winifida</td><td>Pantaleo</td><td>Gabu</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mpiji Mbweni Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Amina</td><td>Ahmed</td><td>Farahani</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mwenge	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>CATHERINE</td><td>PAUL</td><td>MRERWA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mwenge	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EVA</td><td>AUGUST</td><td>MTUI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mwenge	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FELISTA</td><td>ANDREW</td><td>MARCO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mwenge	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>KARIMU</td><td>RAJABU</td><td>KIHIMBWA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mwenge	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>KHAIROON</td><td>ABDULKADIR</td><td>MOHAMED</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mwenge	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NAOMI</td><td>PETER</td><td>TABUSE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mwenge	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>RAJABU</td><td>ISSA</td><td>WAZIRI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mwenge	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SEVELINA</td><td>MHOYA</td><td>PAUL</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mwenge	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>TABU</td><td>ALLY</td><td>MVOMELA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mwenge	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ALI</td><td>KHAMISI</td><td>ABDULLAH</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mzimuni Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Baseki</td><td>Thomas</td><td>Masondole</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mzimuni Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>HAPPY</td><td>CHARLES</td><td>AMIR</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mzimuni Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>JUSTUS</td><td>BONIFACE</td><td>KARUNGULA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mzimuni Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>LILIAN</td><td>CHRISTOPHER</td><td>MSELEMU</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mzimuni Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>MARY</td><td>DAVID</td><td>MAKALA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mzimuni Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>RHODA</td><td>MWAIHOJO</td><td>MWAITUKA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Mzimuni Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>MARIA</td><td>VINCENT</td><td>KAVULA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ndumbwi Dispensary</td><td></td><td></td></tr><tr role="row"><td>ANGELINA</td><td>FRANCIS</td><td>KIJAZI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ndumbwi	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Chrispine</td><td>Tungaraza</td><td>Charles</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ndumbwi	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FRANK</td><td>ALERINGWA</td><td>MUSHI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ndumbwi	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SOPHIA</td><td>HEMEDI</td><td>KASUBI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ndumbwi	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>THERESIA</td><td>SIKUKUU</td><td>SHAURI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ndumbwi	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Bahati</td><td>K</td><td>Humphrey</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>New Msasani Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Ester</td><td>Danton</td><td>Nyondo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>New Msasani Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ASHA</td><td>ISHENGOMA</td><td>MOHAMED</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Oysterbay Police	Clinic</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mwanaidi</td><td>Hussein</td><td>Tuwa</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Oysterbay Police	Clinic</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NAOMISOPHIA</td><td>JOSHUA</td><td>MWAMBOLA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Oysterbay Police	Clinic</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Wendo</td><td>Lameck</td><td>Machimo</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Oysterbay Police	Clinic</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ALPHA</td><td>SIDNEY</td><td>IBIDA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Salasala Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>AMBASIA</td><td>MATHEW</td><td>MARIKI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Salasala Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JONESIA</td><td>JULIUS</td><td>KAYUNGI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Salasala Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PRISCA</td><td>TADEI</td><td>TARIMO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Salasala Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ZAWIA</td><td>MOHAMED</td><td>ISSA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Salasala Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mary</td><td>Paulo</td><td>Ndowa</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>St. Brendan Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Saada</td><td>Yahaya</td><td>Kasera</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>St. Brendan Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>DEODATUS</td><td>NKOYERA</td><td>MZIGO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MWAJUMA</td><td>HAMADI</td><td>MFANGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Agnes</td><td>William</td><td>Baluwa</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>AMINA</td><td>MIRAJI</td><td>MBWESO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>Atuganile</td><td>JOSEPH</td><td>Mwakalesi</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>ATUGANILE</td><td>LUHILILA</td><td>MWAKALESI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>BLANDINA</td><td>FRANCIS</td><td>KIJAZI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>DAVID</td><td>FANUEL</td><td>LIGATE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>DAVINETH</td><td>BYERA</td><td>LAMECK</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>EMMANUEL</td><td>JOSEPH</td><td>KAZIMOTO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>FATMA</td><td>JUMA</td><td>WATANDA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>FLORAH</td><td>REMIGIUS</td><td>KAPINGA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>JOYCE</td><td>NUNGU</td><td>MKIKA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>KILIZA</td><td>YUSUPH</td><td>KABANGE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>MANDELA</td><td>CHARLES</td><td>CHITONGO</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>Merina</td><td>Danford</td><td>Nkullua</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>MWANAMVUA</td><td>AMANZI</td><td>HAMISI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>RAJABU</td><td>AHMED</td><td>MWASUMILWE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>RASHID</td><td>HASSAN</td><td>KISHIMBA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>TRIPHONIA</td><td>MAGNUS</td><td>CHALAMILA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tandale Health Center</td><td></td><td></td></tr><tr role="row"><td>FARAJA</td><td>SILAS</td><td>MGANA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tegeta Dispensary</td><td></td><td></td></tr><tr role="row"><td>Annastasia</td><td>Moses</td><td>Kannonyele</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tegeta 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FATINA</td><td>KOKULEBA</td><td>ISMAIL</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tegeta 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FLORIDA</td><td>KATABALI</td><td>MPONDA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tegeta 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FORTUNATA</td><td>MARTIN</td><td>MUGARULA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tegeta 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FRAISCA</td><td>RUGIMBANA</td><td>KUBEBEKA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tegeta 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LUCY JOSEPHINE</td><td>ABRAHAM</td><td>CHAWE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tegeta 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARY</td><td>DAVID</td><td>MOSHA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tegeta 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MERCY</td><td>DOMINIC</td><td>MNDASHA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tegeta 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rose</td><td>-</td><td>Umilla</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Tip Top Dispensary</td><td>Private Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Alphonsina</td><td>Rogath</td><td>Massae</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ununio 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ANNA</td><td>CYRIL</td><td>MWAIMU</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ununio 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ERICADIA</td><td>IGNAS</td><td>KIKOTI</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ununio 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARIAM</td><td>JUMA</td><td>MSACKY</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ununio 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARY</td><td>HENRY</td><td>TEMU</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ununio 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MERCY</td><td>PETER</td><td>MZEZA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Ununio 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>TUKELAGE</td><td>SIMON</td><td>WAPALILA</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Wazo Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ZUBEDA</td><td>SIMON</td><td>NTIRUBAYE</td><td>Dar Es Salaam Region</td><td>Kinondoni Municipal Council</td><td>Wazo Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ALFRED</td><td>TADEI</td><td>NDUNGURU</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Amina</td><td>Abdul</td><td>Msati</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>AMINA</td><td>SAID</td><td>DASSA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ANNA</td><td>FANUEL</td><td>HAULE</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>BERNADETHA</td><td>EVARIST</td><td>MOSHA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Chrispin</td><td>Richard</td><td>Kayola</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>DOREEN</td><td>ELISANTE</td><td>MACHA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>DORICE</td><td>ELIAS</td><td>SHAYO</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ELizabeth</td><td>Bitta</td><td>Maagi</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ELIZABETH</td><td>DOUGLAS</td><td>SALLU</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ELIZABETH</td><td>NICODEM</td><td>NYANGURA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ERASMINA</td><td>KAWISHE</td><td>MAINA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ESTER</td><td>PATRIC</td><td>HYERA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Felister</td><td>Fidelis</td><td>Matonya</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Grace</td><td>Peter</td><td>Mella</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>GRACE</td><td>CLEMENS</td><td>MSOSA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>GRACE</td><td>HUGGO</td><td>NGONYANI</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>HALIMA</td><td>SAIDI</td><td>MBANO</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>HAWA</td><td>MAHMOOD</td><td>OMARY</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JOHN</td><td>RICHARD</td><td>SEMKUYA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JOYCE</td><td>MOSES</td><td>MWALYAMBWILE</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JOYCE</td><td>SAMSON</td><td>SIRINCHA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>LUCY</td><td>REHEMA</td><td>MPUPUA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Mary</td><td>Aloyce</td><td>Shayo</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Matilda</td><td>Nicholaus</td><td>Chuwa</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MIRIAM</td><td>JAMES</td><td>KIJUMBE</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>NEEMA</td><td>WILLIAM</td><td>MALWANA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Noemi</td><td>Emmanuel</td><td>Macha</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>NYAMATE</td><td>ANDERSON</td><td>ULEDI</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ODIRA</td><td>CLARA</td><td>MWITA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>PELAGIA</td><td>DAUDI</td><td>BATURULIMI</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>RAHEL</td><td>RAJABU</td><td>MSHANA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>RAJABU</td><td>ISSA</td><td>WAZIRI</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>REHEMA</td><td>ULEDI</td><td>NATHANIELY</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Richard</td><td>Zuberi</td><td>Adam</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ROSWITA</td><td>JACOB</td><td>MHAGAMA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>SIA</td><td>NELSON</td><td>MINJA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>TUMAINI</td><td>DAUSENI</td><td>KILEO</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>TUNSUME</td><td>SAMMY</td><td>KASEKO</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Tuswege</td><td>Frank</td><td>Mwamwaja</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>UPENDO</td><td>SIWA</td><td>LEMA</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Zuberi</td><td>Ali</td><td>Mzige</td><td>Dar Es Salaam Region</td><td>Mwananyamala Regional Referral Hospital</td><td>Mwananyamala Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Deniza</td><td>Ramadahni</td><td>Ruano</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Buza Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EDAFRIDA</td><td>PETER</td><td>NKUWI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Buza Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Gladness</td><td>Benson</td><td>Massawe</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Buza Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>GLORIOUS</td><td>ISDORY</td><td>JOHN</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Buza Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARIAM</td><td>AYOUB</td><td>SHEMLIWA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Buza Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mary</td><td>Makala</td><td>Mushi</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Buza Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Saida</td><td>Mohamed</td><td>Kunde</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Buza Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SEILES</td><td>M</td><td>KAYOMBO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Buza Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EZRA</td><td>SAMSON</td><td>NTAMHEZA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chamazi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>GLORIADEI</td><td>MARKUS</td><td>NGONYANI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chamazi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LIMBE</td><td>ZACHARIA</td><td>KATALE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chamazi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MWAJUMA</td><td>MALINDA</td><td>KILUNGI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chamazi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SARAFINA</td><td>FESTO</td><td>KYANDO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chamazi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>TECLA</td><td>MALISA</td><td>LUPI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chamazi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ANNA</td><td>JUMA</td><td>BULLENGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chang''ombe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MWANGAZA</td><td>ABDALAH</td><td>SAID</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chang''ombe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rehema</td><td>Yusuf</td><td>Muya</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chang''ombe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ROSE</td><td>JOHANESS</td><td>MASERO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chang''ombe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Zaina</td><td>Gamaah</td><td>Swalehe</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Chang''ombe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ZAINAB</td><td>MAULID</td><td>HASSAN</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Charambe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARIA</td><td>ALVERA</td><td>ANATORY</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Consolata Sisters Dispensary</td><td>Faith Based Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ANNA</td><td>JUMA</td><td>BULENGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kichemchem Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Eliada</td><td>Kamando</td><td>Zablon</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kichemchem Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>hadija</td><td>mussa</td><td>msami</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kichemchem Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Issa</td><td>Ally</td><td>Mcheka</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kichemchem Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Pericia</td><td>Brown</td><td>Mwaituka</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kichemchem Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>RASHID</td><td>DAUD</td><td>MIWALE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kichemchem Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SCHOLASTICA</td><td>HERMAN</td><td>NYANGWE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kichemchem Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>TENGEMANO</td><td>MICHAEL</td><td>GOMBE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kichemchem Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>RAHEL</td><td>JOHN</td><td>BIGURUBE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kilakala Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Amina</td><td>Hassan</td><td>Baruani</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kingugi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Grace</td><td>Rumishaeli</td><td>Kweka</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kingugi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>HUSSEIN</td><td>ABDULKAREEM</td><td>MSOSA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kingugi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rukia</td><td>William</td><td>Mponzi</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Kingugi Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>AGATHA</td><td>ELIAS</td><td>MUKOPA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Maji matitu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ALICE</td><td>JOSEPHAT</td><td>KABYEMELA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Maji matitu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ANICETHA</td><td>GIDEON</td><td>KIMARIO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Maji matitu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EDISA</td><td>EDWARD</td><td>RUBONELA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Maji matitu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JOEL</td><td>JOSEPH</td><td>RAPHAEL</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Maji matitu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LAINA</td><td>DEUS</td><td>KANANI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Maji matitu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Melina</td><td>MATHAYO</td><td>Chalamila</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Maji matitu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NEEMA</td><td>HENRY</td><td>SAMBARI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Maji matitu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rehema</td><td>KAMBANGWA</td><td>Iddi</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Maji matitu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>YOHANA</td><td>MATHEW</td><td>MREMA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Maji matitu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EMMANUEL</td><td>ANDREW</td><td>SINAMTWA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Makangarawe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mary</td><td>Greyson</td><td>Tibanganyuka</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Makangarawe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARY</td><td>PATRICK</td><td>MASSILA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Makangarawe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MILLICENT</td><td>AKINYI</td><td>OLOO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Makangarawe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NEEMA</td><td>JAPHET</td><td>PALLANGYO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Makangarawe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Paulina</td><td></td><td>Ndidi</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Makangarawe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Richard</td><td>Masunga</td><td>Manunu</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Makangarawe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rosemary</td><td>Jovinn</td><td>Pastory</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Makangarawe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ZAWADIEL</td><td>ISRAEL</td><td>BAYYO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Makangarawe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Alice</td><td>BARNABA</td><td>Samaluku</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Angela</td><td>Anthony</td><td>Fusi</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>CHARLES</td><td>RCHARD</td><td>MALALE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Dyness</td><td>Leonard</td><td>Lisulile</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>HAPPY</td><td>EDWARD</td><td>MGUMBA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Leticia</td><td>NGUMBO</td><td>Makemo</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MALACK</td><td>SHULITSE</td><td>MWEGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PAULO</td><td>MAO</td><td>KHWAYMA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SALUM</td><td>AJABA</td><td>CHITETE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SULTAN</td><td>OMARY</td><td>LUSAMBI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Ummy</td><td>Mohamed</td><td>Khaji</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kizuiani Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EUNICE</td><td>PAUL</td><td>MANYUKA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kuu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>RIZIKI</td><td>ABDUL</td><td>SONGWE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Kuu Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ALAINA</td><td>MOHAMEDI</td><td>MACHENZA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Anande</td><td>Moses</td><td>Kaaya</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ANDREW</td><td>ARNOLD</td><td>LUOGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>BEATRICE</td><td>GIDEON</td><td>MHAGAMA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>BEATRICE</td><td>JOSEPH</td><td>NANGAWE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Charles</td><td>M.S</td><td>Range</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>CHRISTINA</td><td>FOCAS</td><td>MALAMSHA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>DAFROSA</td><td>LAURENT</td><td>TARIMO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>DANIEL</td><td>PHINIAS</td><td>CHILIMO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Elionora</td><td>Abel</td><td>Ntemo</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ELIZABETH</td><td>BITTA</td><td>MAAGI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>EMMANUELA</td><td>MANFRED</td><td>MKINGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ENEDY</td><td>BRIGHT</td><td>MSOFE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>EPIPHANIA</td><td>BLASS</td><td>ANTHONY</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ESTER</td><td>PHILIMON</td><td>MWASYOGE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>FARIDA</td><td>ISSA</td><td>HAMISI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>FATIMA</td><td>BAKARI</td><td>MUSSA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>GATI</td><td>PENNINAH</td><td>BANTO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Halima</td><td>JURAJI</td><td>Mshana</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>HELENA</td><td>DAVID</td><td>SIMTAJI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Henry</td><td>Rakuo</td><td>Lyimo</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JABIRI</td><td>MOHAMEDI</td><td>MAKUNGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JACQUELINE</td><td>MOHAMED</td><td>CHAWILE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JOSEPH</td><td>SALUM</td><td>KIANI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Josephine</td><td>George</td><td>Msekwa</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Joyce</td><td>Michael</td><td>Kasongwa</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JOYCE</td><td>LUTHER</td><td>MWAMKOA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>KINES</td><td>SAMUEL</td><td>KISUDA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Melina</td><td>Evani</td><td>Lumambo</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MERINA</td><td>GEORGE</td><td>KWETUKIA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MODESTA</td><td>NASORO</td><td>MROPE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MODESTER</td><td>RAYMOND</td><td>CHITUNDA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MONICA</td><td>FIITA</td><td>AKO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MUSA</td><td>SAMWEL</td><td>MPAYO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MUSSA</td><td>FELICIAN</td><td>KAKIZIBA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MWANABARAKA</td><td>MADOSHI</td><td>SHEM</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>NOELA</td><td>ARON</td><td>CHACHA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>PILLY</td><td>MAHMOUD</td><td>KIJAZI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Rehema</td><td>Shaban</td><td>Omary</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Reinalda</td><td>Damian</td><td>Nkane</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Saida</td><td>Mbaraka</td><td>Towainda</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>SAUMU</td><td>ABDALAH</td><td>MAJAPA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Selemani</td><td>Lubuva</td><td>Juma</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Silasy</td><td>Biggar</td><td>Adam</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>TAABU</td><td>KIBWANA</td><td>MKWEGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>TATU</td><td>MALETA</td><td>KONDO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Tuma</td><td>Daud</td><td>Kanyumbu</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>UPENDO</td><td>BATHOROMEW</td><td>KAYOMBO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>VERONICA</td><td>FREDRICK</td><td>TESHA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>VUMILIA</td><td>JUMA</td><td>MKURUNGUCHE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>YUNISY</td><td>IVAN</td><td>LUSASI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>YUSTINA</td><td>JOSEPH</td><td>KULAYA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>YUSTINA</td><td>RAPHAEL</td><td>YUMBA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ZAKIA</td><td>PETER</td><td>NGWALE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ZELIANA</td><td>SAMUELL</td><td>TELEMLA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Rangi Tatu Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>AMALIA</td><td>CALIST</td><td>ASSENGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ANSILA</td><td>JOSEPH</td><td>MBWAMBO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Beatrice</td><td>MTURANO</td><td>MSWANYAMA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>DEGRATUS</td><td>MICHAEL</td><td>NJAU</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EDNA</td><td>MARO</td><td>NGOLLY</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Georgina</td><td>Albeth</td><td>Vakalavene</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>GERMANA</td><td>MICHAEL</td><td>MSELE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JASHO</td><td>MOHAMED</td><td>MBWANA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Linted</td><td>Samoya</td><td>Mpisi</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Lugano</td><td>Isaac</td><td>Mtafya</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MAGRETH</td><td>VERONICA</td><td>CHEKANI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARGRETH</td><td>ENOCK</td><td>LENGATA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NAMANGO</td><td>SALEHE</td><td>SADIKI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>OLIVER</td><td>SIMON</td><td>MCHELEMI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ORESTA</td><td>KELVIN</td><td>NDUMBALO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PILLI</td><td>BAKARI</td><td>MSUYA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>RAHAMA</td><td>MOHAMED</td><td>SINANI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SAUDA</td><td>SHABANI</td><td>SUMMA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>TABU</td><td>HUSSEIN</td><td>KIWAMBA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>THERESIA</td><td>JOHN</td><td>AMASSY</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbagala Roundtable Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ANNA</td><td>PETER</td><td>GUKWI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbande Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Asiimwe</td><td>Elisa</td><td>Buberwa</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbande Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EMANUEL</td><td>MUHILI</td><td>MIHAYO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbande Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ESTER</td><td>ENOCK</td><td>KIDZINGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbande Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JANE</td><td>JEROME</td><td>MHAGAMA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbande Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JUDITH</td><td>ISRAEL</td><td>FOYA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbande Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARIAMU</td><td>ALLY</td><td>KASUBI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbande Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MWAZANI</td><td>AWESU</td><td>SAID</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbande Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PENDO</td><td>MANENO</td><td>MGWENO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbande Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Stella</td><td>Abdallah</td><td>Shehoza</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mbande Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ADISON</td><td>AMINIEL</td><td>MNGAZIJA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mikwambe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Stella</td><td>John</td><td>Mpongo</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mikwambe Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ZAINABU</td><td>ALLY</td><td>KIBASILA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mission Mbagala Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ELISIFA</td><td>ELISANTE</td><td>MAIMU</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mtoni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JOHN</td><td>SAMWEL</td><td>MAPUNDA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mtoni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Lucy</td><td>Abbas</td><td>Pangahela</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mtoni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ZENATH</td><td>AWADH</td><td>MUSSA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mtoni Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EMMANUEL</td><td>PETER</td><td>KAAYA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mtoni Rch Clinic</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EMMANUEL</td><td>PETER</td><td>KAAYA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mtoni Rch Clinic</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>AMINA</td><td>MUSTAFA</td><td>TWAHA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mzinga Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Anna</td><td>ANTHONY</td><td>SHIRIMA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mzinga Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FLORA</td><td>JOHN</td><td>SEMBONI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mzinga Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SECILIA</td><td>SELESTINE</td><td>NGAKONGWA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Mzinga Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MAGRETH</td><td>RUMISHA</td><td>MALEKO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Relini Yombo Vituka Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FLORA</td><td>JOHNSON</td><td>MOLLEL</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Sandali Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JAMES</td><td>CLAVERY</td><td>MATALANGE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Sandali Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PATRICIA</td><td>ANANIAS</td><td>KIKOTI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Sandali Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SOPHIA</td><td>MODEST</td><td>MALLYA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Sandali Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ZUHURA</td><td>AZIZ</td><td>MSANGI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Sandali Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>BUPE</td><td>GIBSON</td><td>MBWAGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Sigara Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>DEOGRATIUS</td><td>MICHAEL</td><td>NJAU</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Sigara Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FRAMEN</td><td>CHARLES</td><td>SWAI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Sigara Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ROSWITA</td><td>SAIDI</td><td>CHIPUTA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Sigara Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>CHRISTINA</td><td>MATHIAS</td><td>NJUKA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ELIADAH</td><td>M</td><td>MAIGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EMMANUEL</td><td>JAMES</td><td>GODADI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ESTER</td><td>FREDIRICK</td><td>SIKUMBILI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FLORA</td><td>JORAM</td><td>NZAWILLA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>GIVENESS</td><td>JOHN</td><td>NYAGAWA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Hidaya</td><td>Shida</td><td>Utawangu</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JOYCE</td><td>EMMANUEL</td><td>MADUHU</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JOYCE</td><td>KALEBI</td><td>TEMBA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Magreth</td><td>Ndomba</td><td>Komba</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MARSELA</td><td>STEPHEN</td><td>MBUNDA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mwanahamisi</td><td>Salehe</td><td>Mohamed</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NASRA</td><td>JAPHET</td><td>KALENGE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ROSE</td><td>CHRISPIN</td><td>MWAMTOBE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SALUM</td><td>RAMADHAN</td><td>KIMOLO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>TEDDY</td><td>HENLY</td><td>SUMUNI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Tambukareli Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>DIANA</td><td>DANIEL</td><td>HAULE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>FEDERIKA</td><td>ABRAHAM</td><td>SIWAKWI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Ford</td><td>Moses</td><td>Chisangela</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>HAWA</td><td>MWATAWALA</td><td>KASINDE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>IBRAHIM</td><td>SAIDI</td><td>MOHAMED</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Imani</td><td>Mohamed</td><td>Rajabu</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Jane</td><td>ANASTANSIA</td><td>Nkane</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Martha</td><td>Erasmos</td><td>Macha</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Mebbo</td><td>Francis</td><td>Millanzi</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Mwanabaraka</td><td>Madoshi</td><td>Shem</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Shaidi</td><td>Yofikwa</td><td>Simba</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>ZUHURA</td><td>ALLY</td><td>NYANGE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Temeke Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>ASHURA</td><td>ABDALLAH</td><td>MILINGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Toangoma Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>AUGUSTINO</td><td>GODWIN</td><td>LYANGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Toangoma Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MAIDA</td><td>ATHUMAN</td><td>MILANZI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Toangoma Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>NEEMA</td><td>VALENTINE</td><td>BARONGO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Toangoma Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SYLVIA</td><td>R</td><td>MSAKI</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Toangoma Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ELIZABETH</td><td>DENIS</td><td>CHUWA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Machimbo Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>AGNESS</td><td>SIA</td><td>MACHANGE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ANNA</td><td>GERALD</td><td>MMANGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>CONSOLATA</td><td>CONSTANTIN</td><td>MBEYA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EDNA</td><td>GABRIEL</td><td>KIOGWE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>EMMANUEL</td><td>PAUL</td><td>BUSANYA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>HOSANA</td><td>BAVONI</td><td>MKWICHE</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>HURUMA</td><td>JAPHET</td><td>MWAKALO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>LUCAS</td><td>MICHAEL</td><td>KAUGA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Maimuna</td><td>Msham</td><td>Matogoro</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mainda</td><td>Mgaya</td><td>Zayumba</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>REHEMA</td><td>AIDAN</td><td>CHIMANYALA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SARAFINA</td><td>MUHOZYA</td><td>MANYAMA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Sarah</td><td>Dismas</td><td>Kaduma</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SUBIRA</td><td>BATISA</td><td>KIDUKO</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>YUSUPH</td><td>SHABANI</td><td>NDWATA</td><td>Dar Es Salaam Region</td><td>Temeke Municipal Council</td><td>Yombo Vituka Health Center</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>AGNES</td><td>AGNARUS</td><td>MLANGENI</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Amon</td><td>Erasto</td><td>Lubambi</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Anna</td><td>Kabula</td><td>Mbaruku</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Ashura</td><td>Hussein</td><td>Mirry</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ASSA</td><td>MICHAEL</td><td>MWAKILASA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ATU</td><td>TEST</td><td>EDMUND</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>CHIHA</td><td>MORCE</td><td>LUKAYIKA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>CONSOLATA</td><td>RICHARD</td><td>MLAGARA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Edida</td><td>ELIEZA</td><td>Machumu</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Elizabeth</td><td>Y</td><td>Kasembe</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>EVANCE</td><td>POLIN</td><td>MOLINGA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>FABIAN</td><td>SEVERIN</td><td>MVUNGI</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Fatuma</td><td>SWIDHANI</td><td>Msumari</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>FAUSTINO</td><td>ALBERLT</td><td>MBILINYI</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Florence</td><td>Stanford</td><td>Kapongo</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Florida</td><td>Gamalieli</td><td>Mpollo</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>FRANCIS</td><td>RYOBA</td><td>MARINGO</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>FURAHA</td><td>ERICK</td><td>NAMBUKWA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>GENOVEVA</td><td>PETRO</td><td>LUSELEMA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>GRACE</td><td>EZEKIEL</td><td>CHIRWA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>HARIETH</td><td>WILLIAM</td><td>MSAGATI</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Hidaya</td><td>Joseph</td><td>Mkombachepa</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>HILDA</td><td>JUMA</td><td>TIMIRA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>IMELDA</td><td>MICHAEL</td><td>KIHWELO</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JACKSON</td><td>AMOS</td><td>MEMBA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>James</td><td>Philipo</td><td>Mussa</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Jesca</td><td>waziri</td><td>Maula</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Khadija</td><td>Thabiti</td><td>Mayumba</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MAGRAETH</td><td>MAPUNDA</td><td>LUHINDILA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MAGRIDA</td><td>JAPHET</td><td>MUMBA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MARY</td><td>PATRICK</td><td>MASSILA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MARY</td><td>VICTOR</td><td>MNONJELA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MODESTA</td><td>NICHOLAUS</td><td>LASSANA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MWANAIDI</td><td>KHALIFA</td><td>SENZOTA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MWASI</td><td>LILIAN</td><td>MASAMAGA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Nasekile</td><td>Betile</td><td>Mwankenja</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>NIA</td><td>SALUM</td><td>NAMKANDA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>NKACHUNGULWA</td><td>HEZRON</td><td>ISHUNGA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>NYEMO</td><td>JOHN</td><td>KONGOLA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>PATRICIA</td><td>ROBERT</td><td>MTINDA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Pellagia</td><td>VALENTINE</td><td>Barbaydu</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>PRISCA</td><td>WILSON</td><td>MOSI</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>RAYA</td><td>MASOUD</td><td>OMAR</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Richard</td><td>Situlani</td><td>Waya</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Rose</td><td>Isack</td><td>Ntonga</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ROSE</td><td>SAID</td><td>CHAGAMA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Ruth</td><td>JAMES</td><td>Marango</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Ruth</td><td>John</td><td>Mkumbo</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>SELEMANI</td><td>BASHIRI</td><td>KIVOJA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>SHIDA</td><td>MSHINDO</td><td>MWARUKA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Sophia</td><td>Stanslaus</td><td>Massawe</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>SOPHIA</td><td>PLACIDUS</td><td>NDUNGURU</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>SUBIRA</td><td>SADIKI</td><td>SELEHE</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>TABEA</td><td>SAMSON</td><td>LUSSUVA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>THERESIA</td><td>SABAS</td><td>SHAYO</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Tina</td><td>Nkwama</td><td>Chapakazi</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Wema</td><td>Abdala</td><td>Pogola</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ZACHARIA</td><td>GHATI</td><td>PATRICK</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ZUHURA</td><td>SALUM</td><td>MCHIKA</td><td>Dar Es Salaam Region</td><td>Temeke Regional Referral Hospital</td><td>Temeke Regional Referral Hospital</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Elias</td><td>Richard</td><td>Ndahani</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Goba Dispensary</td><td></td><td></td></tr><tr role="row"><td>EMMANUELA</td><td>LUCAS</td><td>SHIRIMA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Goba Dispensary</td><td></td><td></td></tr><tr role="row"><td>HALIMA</td><td>HUSSEIN</td><td>YUDA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Goba 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Rachel</td><td>Elicanus</td><td>Ngoga</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Goba 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>UKENDE</td><td>MIGONGA</td><td>DYELU</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Goba 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>VERONICA</td><td>VALETIAN</td><td>SHAYO</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Goba 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ADVERA</td><td>KOMUNGOMA</td><td>KOKUSHUBIKA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kibamba 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>HAPPY</td><td>GEORGE</td><td>LUNYUNGU</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kibamba 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>HOSANA</td><td>AYUBU</td><td>KIHOMBO</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kibamba 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JANE</td><td>CHRISTOPHER</td><td>KIHIYO</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kibamba 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PRISCA</td><td>WILSON</td><td>MOSI</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kibamba 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Fatuma</td><td>Hamza</td><td>Athumani</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kibwegere 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Charity</td><td>Edward</td><td>Mwaibukilo</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kiluvya	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Justina</td><td>Kilagula</td><td>Nzengula</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kiluvya	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>REHEMA</td><td>JUMA</td><td>JABIRI</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kiluvya	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Suzana</td><td>Hanke</td><td>Mwanyilu</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kiluvya	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Alphoncina</td><td>Angelo</td><td>Mbinda</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kimara Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>ANNA</td><td>EMANUEL</td><td>MZIRAY</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kimara Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>CONSTANCIA</td><td>RAPHAEL</td><td>MSAKI</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kimara Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>DOROTHY</td><td>PETER</td><td>MBUJI</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kimara Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Jane</td><td>Simoni</td><td>Mbwillo</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kimara Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Joyce</td><td>Julius</td><td>Charles</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kimara Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Lightness</td><td>Rodirick</td><td>Shayo</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kimara Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Noerina</td><td>Paul</td><td>Tegete</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kimara Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Rehema</td><td>Mastai</td><td>Hindi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kimara Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Tatu</td><td>Said</td><td>Mpota</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kimara Health Center</td><td>Public Facilities</td><td>Health Centre</td></tr><tr role="row"><td>Damaris</td><td>Amadi</td><td>Nyamondo</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kisopwa 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SARA</td><td>ELIAS</td><td>MKOMA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Kwembe 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ANNA</td><td>VICTOR</td><td>KAYUMBA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mabibo	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Julitha</td><td>Frank</td><td>Matemu</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mabibo	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Stella</td><td>Noel</td><td>Ng''aso</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mabibo	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Mary</td><td>Elias</td><td>Nkoma</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makuburi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>SALOME</td><td>SIMON</td><td>BYANYUMA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makuburi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Tina</td><td>Nkwama</td><td>Chapakazi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makuburi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>VERONICA</td><td>WAKURU</td><td>JAMES</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makuburi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Victoria</td><td>Albert</td><td>Ngatuni</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makuburi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Adelina</td><td>Francis</td><td>Nyambo</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>Angela</td><td>Wilson</td><td>Shitindi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>Bahati</td><td>Selemani</td><td>Msangi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>Baraka</td><td>Ditrick</td><td>Kapinga</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>Bertha</td><td>Annel</td><td>Shang''a</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>CHRISTINE</td><td>GERSHOM</td><td>NYARONGA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>Deodatus</td><td>Nkoyera</td><td>Mzigo</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>ELIZABETH</td><td>Gaspar</td><td>Kalinga</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>Happyness</td><td>Lingson</td><td>Kabuje</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>Jackline</td><td>Moses</td><td>Mwaliyambwile</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>NEEMA</td><td>WILSON</td><td>KIMARO</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>Patricia</td><td>K</td><td>Kindole</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>Stumai</td><td>Rashid</td><td>Mkoka</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Makurumla Health Center</td><td></td><td></td></tr><tr role="row"><td>PROSISTA</td><td>JOSEPH</td><td>KIWANGO</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Malamba Mawili Dispensary</td><td></td><td></td></tr><tr role="row"><td>Attu</td><td>Andrew</td><td>Mbilinyi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mavurunza Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Doroth</td><td>Sebastian</td><td>Mushi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mavurunza Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Sara</td><td>Cosmas</td><td>Kapinga</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mavurunza Dispensary</td><td></td><td>Dispensary</td></tr><tr role="row"><td>Christina</td><td>Joshua</td><td>Bayyo</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Felister</td><td>Andrea</td><td>Marco</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>FURAHA</td><td>ANYIMIKE</td><td>MWAIPYANA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Hamad</td><td>Ally</td><td>Hembera</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>HONESTA</td><td>BASILI</td><td>MACHA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>MILKA</td><td>JOSEPH</td><td>MAGANGA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Valeria</td><td>January</td><td>Paschal</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>VICTORIA</td><td>ATAMIGWE</td><td>MSOKWA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi 	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Agatha</td><td>Athuman</td><td>Mlonja</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi Health Center</td><td></td><td></td></tr><tr role="row"><td>Malamla</td><td>William</td><td>Chaulenzi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi Health Center</td><td></td><td></td></tr><tr role="row"><td>Mwajuma</td><td>Hamadi</td><td>Kabwa</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mbezi Health Center</td><td></td><td></td></tr><tr role="row"><td>Mary</td><td>Saimon</td><td>Masanga</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mburahati	Dispensary</td><td>Public Facilities</td><td></td></tr><tr role="row"><td>Mwanahawa</td><td>Abdulrahman</td><td>Kiroboto</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mburahati	Dispensary</td><td>Public Facilities</td><td></td></tr><tr role="row"><td>ZUENA</td><td>ALLY</td><td>MSONGA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mburahati	Dispensary</td><td>Public Facilities</td><td></td></tr><tr role="row"><td>JOHARI</td><td>HADIJA</td><td>KISHENGENA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>MCDIT Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>PHINA</td><td>JOHN</td><td>TEMBA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>MCDIT Dispensary</td><td>Private Facilities</td><td>Dispensary</td></tr><tr role="row"><td>CLARA</td><td>Adolph</td><td>BAITWA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Mpiji Magohe.	Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Hidaya</td><td>Abduel</td><td>Kilonzo</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Msewe.	 Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>JOHN</td><td>RICHARD</td><td>SEMKUYA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Msewe.	 Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Julieth</td><td>Jeremia</td><td>Macha</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Msewe.	 Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>Victoria</td><td>Anselim</td><td>Moshi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Msewe.	 Dispensary</td><td>Public Facilities</td><td>Dispensary</td></tr><tr role="row"><td>ABIZAN</td><td>ISMAIL</td><td>MSUYA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>AGNESS</td><td>ERNEST</td><td>NDUNGURU</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ALIHO</td><td>GIDEON</td><td>NGERAGEZA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Ally</td><td>Hamis</td><td>Ndunda</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ALLY</td><td>SAID</td><td>NGEREZA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Anastacia</td><td>Tatu</td><td>Mtagulwa</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ANNA</td><td>AMANA</td><td>MASSAWE</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>AULA</td><td>KASSIM</td><td>MUSTAFA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>AUNSIA</td><td>CHRISTONSIA</td><td>NDOSI</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>BATULI</td><td>HANAF</td><td>RAMADHANI</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>CATHERINE</td><td>PHILIP</td><td>MASASI</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>CHRISPIN</td><td>RICHARD</td><td>KAYOLA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Colletha</td><td>Ferdinand</td><td>Lasway</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>DOTTO</td><td>MAALIMU</td><td>SELASELA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Editha</td><td>Stephen</td><td>Kashega</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>EDNA</td><td>GEORGE</td><td>MUSASU</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Elizabeth</td><td>Charles</td><td>Lutego</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ESTHER</td><td>JOHN</td><td>CHACHA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>EVA</td><td>HUDSON</td><td>SARIA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Fainess</td><td>Nina</td><td>Daniel</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>FLORAH</td><td>MOSES</td><td>MASSAWE</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Fransisca</td><td>Theodore</td><td>Konyani</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>GAUDENSIA</td><td>NESTORY</td><td>KATO</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Geoffrey</td><td>Peter</td><td>Meena</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>GEORGINA</td><td></td><td>LWAMBANO</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>GLORIA</td><td>ANNY</td><td>LEMA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>HAMAD</td><td>ALLY</td><td>HEMBERA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Hamis</td><td>Mchala</td><td>Madiwa</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Hellen</td><td>Theonest</td><td>Kilaini</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>HELLEN</td><td>ALPHONCE</td><td>MWITA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Jackline</td><td>Julius</td><td>Ngowi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JESCA</td><td>EDESI</td><td>SHAYO</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JOSEPHINE</td><td>ALBERT</td><td>SHIRIMA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JOSEPHINE</td><td>PROSPER</td><td>WENFUREBE</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Joyce</td><td>Thomas</td><td>Lema</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JOYCE</td><td>IBRAHIM</td><td>MUNA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JOYCE</td><td>JOSHUA</td><td>LIWA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>JOYCE</td><td>KAHAMBA</td><td>MWAMBIJE</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Lilian</td><td>Msoffe</td><td>Laghua</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Lina</td><td>Msamila</td><td>Magazi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>LYDIA</td><td>CESILIA</td><td>MWAMANDA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Magreth</td><td>Raymond</td><td>Ngowi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Marco</td><td>Cosmas</td><td>Msopewa</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Monica</td><td>Gabriel</td><td>Momburi</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>MWANGWA</td><td>JOEL</td><td>WARYOBA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Nancy</td><td>Ezekiel</td><td>Tetty</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>NEEMA</td><td>HASHIM</td><td>RASHID</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>NEEMA</td><td>HASHIM</td><td>RASHIDI</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>NESTA</td><td>REUBEN</td><td>MTWEVE</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Odiria</td><td>James</td><td>Mramba</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Omari</td><td>Issa</td><td>Omari</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Onanje</td><td>Yassin</td><td>Mtila</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ONESMO</td><td>ERASTO</td><td>MWASYUNGU</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Patrick</td><td>Gabriel</td><td>Kabangut''se</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Pendo</td><td>Kabushi</td><td>Joseph</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>PRISILA</td><td>PROCHES</td><td>TESHA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>RACHEL</td><td>John</td><td>LUTIGA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>RASHID</td><td>BABU</td><td>KAPORO</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>REHEMA</td><td>TIMITHEO</td><td>PANGA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ROSE</td><td>ONESMO</td><td>TEMANYIKA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>ROZALIA</td><td>JOHN</td><td>MAJALA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>RUKIA</td><td>MWALIMU</td><td>KITWANA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Saumu</td><td>Maulid</td><td>Sheni</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Simphrosa</td><td>Adorath</td><td>Komba</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Sophia</td><td>Paulo</td><td>Ngonyani</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>Upendo</td><td>Ernest</td><td>Mwagisa</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>YASINTHA</td><td>DEUS</td><td>MUTABIHIRWA</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Sinza Health Center</td><td>Public Facilities</td><td>Hospitals</td></tr><tr role="row"><td>DALAWIDA</td><td>EMNANUEL</td><td>SAYI</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Ubungo Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Esther</td><td>Green</td><td>Mwenitumba</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Ubungo Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>Sabina</td><td>Ferdinand</td><td>Balilo</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Ubungo Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr role="row"><td>SUZANA</td><td>DANIEL</td><td>MATEE</td><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td>Ubungo Municipal Council</td><td>Public Administration</td><td>Admistrative Unit</td></tr><tr><td>Alana</td><td>KRISTANDUS</td><td>NDOMBA</td><td>Dar Es Salaam Region</td><td>Dar Es Salaam Region</td><td>Public Administration</td><td>Admistrative Unit</td></tr></tbody>
                                     </table>'),
                                     (uid(),'Training Sessions', '{"ou": true,"pe": true,"training":{"sessions": true,"units": true,"curriculumn": true,"topics": true,"organizers": true,"sponsors": true,"qualifications": true,"deliverymode": true,"providers": true,"dateRange": true}}','html','<table id="data" class="dataTable table table-striped table-bordered table-hover no-footer" cellpadding="0" cellspacing="0" border="0">
                                      <thead id="dataHeader"><tr><th>Region Name</th><th>District Name</th><th>Venue</th><th>Sponsor</th><th>Organiser</th><th>Created By</th><th>Start Date</th><th>End Date</th><th>Curriculum</th><th>Section</th><th>Unit</th><th>Delivery Mode</th><th>Participants</th></tr></thead>
                                         <tbody id="dataBody"><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td></td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Short Acting Contraceptive Training</td><td>RCHS</td><td>Family Planning</td><td></td><td>273</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Long Acting Contraceptive Training</td><td>RCHS</td><td>Family Planning</td><td></td><td>227</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Clinical Management of Gender Based Violence and Violence against Children (GBV&amp;VAC)</td><td>RCHS</td><td>Gender</td><td></td><td>179</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>FP Comprehensive Training</td><td>RCHS</td><td>Family Planning</td><td></td><td>178</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Comprehensive Post Abortion Care (cPAC)</td><td>RCHS</td><td>Safe Motherhood Initiative</td><td></td><td>132</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>FP Comprehensive Training</td><td>RCHS</td><td>Family Planning</td><td></td><td>128</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>TOT on Clinical Management of Gender Based Violence and Violence against Children (GBV&amp;VAC)</td><td>RCHS</td><td>Gender</td><td></td><td>128</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Postpartum Family Planning (PPFP) Training</td><td>RCHS</td><td>Family Planning</td><td></td><td>92</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-02-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Visual Inspection with Acetic Acid (VIA) and Cryotherapy (CECAP)</td><td>RCHS</td><td>Cancer</td><td></td><td>83</td></tr><tr><td>Dar Es Salaam Region</td><td>Ubungo Municipal Council</td><td></td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Visual Inspection with Acetic Acid (VIA) and Cryotherapy (CECAP)</td><td>RCHS</td><td>Cancer</td><td></td><td>83</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Basic Emergency Obstetric and Newborn Care (BEmONC)</td><td>RCHS</td><td>Safe Motherhood Initiative</td><td></td><td>66</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Adolescent Friendly Reproductive Services for Service Providers</td><td>RCHS</td><td>Adolescent Health</td><td></td><td>58</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Training on Forensic Evidence Management for GBV&amp;VAC</td><td>RCHS</td><td>Gender</td><td></td><td>58</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Post Natal Care (PNC)</td><td>RCHS</td><td>Safe Motherhood Initiative</td><td></td><td>43</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Loop Electrosurgical Excision Procedures (LEEP)</td><td>RCHS</td><td>Cancer</td><td></td><td>34</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Distance Learning Integrated Management and Child Illness (DIMCI)</td><td>RCHS</td><td>Child Health</td><td></td><td>33</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Permanent Methods Training</td><td>RCHS</td><td>Family Planning</td><td></td><td>30</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>TOT on  Training for Peer Education (ASRAH)</td><td>RCHS</td><td>Adolescent Health</td><td></td><td>26</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Helping Baby Breath (HBB)</td><td>RCHS</td><td>Child Health</td><td></td><td>23</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Comprehensive Emergency Obstetric and Newborn Care (CEmONC)</td><td>RCHS</td><td>Safe Motherhood Initiative</td><td></td><td>22</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Helping Baby Breath (HBB)</td><td>RCHS</td><td>Child Health</td><td></td><td>21</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Care for Child Development (CCD)</td><td>RCHS</td><td>Child Health</td><td></td><td>18</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>FP clinical mentorship training</td><td>RCHS</td><td>Family Planning</td><td></td><td>17</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>TOT on Training on Forensic Evidence Management for GBV&amp;VAC</td><td>RCHS</td><td>Gender</td><td></td><td>8</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Focused Antenatal Care (FANC)</td><td>RCHS</td><td>Safe Motherhood Initiative</td><td></td><td>7</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Essential Newborn Care (ENC)</td><td>RCHS</td><td>Child Health</td><td></td><td>4</td></tr><tr><td>Morogoro Region</td><td>Kilosa District Council</td><td>EDEMA</td><td>USAID Boresha Afya</td><td>EngenderHealth</td><td>Mwanaisha  Chitanda</td><td>2018-10-08 00:00:00</td><td>2018-10-19 00:00:00</td><td>FP HIV Integration</td><td>RCHS</td><td>Family Planning</td><td></td><td>4</td></tr><tr><td>Morogoro Region</td><td>Morogoro Municipal Council</td><td>Edema Hotel</td><td>Marie Stopes</td><td>Marie Stopes</td><td>Chai  Tanzana</td><td>2019-07-08 00:00:00</td><td>2019-07-20 00:00:00</td><td>FP Comprehensive Training</td><td>RCHS</td><td>Family Planning</td><td>Classroom</td><td>4</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>FP HIV Integration</td><td>RCHS</td><td>Family Planning</td><td></td><td>3</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>TOT on Training for Peer Parent (ASPAH)</td><td>RCHS</td><td>Adolescent Health</td><td></td><td>2</td></tr><tr><td>Kilimanjaro Region</td><td>Moshi Municipal Council</td><td>Kilimanjaro Commercial Complex</td><td>UMATI</td><td>UMATI</td><td>Chai  Tanzana</td><td>2019-10-07 00:00:00</td><td>2019-10-18 00:00:00</td><td>Permanent Methods Training</td><td>RCHS</td><td>Family Planning</td><td>Classroom</td><td>2</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Growth Monitoring (GM)</td><td>RCHS</td><td>Child Health</td><td></td><td>1</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Emergency Triage (ETAT) </td><td>RCHS</td><td>Child Health</td><td></td><td>1</td></tr><tr><td>Dar Es Salaam Region</td><td>Amana Regional Referral Hospital</td><td>KIJITONYAMA</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Clinical Mentorship on Emergency Obstetric and Newborn Care</td><td>RCHS</td><td>Safe Motherhood Initiative</td><td></td><td>1</td></tr><tr><td>Lindi Region</td><td>Kilwa District Council</td><td></td><td>MoHCDGEC</td><td>MoHCDGEC</td><td>Nassoro  Mkwili</td><td>2018-06-15 00:00:00</td><td>2018-06-16 00:00:00</td><td>Focused Antenatal Care (FANC)</td><td>RCHS</td><td>Safe Motherhood Initiative</td><td></td><td>1</td></tr><tr><td>Lindi Region</td><td>Kilwa District Council</td><td></td><td>MoHCDGEC</td><td>MoHCDGEC</td><td>Nassoro  Mkwili</td><td>2018-04-14 00:00:00</td><td>2018-04-15 00:00:00</td><td>Postpartum PPIUD</td><td>RCHS</td><td>Family Planning</td><td></td><td>1</td></tr><tr><td>Mtwara Region</td><td>Masasi District Council</td><td>Tiffany Diamond</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>TOT on Clinical Management of Gender Based Violence and Violence against Children (GBV&amp;VAC)</td><td>RCHS</td><td>Gender</td><td></td><td>1</td></tr><tr><td>Mtwara Region</td><td>Mtwara Municipal Council</td><td>Tiffany Diamond</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>FP Comprehensive Training</td><td>RCHS</td><td>Family Planning</td><td></td><td>1</td></tr><tr><td>Mtwara Region</td><td>Mtwara Municipal Council</td><td>Tiffany Diamond</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Long Acting Contraceptive Training</td><td>RCHS</td><td>Family Planning</td><td></td><td>1</td></tr><tr><td>Mtwara Region</td><td>Mtwara Municipal Council</td><td>Tiffany Diamond</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Short Acting Contraceptive Training</td><td>RCHS</td><td>Family Planning</td><td></td><td>1</td></tr><tr><td>Mtwara Region</td><td>Mtwara Municipal Council</td><td>Tiffany Diamond</td><td>GOT/MoHCDGEC/MOF</td><td>GOT/MoHCDGEC/MOF</td><td>Chai  Tanzana</td><td>2019-03-18 00:00:00</td><td>2019-03-29 00:00:00</td><td>Distance Learning Integrated Management and Child Illness (DIMCI)</td><td>RCHS</td><td>Child Health</td><td></td><td>1</td></tr></tbody>
                                     </table>');
                               `);
    }
  }
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
