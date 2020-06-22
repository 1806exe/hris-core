import { Injectable } from '@nestjs/common';
import { Report } from '../entities/report.entity';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceBaseService } from 'src/core/maintenance/services/base.service';
import { BaseService } from 'src/core/services/base.service';

@Injectable()
export class ReportService extends BaseService<Report> {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private readonly connection: Connection,
  ) {
    super(reportRepository, Report);
  }

  async envokeSQL(id: string) {
    const sqlView = await this.reportRepository.findOne({ where: { uid: id } });
    const results = {
      pager: {
        page: 1,
        pageCount: 285,
        total: 14220,
        pageSize: 50,
      },
      listGrid: {
        metaData: {},
        headerWidth: 0,
        subtitle: '',
        width: 0,
        title: 'all_account_details',
        height: 0,
        headers: [],
        rows: [],
      },
    };
    const data = await this.connection.query(sqlView.code);
    if (data.length > 0) {
      results.listGrid.headers = Object.keys(data[0]).map((key) => {
        return {
          hidden: false,
          meta: false,
          name: key,
          column: key,
          type: 'string',
        };
      });
      results.listGrid.rows = data.map((row) => {
        const newRow = [];
        results.listGrid.headers.forEach((header, index) => {
          newRow[index] = row[header.name];
        });
        return newRow;
      });
      results.listGrid.height = results.listGrid.rows.length;
      results.listGrid.headerWidth = results.listGrid.headers.length;
      results.listGrid.width = results.listGrid.headers.length;
    }
    results.listGrid.title = sqlView.name;
    return results;
  }
}
