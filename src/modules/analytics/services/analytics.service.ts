import { PeriodInterface } from '@iapps/period-utilities';
import { Injectable } from '@nestjs/common';
import { find } from 'lodash';
import { Connection } from 'typeorm';
import {
  generateOUFilterQuery,
  getISOOrgUnits,
} from '../../../core/helpers/ou.helper';
import { getISOPeriods } from '../../../core/helpers/pe.helper';
import { getWhereConditions } from '../../../core/utilities';
import { Analytics } from '../../analytics/interfaces/analytics.interface';
import { IndicatorService } from '../../indicator/services/indicator.service';
import { OrganisationUnitLevelService } from '../../organisation-unit/services/organisation-unit-level.service';
import { OrganisationUnitService } from '../../organisation-unit/services/organisation-unit.service';
import { getAnalyticsHeaders } from '../helpers/get-analytics-headers.helper';


@Injectable()
export class AnalyticsService {
  constructor(
    private connetion: Connection,
    private indicatorService: IndicatorService,
    private orgUnitLevelService: OrganisationUnitLevelService,
    private orgUnitService: OrganisationUnitService,
  ) {}
  async fetchAnalytics(dx: any, pe: any, ou: any[], context: any) {
    {
      let analytics: Analytics = {
        headers: getAnalyticsHeaders(),
        metaData: { items: {}, dimensions: { dx: [], pe: [], ou: [], co: [] } },
        rows: [],
      };

      // Get Iso periods for the selected pes
      const isoPeriods = getISOPeriods(pe);

      const isoPeriodIds = isoPeriods.map(
        (period: PeriodInterface) => period.id,
      );

      // Get organisation unit levels
      const orgUnitLevels = await this.orgUnitLevelService.findAll();

      // Get indicators for use in computation
      const indicators = await this.getIndicators(dx);

      // Attached indicator information in analytics payload
      analytics.metaData.dimensions.ou = getISOOrgUnits(ou, context.user);
      let queries = [];
      // Pass through each indicator to generate its data
      for (const indicator of indicators) {
        // Push indicator information in analytics metadata payload
        analytics.metaData.dimensions.dx.push(indicator.uid);
        analytics.metaData.items[indicator.uid] = {
          name: indicator.name,
        };

        // Get filters for use in filtering indicator data from resource table
        let filter = '';
        filter = indicator.filter
          .split('${start_of_reporting_period}')
          .join('pe.startdate');

        filter = filter.split('${end_of_reporting_period}').join('pe.enddate');

        filter = filter.split('${').join('data."');

        filter = filter.split('}').join('"');

        if (filter.trim() !== '') {
          filter = ` AND (${filter}) `;
        }
        // Pass through selected organisation units to process data by ous
        for (let orgUnit of analytics.metaData.dimensions.ou) {
          queries.push(
            `SELECT '${
              indicator.uid
            }' as dx,'${orgUnit}' as ou,pe.iso as pe,COUNT(*) as value FROM _resource_table_${
              indicator.form.uid
            } data INNER JOIN _organisationunitstructure ous ON(data.ou=ous.uid) INNER JOIN _periodstructure pe ON((${isoPeriodIds
              .map((p) => `pe.iso='${p}'`)
              .join(' OR ')}) ${filter} ) WHERE ${generateOUFilterQuery(
              'ous',
              analytics.metaData.dimensions.ou,
              orgUnitLevels,
              context.user,
            )} GROUP BY pe.iso`,
          );
        }
      }
      // Find fields based on supplied indicators
      const fields = await this.getFields(dx);
      for (const field of fields) {
        analytics.metaData.dimensions.dx.push(field.optionuid);
        analytics.metaData.items[field.optionuid] = {
          name: field.option,
        };
        for (const orgUnit of analytics.metaData.dimensions.ou) {
          queries.push(
            `SELECT '${
              field.optionuid
            }' as dx,'${orgUnit}' as ou,pe.iso as pe,COUNT(*) as value FROM _resource_table_${
              field.formuid
            } data
        INNER JOIN _organisationunitstructure ous ON(data.ou=ous.uid) 
        INNER JOIN _periodstructure pe ON((${isoPeriodIds
          .map((p) => `pe.iso='${p}'`)
          .join(' OR ')})) 
        WHERE data."${field.uid}" = '${
              field.option
            }' AND ${generateOUFilterQuery(
              'ous',
              analytics.metaData.dimensions.ou,
              orgUnitLevels,
              context.user,
            )} 
        GROUP BY pe.iso`,
          );
        }
      }
      // update period in analytics metadata
      analytics.metaData.dimensions.pe = isoPeriodIds;
      analytics.metaData.dimensions.pe.forEach((peId) => {
        const isoPeriod: PeriodInterface = find(isoPeriods, ['id', peId]);
        analytics.metaData.items[peId] = isoPeriod
          ? { name: isoPeriod.name }
          : { name: peId };
      });

      // Get analytics results
      const result = await this.connetion.manager.query(
        queries.join(' UNION '),
      );

      // Attach result as analytics rows
      analytics.rows = result.map((data) => {
        return [data.dx, data.ou, data.pe, data.value];
      });

      // Find organisation units to attach in analytics payload
      const orgUnits = await this.orgUnitService.findIn({
        uid: analytics.metaData.dimensions.ou,
      });

      orgUnits.forEach((orgUnit) => {
        analytics.metaData.items[orgUnit.uid] = {
          name: orgUnit.name,
        };
      });

      // Set additional properties for analytics
      analytics.height = analytics.rows.length;
      analytics.width = analytics.headers.length;
      return analytics;
    }
  }

  async getIndicators(dx) {
    let indicators = {
      NMLDD43RiBt5g: {
        id: 'NMLDD43RiBt5g',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Forecast Retirement',
        shortname: 'Forecast Retirement',
        description: 'Calculates the retirement',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) > 60",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      uLhsWqITzfk6p: {
        id: 'uLhsWqITzfk6p',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employments',
        shortname: 'Employments',
        description: 'Calculates employees employed',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          '${start_of_reporting_period}<=${5289e934a9e8a} AND ${end_of_reporting_period}>=${5289e934a9e8a}',
        //"filter": "${end_of_reporting_period}>=${5289e934a9e8a}",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      uLhsWqITzfk6q: {
        id: 'uLhsWqITzfk6q',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'On Duty Employees',
        shortname: 'On Duty Employees',
        description: 'Calculates employees on duty',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "${5289e934a6b16} IN ('On Duty','On leave','On sick leave')",
        //"filter": "${end_of_reporting_period}>=${5289e934a9e8a}",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yKypqIROIO9: {
        id: 'yKypqIROIO9',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Male Employees',
        shortname: 'Employments',
        description: 'Calculates employees employed',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter: "'Male'=${5289e934bde20}",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yKypqIROIO8: {
        id: 'yKypqIROIO8',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Female Employees',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter: "'Female'=${5289e934bde20}",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yE9m8ltllxfq4: {
        id: 'yE9m8ltllxfq4',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employees Age 20-24',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) >= 20 AND DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) <= 24",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yE9m8ltllxfq5: {
        id: 'yE9m8ltllxfq5',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employees Age 25-29',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) >= 25 AND DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) <= 29",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yE9m8ltllxfq6: {
        id: 'yE9m8ltllxfq6',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employees Age 30-34',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) >= 30 AND DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) <= 34",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yE9m8ltllxfq7: {
        id: 'yE9m8ltllxfq7',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employees Age 35-39',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) >= 35 AND DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) <= 39",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yE9m8ltllxfq8: {
        id: 'yE9m8ltllxfq8',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employees Age 40-44',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) >= 40 AND DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) <= 44",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yE9m8ltllxfq9: {
        id: 'yE9m8ltllxfq9',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employees Age 45-49',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) >= 45 AND DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) <= 49",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yE9m8ltllxf10: {
        id: 'yE9m8ltllxf10',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employees Age 50-54',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) >= 50 AND DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) <= 54",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yE9m8ltllxf11: {
        id: 'yE9m8ltllxf11',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employees Age 55-59',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) >= 55 AND DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) <= 59",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yE9m8ltllxf12: {
        id: 'yE9m8ltllxf12',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employees Age 60-64',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) >= 60 AND DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) <= 64",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
      yE9m8ltllxf13: {
        id: 'yE9m8ltllxf13',
        created: '2020-04-03T08:30:16.506Z',
        lastupdated: '2020-04-03T08:30:16.506Z',
        name: 'Employees Age 65-69',
        shortname: 'Female Employees',
        description: 'Calculates Female Employees',
        expression: 'COUNT(*)',
        formuid: '52893cd128bd2',
        filter:
          "DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) >= 65 AND DATE_PART('year', ${end_of_reporting_period}) - DATE_PART('year', ${5289e934a140e}) <= 69",
        aggregationtype: 'SUM',
        analyticstype: 'RECORDS',
      },
    };
    return dx
      .filter((d) => {
        return Object.keys(indicators).includes(d);
      })
      .map((d) => {
        return {
          ...indicators[d],
          uid: indicators[d].id,
          form: {
            uid: indicators[d].formuid,
          },
        };
      })
      .concat(await this.indicatorService.findIn({ uid: dx }));
    //return await this.indicatorService.findIn({ uid: dx });
  }

  async getFields(dx) {
    return await this.connetion.manager.query(`SELECT 
    field.uid,field.caption as name,fieldoption.uid as optionuid,
    fieldoption.value as option,form.uid as formuid 
  FROM field
  INNER JOIN fieldoption ON(field.id=fieldoption."fieldId")
  INNER JOIN formfieldmember ON(formfieldmember.fieldid=field.id)
  INNER JOIN form ON(formfieldmember.formid=form.id)
  WHERE field.uid IN('${dx.join("','")}');`);
  }
  async getAnalyticsRecords(formid, ou, pe, otherDimensions) {
    let analytics = {
      headers: [],
      metaData: {
        items: {
          ou: { name: 'Organisation unit' },
          pe: { name: 'Period' },
        },
        dimensions: { pe: [], ou: [] },
      },
      rows: [],
      height: 0,
      width: 0,
    };
    let query = `SELECT field.uid,field.caption FROM field 
      INNER JOIN formfieldmember ON(formfieldmember.fieldid = field.id) 
      INNER JOIN form ON(form.id = formfieldmember.formid AND form.uid ='${formid}');`;
    let fields = await this.connetion.manager.query(query);
    fields.forEach((field) => {
      if (Object.keys(otherDimensions).indexOf(field.uid) > -1) {
        analytics.metaData.items[field.uid] = { name: field.caption };
      }
    });
    // Dealing with headers
    let headers = await this.connetion.manager.query(
      'SELECT columns.table_name,columns.column_name,' +
        'columns.data_type, columns.column_default, columns.is_nullable FROM information_schema.columns' +
        " WHERE table_name = '_resource_table_" +
        formid +
        "'",
    );
    let allowedColumns = ['uid', 'ou'].concat(Object.keys(otherDimensions));
    analytics.headers = headers
      .filter((header) => {
        return allowedColumns.indexOf(header.column_name) > -1;
      })
      .map((header) => {
        return {
          name: header.column_name,
          column: header.column_name,
          valueType: this.getGenericType(header.data_type),
        };
      });
    analytics.width = analytics.headers.length;

    query = 'SELECT level FROM organisationunitlevel';
    let orglevels = await this.connetion.manager.query(query);
    let levelquery = orglevels.map(
      (orglevel) =>
        'ous.uidlevel' + orglevel.level + " IN ('" + ou.join("','") + "')",
    );

    //TODO improve performance for fetching alot of data
    query = `SELECT ${allowedColumns.map(
      (column) => 'data."' + column + '"',
    )} FROM _resource_table_${formid} data
      INNER JOIN _organisationunitstructure ous ON(ous.uid = data.ou AND (${levelquery.join(
        ' OR ',
      )}))`;
    if (pe) {
      let periodquery = pe.map((p) => {
        let whereCondition = getWhereConditions(p);
        let [dx, operator, operand] = p.split(':');
        analytics.metaData.dimensions.pe.push(operand);
        if (operator == 'lt') {
          return `(data."${dx}" < pes.enddate AND pes.iso='${operand}')`;
        }
        return `(data."${dx}" BETWEEN pes.startdate AND pes.enddate AND pes.iso='${operand}')`;
      });
      query += ` INNER JOIN _periodstructure pes ON(${periodquery.join(
        ' OR ',
      )}) LIMIT 200000`;
    }
    let rows = await this.connetion.manager.query(query);
    analytics.height = rows.length;
    analytics.rows = rows.map((row) => {
      let newRow = [];
      analytics.headers.forEach((header, index) => {
        newRow[index] = row[header.name];
      });
      return newRow;
    });
    query =
      'SELECT ou.uid,ou.name FROM  organisationunit ou WHERE (' +
      ou.map((o) => "ou.uid = '" + o + "'").join(' OR ') +
      ') ';
    let organisationunits = await this.connetion.manager.query(query);
    organisationunits.forEach((orgUnit) => {
      analytics.metaData.items[orgUnit.uid] = orgUnit.name;
      analytics.metaData.dimensions.ou.push(orgUnit.uid);
    });
    return analytics;
  }

  async getAnalyticsOrgUnitCount(ou, pe, otherDimensions, context) {
    let analytics: Analytics = {
      headers: [
        {
          name: 'dx',
          column: 'Data',
          valueType: 'TEXT',
          type: 'java.lang.String',
          hidden: false,
          meta: true,
        },
        {
          name: 'ou',
          column: 'Organisation unit',
          valueType: 'TEXT',
          type: 'java.lang.String',
          hidden: false,
          meta: true,
        },
        {
          name: 'pe',
          column: 'Period',
          valueType: 'TEXT',
          type: 'java.lang.String',
          hidden: false,
          meta: true,
        },
        {
          name: 'value',
          column: 'Value',
          valueType: 'NUMBER',
          type: 'java.lang.Double',
          hidden: false,
          meta: false,
        },
      ],
      metaData: { items: {}, dimensions: { dx: [], pe: [], ou: [], co: [] } },
      rows: [],
    };
    let query = 'SELECT level FROM organisationunitlevel';
    let orglevels = await this.connetion.manager.query(query);
    //let dx = ["yE9m8ltllxfqP"];
    let queries = [];
    for (let orgUnit of getISOOrgUnits(ou, context.user)) {
      queries.push(
        `SELECT '${orgUnit}' as ou,COUNT(*) as value FROM _organisationunitstructure ous
      WHERE ${generateOUFilterQuery('ous', ou, orglevels, context.user)}`,
      );
    }
    //analytics.metaData.dimensions.pe = getISOPeriods(pe);
    let result = await this.connetion.manager.query(queries.join(' UNION '));
    analytics.rows = result.map((data) => {
      if (analytics.metaData.dimensions.ou.indexOf(data.ou) === -1) {
        analytics.metaData.dimensions.ou.push(data.ou);
      }
      return [data.ou, data.value];
    });
    query = `SELECT *  FROM organisationunit WHERE uid IN('${analytics.metaData.dimensions.ou.join(
      "','",
    )}')`;
    (await this.connetion.manager.query(query)).forEach((orgUnit) => {
      analytics.metaData.items[orgUnit.uid] = {
        name: orgUnit.name,
      };
    });
    analytics.height = analytics.rows.length;
    analytics.width = analytics.headers.length;
    return analytics;
  }
  getGenericType(type) {
    if (type === 'timestamp without time zone') {
      return 'DATETIME';
    } else if (type === 'character varying') {
      return 'TEXT';
    } else if (type === 'integer') {
      return 'INTEGER';
    } else {
      return type;
    }
  }
}
