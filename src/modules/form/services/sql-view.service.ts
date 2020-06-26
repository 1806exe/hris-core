import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../core/services/base.service';
import { SqlView } from '../entities/sqlview.entity';

@Injectable()
export class SqlViewService extends BaseService<SqlView> {
  constructor(
    @InjectRepository(SqlView)
    private repository: Repository<SqlView>,
    private readonly connection: Connection,
  ) {
    super(repository, SqlView);
  }

  async envokeSQL(id) {
    const sqlView = await this.findOneByUid(id);
    let results = {
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
    let data = await this.connection.query(sqlView.query);
    console.log('Data:', data[0]);
    if (data.length > 0) {
      results.listGrid.headers = Object.keys(data[0]).map(key => {
        return {
          hidden: false,
          meta: false,
          name: key,
          column: key,
          type: 'string',
        };
      });
      results.listGrid.rows = data.map(row => {
        var newRow = [];
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
