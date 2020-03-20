import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../../core/services/base.service';
import { Record } from '../entities/record.entity';
import { RecordValue } from '../entities/record-value.entity';
import { Field } from 'src/modules/form/entities/field.entity';
import {
  getSelections,
  getRelations,
} from 'src/core/utilities/get-fields.utility';
import { getWhereConditions } from 'src/core/utilities';
import { OrganisationUnit } from 'src/modules/organisation-unit/entities/organisation-unit.entity';
import { Form } from 'src/modules/form/entities/form.entity';
// import { getUid } from '@iapps/utils';
import * as uid from 'uid';
import { generateUid } from 'src/core/helpers/makeuid';

@Injectable()
export class RecordService extends BaseService<Record> {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
    @InjectRepository(RecordValue)
    private recordValueRepository: Repository<RecordValue>,
    @InjectRepository(OrganisationUnit)
    private organisationunitRepository: Repository<OrganisationUnit>,
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
    @InjectRepository(Field) private fieldRepository: Repository<Field>,
  ) {
    super(recordRepository, Record);
  }

  async saveRecordValues(record: string, recordValues: any) {
    //this.recordRepository.getB
    /*recordValues = recordValues.map((recordValue)=>{
      console.log(recordValue.id);
      return {
        ...recordValue,
        recordvalueid: parseInt(recordValue.id),
        record :{
          "uid": await this.recordRepository.findOne({uid:record})
        },
        fieldid :{
          "uid": recordValue.field
        }
      }
    });*/
    let results = {
      stats: {
        created: 0,
        updated: 0,
        deleted: 0,
        ignored: 0,
      },
      errors: [],
    };
    for (let recordValue of recordValues) {
      try {
        if (recordValue.id) {
          await this.recordValueRepository.update(
            {
              recordvalueid: parseInt(recordValue.id),
              record: {
                id: (await this.recordRepository.findOne({ uid: record })).id,
              },
              field: {
                id: (
                  await this.fieldRepository.findOne({ uid: '5289e934b615b' })
                ).id,
              },
            },
            {
              value: recordValue.value,
            },
          );
          results.stats.updated++;
        } else {
          await this.recordValueRepository.save({
            record: {
              id: (await this.recordRepository.findOne({ uid: record })).id,
            },
            field: {
              id: (await this.fieldRepository.findOne({ uid: '5289e934b615b' }))
                .id,
            },
            value: recordValue.value,
            startDate: recordValue.startDate,
            endDate: recordValue.endDate,
            comment: recordValue.comment,
          });
          results.stats.created++;
        }
      } catch (e) {
        results.stats.ignored++;
        results.errors.push(e.message);
      }
    }
    return results;
  }

  async findAndCount(fields, filter, size, page): Promise<[Record[], number]> {
    const metaData = this.recordRepository.manager.connection.getMetadata(
      Record,
    );
    let join: any = {};
    join = {
      alias: 'record',
      leftJoinAndSelect: {
        form: 'record.form',
        organisationUnit: 'record.organisationUnit',
      },
    };
    let where: any = getWhereConditions(filter);

    const orgunitsquery = this.organisationunitRepository.createQueryBuilder();
    const getOrgunits = await orgunitsquery.getMany();
    const orgunits = await JSON.parse(
      JSON.stringify(getOrgunits)
        .split('OrganisationUnit')
        .join(''),
    );

    const formquery = this.formRepository.createQueryBuilder();
    const getForms = await formquery.getMany();
    const forms = await JSON.parse(
      JSON.stringify(getForms)
        .split('Form')
        .join(''),
    );

    const whereParams = { ...where[0], ...where[1] };
    const actualForm = await forms.filter(
      form => form.uid === whereParams.form,
    );
    const actualOrgUnit = await orgunits.filter(
      orgunit => orgunit.uid === whereParams.organisationUnit,
    );

    where = { organisationUnit: actualOrgUnit[0].id, form: actualForm[0].id };

    let [records, number] = await this.recordRepository.findAndCount({
      select: getSelections(fields, metaData),
      relations: getRelations(fields, metaData),
      where,
      join,
      skip: page * size,
      take: size,
    });

    let query = `SELECT recordvalue.recordvalueid,recordvalue.uid,recordvalue.recordid,recordvalue.value,recordvalue.startdate,
    recordvalue.enddate,recordvalue.comment,recordvalue.entitledpayment,field.uid as field FROM recordvalue
    INNER JOIN field ON(field.id=recordvalue.fieldid)
    WHERE recordvalue.recordid IN(${records
      .map(record => record.id)
      .join(',')})`;
    let recordValues = await this.recordValueRepository.manager.query(query);
    return [
      records.map((record: any) => {
        return {
          ...record,
          recordValues: recordValues.filter(
            recordValue => recordValue.recordid === record.id,
          ),
        };
      }),
      number,
    ];
  }

  async createRecordValue(uid: string, createRecordDto: any): Promise<any> {
    let recordValue = new RecordValue();
    const {
      value,
      startDate,
      endDate,
      comment,
      fieldid,
      entitledPayment,
    } = createRecordDto;

    let query = await this.fieldRepository.manager.query(
      `select id from field where uid='${fieldid}'`,
    );
    let idfield = query[0].id;
    let recordGot = (await this.recordRepository.findOne({ uid })).id;
    recordValue.uid = generateUid();
    recordValue.value = value;
    recordValue.startDate = startDate;
    recordValue.endDate = endDate;
    recordValue.comment = comment;
    recordValue.entitledPayment = entitledPayment;
    recordValue.recordid = recordGot;
    recordValue.fieldid = idfield;
    console.log(recordValue.uid);

    await this.recordValueRepository.save(recordValue);
  }
  async updateRecordValue(
    uid: string,
    updateRecordValueDto: any,
  ): Promise<any> {
    const {
      value,
      comment,
      endDate,
      entitledPayment,
      created,
      lastUpdated,
    } = updateRecordValueDto;

    let recordValue = await this.recordValueRepository.findOne({ uid });
    recordValue.value = value;
    recordValue.comment = comment;
    recordValue.endDate = endDate;
    recordValue.entitledPayment = entitledPayment;
    recordValue.created = created;
    recordValue.lastUpdated = lastUpdated;

    await this.recordValueRepository.save(recordValue);
  }

  async findOneByUid(uid: string): Promise<Record> {
    console.log('Fetching By UID');
    return await this.recordRepository.findOne({ where: { uid } });
  }
}
