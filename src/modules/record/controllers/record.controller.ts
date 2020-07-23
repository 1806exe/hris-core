import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';
import { getSuccessResponse } from '../../../core/helpers/response.helper';
import { ApiResult } from '../../../core/interfaces';
import { sanitizeResponseObject } from '../../../core/utilities/sanitize-response-object';
import { Record } from '../../record/entities/record.entity';
import { SessionGuard } from '../../system/user/guards/session.guard';
import { RecordValue } from '../entities/record-value.entity';
import { RecordService } from '../services/record.service';

@Controller('api/' + Record.plural)
export class RecordsController extends BaseController<Record> {
  constructor(private readonly recordService: RecordService) {
    super(recordService, Record);
  }

  @Get()
  @UseGuards(SessionGuard)
  async findAll(@Query() query): Promise<ApiResult> {
    if (!(query.organisationUnit && query.form)) {
      throw Error(
        'organisationUnit and form IDs are compulsory and must be supplied',
      );
    }
    if (!query.filter) {
      query.filter = [];
    } else if (!Array.isArray(query.filter)) {
      query.filter = [query.filter];
    }
    query.filter.push(`organisationUnit:eq:${query.organisationUnit}`);
    query.filter.push(`form:eq:${query.form}`);
    return super.findAll(query);
  }

  @Post()
  @UseGuards(SessionGuard)
  async createRecord(@Body() createRecordDto, @Res() res): Promise<any> {
    const record = await this.recordService.createRecord(createRecordDto);
    return res.status(HttpStatus.OK).send(sanitizeResponseObject(record));
  }

  @Post(':record/recordValues')
  @UseGuards(SessionGuard)
  async saveRecord(
    @Param('record') record,
    @Body() createRecordValueDto,
    @Res() res,
  ): Promise<any> {
    const recordValueResult = await this.recordService.createRecordValue(
      record,
      createRecordValueDto,
    );

    return res
      .status(HttpStatus.OK)
      .send(sanitizeResponseObject(recordValueResult));
  }
  @Put('recordValues/:recordValue')
  @UseGuards(SessionGuard)
  async updateRecord(
    @Param() recordValue,
    @Body() createRecordDto,
    @Res() res,
  ): Promise<RecordValue> {
    const recordvalue = await this.recordService.finOneRecordValue(
      recordValue.recordValue,
    );
    if (recordvalue === undefined) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(
          `Record value with ID ${recordValue.recordValue} is not available`,
        );
    }
    if (recordvalue !== undefined) {
      await this.recordService.updateRecordValue(
        recordValue.recordValue,
        createRecordDto,
      );
      return res
        .status(HttpStatus.OK)
        .send(`Record value with ID ${recordvalue.uid} Updated Successfully`);
    }
  }
  @Put(':record/formTransfer')
  @UseGuards(SessionGuard)
  async formTransfer(
    @Param('record') record,
    @Body() transferRecordDto,
    @Res() res,
  ): Promise<any> {
    const recordtransfered = await this.recordService.transferForm(
      record,
      transferRecordDto,
    );
    return res
      .status(HttpStatus.OK)
      .send(sanitizeResponseObject(recordtransfered));
  }

  @Put(':record/orgUnitTransfer')
  @UseGuards(SessionGuard)
  async orgUnitTransfer(
    @Param() param,
    @Body() transferRecordDto,
    @Res() res,
  ): Promise<any> {
    const recordid = await this.recordService.findOneByUid(param.record);
    if (recordid) {
      const recordtransfered = await this.recordService.transferOrganisationUnit(
        param.record,
        transferRecordDto,
      );
      return res
        .status(HttpStatus.OK)
        .send(sanitizeResponseObject(recordtransfered));
    } else {
      throw new NotFoundException(
        `Record ID ${param.record} does not exist in records`,
      );
    }
  }

  @Get(':record/sessions')
  @UseGuards(SessionGuard)
  async getSessions(@Param() param, @Res() res): Promise<any> {
    const sessions = await this.recordService.getSessions(param.record);

    return getSuccessResponse(res, sanitizeResponseObject(sessions));
  }
  @Get(':record/participation')
  async getParticipation(@Param() Param, @Res() res): Promise<any> {
    const record = await this.recordService.getParticipation(Param.record);
    return getSuccessResponse(res, sanitizeResponseObject(record));
  }
}
