import { MigrationInterface, QueryRunner } from 'typeorm';
import { generateUid } from '../../core/helpers/makeuid';

// import * as uid from 'uid'
// import getUid from '@iapps/utils'
export class RecordRefactoring1555771266129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let userTable = await queryRunner.getTable('hris_record');

    if (userTable) {
      await queryRunner.query('DROP TABLE "record"');
      await queryRunner.query('ALTER TABLE "hris_record" RENAME TO "record"');

      await queryRunner.query(
        'ALTER TABLE "record" ADD COLUMN "createdbyid" INTEGER',
      );
      await queryRunner.query(
        'ALTER TABLE "record" ADD CONSTRAINT "fk_record_createdby" FOREIGN KEY("createdbyid") REFERENCES "user"',
      );
      await queryRunner.query(
        'ALTER TABLE "record" ADD COLUMN "lastupdatedbyid" INTEGER',
      );
      await queryRunner.query(
        'ALTER TABLE "record" ADD CONSTRAINT "fk_record_lastupdatedby" FOREIGN KEY("lastupdatedbyid") REFERENCES "user"',
      );
      await queryRunner.query(
        'ALTER TABLE "record" RENAME COLUMN "id" TO "recordid"',
      );

      await queryRunner.query(
        'ALTER TABLE "record" RENAME COLUMN "organisationunit_id" TO "organisationunitid"',
      );
      await queryRunner.query(
        'ALTER TABLE "record" RENAME COLUMN "form_id" TO "formid"',
      );
      await queryRunner.query(
        'ALTER TABLE "record" RENAME COLUMN "datecreated" TO "created"',
      );

      await queryRunner.query('ALTER TABLE "record" DROP COLUMN "complete"');
      await queryRunner.query('ALTER TABLE "record" DROP COLUMN "correct"');
      await queryRunner.query('ALTER TABLE "record" DROP COLUMN "hashistory"');
      await queryRunner.query('ALTER TABLE "record" DROP COLUMN "hastraining"');
      await queryRunner.query(
        'UPDATE "record" r SET createdbyid=u.id, lastupdatedbyid=u.id FROM "user" u WHERE r.username = u.username',
      );

      await queryRunner.query('ALTER TABLE "record" DROP COLUMN "username"');

      let query =
        'CREATE TABLE public.recordvalue(' +
        'created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,' +
        'lastupdated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,' +
        'recordvalueid BIGSERIAL NOT NULL,' +
        'uid character varying(256) NOT NULL,' +
        'value text COLLATE pg_catalog."default" NOT NULL,' +
        'startdate timestamp without time zone,' +
        'enddate timestamp without time zone,' +
        'comment character varying(255) COLLATE pg_catalog."default" DEFAULT NULL:: character varying,' +
        'entitledpayment character varying(255) COLLATE pg_catalog."default" DEFAULT NULL:: character varying,' +
        'recordid integer NOT NULL,' +
        'fieldid integer NOT NULL,' +
        'CONSTRAINT "PK_7eee1d43a341d7d9081f4653f75" PRIMARY KEY(recordvalueid),' +
        'CONSTRAINT "Unique_uid" UNIQUE (uid), ' +
        'CONSTRAINT "FK_6c8389b754538fff362120945f2" FOREIGN KEY(recordid) ' +
        'REFERENCES public.record(recordid) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE,' +
        'CONSTRAINT "FK_6c8389b754538fff362120945f5" FOREIGN KEY(fieldid) ' +
        'REFERENCES public.hris_field(id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE)';
      await queryRunner.query(query);

      const results = await queryRunner.manager.query('SELECT * FROM record');
      const fields = await queryRunner.manager.query(
        'SELECT * FROM hris_field',
      );
      const fieldsObject = {};

      fields.forEach(field => {
        fieldsObject[field.uid] = field.id;
      });

      const fieldOptions = await queryRunner.manager.query(
        'SELECT * FROM fieldoption',
      );
      const fieldOptionsObject = {};

      fieldOptions.forEach(field => {
        fieldOptionsObject[field.uid] = field.value;
      });
      do {
        let newObjects = [];
        results.splice(0, 1000).forEach(data => {
          let jsonData = JSON.parse(data.value);
          Object.keys(jsonData).forEach(key => {
            let value = '';
            if (jsonData[key]) {
              if (jsonData[key].date) {
                value = jsonData[key].date;
              } else {
                if (fieldOptionsObject[jsonData[key]]) {
                  value = fieldOptionsObject[jsonData[key]];
                } else {
                  value = jsonData[key];
                }
              }
            }
            newObjects.push({
              fieldid: fieldsObject[key],
              value: value,
              recordid: data.recordid,
            });
          });
        });
        //await queryRunner.manager.save(RecordValue, newObjects);
        await this.updateData(queryRunner, newObjects);
      } while (results.length > 0);
    }

    //Add history data
    /*await queryRunner.manager.query(
      'ALTER TABLE recordvalue ADD COLUMN lastupdatedby character varying;',
    );
    await queryRunner.manager.query(
      `INSERT INTO fielddatatype(uid,name,created,lastupdated) VALUES (uid(),'Organisation Unit',now(),now());`,
    );
    await queryRunner.manager.query(
      `INSERT INTO field("dataTypeId","fieldInputTypeId",uid,name,caption,compulsory,isunique,
      iscalculated,hashistory,hastarget,skipinreport,created,lastupdated)
  VALUES((SELECT id FROM fielddatatype WHERE name='Organisation Unit'),(SELECT id FROM fieldinputtype WHERE name='Text'),
       uid(),'previous_duty_post','Previous Duty Post',false,false,
      false,true,false,true,now(),now()
  );`,
    );
    await queryRunner.manager.query(
      `UPDATE hris_record_history SET history=REPLACE(history, 'Centre', 'Center' );`,
    );
    await queryRunner.manager.query(
      `UPDATE hris_record_history his SET organisationunit_id=(SELECT id FROM organisationunit WHERE his.history=name LIMIT 1)
      WHERE his.organisationunit_id IS NULL AND his.field_id IS NULL`,
    );

    await queryRunner.manager.query(
      `UPDATE hris_record_history his SET field_id=(SELECT "fieldId" FROM fieldoption WHERE his.history=value LIMIT 1)
      WHERE his.organisationunit_id IS NULL AND his.field_id IS NULL`,
    );

    await queryRunner.manager.query(
      `INSERT INTO recordvalue(created,lastupdated,uid,value,startdate,enddate,comment,entitledpayment,recordid,fieldid,lastupdatedby)
      SELECT 
        datecreated,lastupdated,uid,history,startdate,enddate,reason,entitled_payment,record_id,field_id,username
      FROM hris_record_history
      WHERE organisationunit_id IS NULL AND field_id IS NOT NULL
      UNION
      SELECT 
        datecreated,lastupdated,uid,(SELECT uid FROM organisationunit WHERE id=organisationunit_id),
        startdate,enddate,reason,entitled_payment,record_id,(SELECT id FROM field WHERE name='previous_duty_post'),username
      FROM hris_record_history
      WHERE organisationunit_id IS NOT NULL;`,
    );*/
  }

  async updateData(queryRunner, data) {
    let batch = 1000;
    do {
      let query =
        'INSERT INTO public.recordvalue(created, lastupdated, uid, value, recordid, fieldid)VALUES';
      let index = 0;
      data.splice(0, batch).forEach(recordValue => {
        let value = recordValue.value;
        if (typeof value !== 'string') {
          if (typeof value === 'number') {
            value = '' + value;
          } else if (typeof value === 'boolean') {
            value = '' + value;
          } else if (typeof value === 'object') {
            if (value) {
              if (Object.keys(value).length === 0) {
                value = null;
              } else {
                console.error('Error Value Object:', value);
                //process.exit();
              }
            }
          } else {
            console.log('Error Value Object:', typeof value, value);
            //process.exit();
          }
        } else {
          value = value.split("'").join("''");
        }
        if (recordValue.fieldid && value) {
          if (index > 0) {
            query += ',';
          }
          query += `(now(),now(),'${generateUid()}','${value}',${recordValue.recordid},${recordValue.fieldid})`;
          index++;
        }
      });
      await queryRunner.manager.query(query);
    } while (data.length > 0);
  }
  public async down(queryRunner: QueryRunner): Promise<any> { }
}