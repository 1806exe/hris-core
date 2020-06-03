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
  Patch,
} from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';
import { ApiResult } from 'src/core/interfaces';
import { Record } from 'src/modules/record/entities/record.entity';
import { SessionGuard } from 'src/modules/system/user/guards/session.guard';
import { RecordValue } from '../entities/record-value.entity';
import { RecordService } from '../services/record.service';
import { sanitizeResponseObject } from 'src/core/utilities/sanitize-response-object';

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
    console.log(recordValue, createRecordDto)
    try {
      await this.recordService.updateRecordValue(recordValue.recordValue, createRecordDto);
      return res.status(HttpStatus.OK).send('Record Value Updated');
    } catch {
      return res
        .status(HttpStatus.NOT_MODIFIED)
        .send('Recordvalues not Updated');
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
    @Param('record') record,
    @Body() transferRecordDto,
    @Res() res,
  ): Promise<any> {
    const recordtransfered = await this.recordService.transferOrganisationUnit(
      record,
      transferRecordDto,
    );
    return res
      .status(HttpStatus.OK)
      .send(sanitizeResponseObject(recordtransfered));
  }
}
