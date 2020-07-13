import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateUid } from '../../../core/helpers/makeuid';
import { getWhereConditions } from '../../../core/utilities';
import {
  getRelations,
  getSelections,
} from '../../../core/utilities/get-fields.utility';
import { Field } from '../../form/entities/field.entity';
import { Form } from '../../form/entities/form.entity';
import { OrganisationUnit } from '../../organisation-unit/entities/organisation-unit.entity';
import { Repository, QueryBuilder, createQueryBuilder, In } from 'typeorm';
import { BaseService } from '../../../core/services/base.service';
import { RecordValue } from '../entities/record-value.entity';
import { Record } from '../entities/record.entity';
import { TrainingSession } from '../../training/entities/training-session.entity';
import { SessionParticipant } from '../../training/entities/training-session-participant.entity';

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
    @InjectRepository(TrainingSession)
    private traainingSessionRepository: Repository<TrainingSession>,
    @InjectRepository(SessionParticipant)
    private participantRepository: Repository<SessionParticipant>,
  ) {
    super(recordRepository, Record);
  }

  async createRecord(createRecordDto: any) {
    let record = new Record();
    const { organisationUnit, form, instance } = createRecordDto;

    const query = await this.organisationunitRepository.manager.query(
      `select id from organisationunit where uid='${organisationUnit}'`,
    );
    const orgunitid = query[0].id;
    const queryform = await this.formRepository.manager.query(
      `select id from form where uid = '${form}'`,
    );
    const formid = queryform[0].id;
    record.uid = generateUid();
    record.form = formid;
    record.organisationUnit = orgunitid;
    record.instance = instance;

    await this.recordRepository.save(record);

    return this.findOneByUid(record.uid);
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
      JSON.stringify(getOrgunits).split('OrganisationUnit').join(''),
    );

    const formquery = this.formRepository.createQueryBuilder();
    const getForms = await formquery.getMany();
    const forms = await JSON.parse(
      JSON.stringify(getForms).split('Form').join(''),
    );

    const whereParams = { ...where[0], ...where[1] };
    const actualForm = await forms.filter(
      (form) => form.uid === whereParams.form,
    );
    const actualOrgUnit = await orgunits.filter(
      (orgunit) => orgunit.uid === whereParams.organisationUnit,
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

    if (records.length === 0) {
      return [[], number];
    }

    let query = `SELECT recordvalue.recordvalueid,recordvalue.uid,recordvalue.recordid,recordvalue.value,recordvalue.startdate,
    recordvalue.enddate,recordvalue.comment,recordvalue.entitledpayment,field.uid as field FROM recordvalue
    INNER JOIN field ON(field.id=recordvalue.fieldid)
    WHERE recordvalue.recordid IN(${records
      .map((record) => record.id)
      .join(',')})`;
    let recordValues = await this.recordValueRepository.manager.query(query);
    return [
      records.map((record: any) => {
        return {
          ...record,
          recordValues: recordValues.filter(
            (recordValue) => recordValue.recordid === record.id,
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
      field,
      entitledPayment,
    } = createRecordDto;

    const query = await this.fieldRepository.find({
      select: ['id'],
      where: [{ uid: field }],
    });
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

    const recordValueResponse = await this.recordValueRepository.save(
      recordValue,
    );

    return await this.recordValueRepository.findOne({
      where: { uid: recordValueResponse.uid },
      join: {
        alias: 'recordValue',
        leftJoinAndSelect: { field: 'recordValue.field' },
      },
    });
  }
  async updateRecordValue(
    uid: string,
    updateRecordValueDto: any,
  ): Promise<any> {
    const recordValue = await this.recordValueRepository.findOne({
      where: { uid: uid },
    });
    try {
      Object.keys(updateRecordValueDto).forEach((key) => {
        recordValue[key] = updateRecordValueDto[key];
      });
      await this.recordValueRepository.save(recordValue);
    } catch (e) {
      return e;
    }
  }

  async finOneRecordValue(uid: string): Promise<RecordValue> {
    return this.recordValueRepository.findOne({ where: { uid: uid } });
  }

  async findOneByUid(uid: string): Promise<Record> {
    const record = await this.recordRepository.findOne({
      where: { uid },
      join: {
        alias: 'record',
        leftJoinAndSelect: {
          form: 'record.form',
          organisationUnit: 'record.organisationUnit',
        },
      },
    });

    const recordValues = await this.recordValueRepository.find({
      where: { recordid: record.id },
      join: {
        alias: 'recordValue',
        leftJoinAndSelect: { field: 'recordValue.field' },
      },
    });

    record.recordValues = recordValues;

    return record;
  }
  async transferForm(uid: string, transferRecordDto: any): Promise<any> {
    const record = await this.recordRepository.findOne({ uid });
    const { form } = transferRecordDto;
    const query = await this.formRepository.manager.query(
      `SELECT id FROM form WHERE uid='${form}'`,
    );
    const formid = query[0].id;
    record.form = formid;
    await this.recordRepository.save(record);
    return await this.recordRepository.findOne({
      where: { uid },
      join: {
        alias: 'record',
        leftJoinAndSelect: {
          form: 'record.form',
          organisationUnit: 'record.organisationUnit',
        },
      },
    });
  }

  async transferOrganisationUnit(
    uid: string,
    transferRecordDto: any,
  ): Promise<any> {
    const record = await this.recordRepository.findOne({ uid });
    const { organisationUnit } = transferRecordDto;
    const query = await this.formRepository.manager.query(
      `SELECT id FROM organisationunit WHERE uid='${organisationUnit}'`,
    );
    const organisationUnitid = query[0].id;
    record.organisationUnit = organisationUnitid;
    await this.recordRepository.save(record);
    return await this.recordRepository.findOne({
      where: { uid },
      join: {
        alias: 'record',
        leftJoinAndSelect: {
          form: 'record.form',
          organisationUnit: 'record.organisationUnit',
        },
      },
    });
  }
  async getSessions(uid: string): Promise<any> {
    const record = (
      await this.recordRepository.findOne({ where: { uid: uid } })
    ).id;
    const query = await this.participantRepository.find({
      select: ['trainingsessionId'],
      where: { recordId: record },
    });

    if (query.length === 0 || query == undefined) {
      return { sessions: [] };
    }
    if (query.length == 1) {
      const session = await this.traainingSessionRepository.find({
        where: {
          id: query[0].trainingsessionId,
        },
      });
      return { sessions: session };
    }
    if (query.length > 1) {
      return {
        sessions: await this.traainingSessionRepository.find({
          where: {
            id: In(query.map((session) => +session.trainingsessionId)),
          },
        }),
      };
    }
  }
  async getParticipation(record: string) {
    const recordid = (
      await this.recordRepository.findOne({ where: { uid: record } })
    ).id;
    return {
      participationdetails: await this.participantRepository.find({
        relations: ['session'],
        where: { recordId: recordid },
      }),
    };
  }
}
