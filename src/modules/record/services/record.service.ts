import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BaseService } from '../../../core/services/base.service';
import { getWhereConditions } from '../../../core/utilities';
import {
  getRelations,
  getSelections,
} from '../../../core/utilities/get-fields.utility';
import { Field } from '../../form/entities/field.entity';
import { Form } from '../../form/entities/form.entity';
import { OrganisationUnit } from '../../organisation-unit/entities/organisation-unit.entity';
import { SessionParticipant } from '../../training/entities/training-session-participant.entity';
import { TrainingSession } from '../../training/entities/training-session.entity';
import { RecordValue } from '../entities/record-value.entity';
import { Record } from '../entities/record.entity';
import * as _ from 'lodash';

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

  async createRecord(createRecordDto: any): Promise<Record> {
    if (!Array.isArray(createRecordDto)) {
      return this.createOneRecord(createRecordDto);
    }
    if (Array.isArray(createRecordDto)) {
      const record = await this.createMultipleRecords(createRecordDto);
      return record;
    }
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
    try {
      Object.keys(createRecordDto).forEach((key) => {
        recordValue[key] = createRecordDto[key];
      });
      recordValue.field = await this.fieldRepository.findOne({
        where: { uid: createRecordDto.field },
      });
      recordValue.record = await this.recordRepository.findOne({
        where: { uid: uid },
      });
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
    } catch (e) {
      return e;
    }
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
      return await this.recordValueRepository.save(recordValue);
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
    await this.recordRepository.update(
      { uid: uid },
      {
        organisationUnit: await this.organisationunitRepository.findOne({
          where: { uid: transferRecordDto.organisationUnit },
        }),
      },
    );
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
      recordid: record,
      participationdetails: await this.participantRepository.find({
        relations: ['session'],
        join: {
          alias: 'sessionparticipant',
          leftJoinAndSelect: {
            assessedby: 'sessionparticipant.assessedby',
            certifiedby: 'sessionparticipant.certifiedby',
          },
        },
        where: { recordId: recordid },
      }),
    };
  }
  async createRecordWithRecordValues(createRecordDto: {
    organisationUnit: any;
    form: any;
    recordValues: any[];
  }): Promise<any> {
    const record = new Record();

    record.organisationUnit = await this.organisationunitRepository.findOne({
      where: { uid: createRecordDto.organisationUnit },
    });
    record.form = await this.formRepository.findOne({
      where: { uid: createRecordDto.form },
    });
    const savedRecord = await this.recordRepository.save(record);
    const arrayData = [];
    for (const recordValue of await createRecordDto?.recordValues) {
      const record = await this.createRecordValue(savedRecord.uid, recordValue);
      arrayData.push(record);
    }
    if (arrayData.length === createRecordDto?.recordValues.length) {
      const returnedRecord = await this.findOneByUid(savedRecord.uid);
      return returnedRecord;
    }
  }
  async createOneRecord(createRecordDto) {
    if (
      createRecordDto?.recordValues === undefined ||
      createRecordDto?.recordValues?.length === 0
    ) {
      let record = new Record();
      Object.keys(createRecordDto).forEach((key) => {
        record[key] = createRecordDto[key];
      });

      record.organisationUnit = await this.organisationunitRepository.findOne({
        where: { uid: createRecordDto.organisationUnit },
      });
      record.form = await this.formRepository.findOne({
        where: { uid: createRecordDto.form },
      });
      await this.recordRepository.save(record);

      return this.findOneByUid(record.uid);
    }
    if (
      createRecordDto?.recordValues !== undefined ||
      createRecordDto?.recordValues?.length > 0
    ) {
      return await this.createRecordWithRecordValues(createRecordDto);
    }
  }
  async createMultipleRecords(createRecordDTO: any[]): Promise<any> {
    const recordCounterArray = [];
    for (const record of createRecordDTO) {
      const recordsaved = await this.createRecordWithRecordValues(record);
      recordCounterArray.push(recordsaved);
      if (recordCounterArray.length === createRecordDTO.length) {
        return {
          message: `Records created successfully`,
          payload: recordCounterArray,
        };
      }
    }
  }
}
