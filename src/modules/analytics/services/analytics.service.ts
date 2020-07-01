import { Injectable, Logger } from '@nestjs/common';
import {
  generateOUFilterQuery,
  getISOOrgUnits,
} from '../../../core/helpers/ou.helper';
import { getISOPeriods, getPeriodDetails } from '../../../core/helpers/pe.helper';
import { Analytics } from '../../analytics/interfaces/analytics.interface';
import { getWhereConditions } from '../../../core/utilities';
import { IndicatorService } from '../../indicator/services/indicator.service';
import { OrganisationUnitLevelService } from '../../organisation-unit/services/organisation-unit-level.service';
import { Connection } from 'typeorm';
import { getAnalyticsHeaders } from '../helpers/get-analytics-headers.helper';
import { OrganisationUnitService } from '../../organisation-unit/services/organisation-unit.service';

declare module namespace {}

@Injectable()
export class AnalyticsService {
  constructor(
    private connetion: Connection,
    private indicatorService: IndicatorService,
    private orgUnitLevelService: OrganisationUnitLevelService,
    private orgUnitService: OrganisationUnitService,
  ) {}
  sampleAnalytics = {
    wo7ITisRXeE: {
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
          name: 'pe',
          column: 'Period',
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
          name: 'value',
          column: 'Value',
          valueType: 'NUMBER',
          type: 'java.lang.Double',
          hidden: false,
          meta: false,
        },
      ],
      metaData: {
        items: {
          '2010': { name: '2010' },
          '2011': { name: '2011' },
          '2012': { name: '2012' },
          '2013': { name: '2013' },
          '2014': { name: '2014' },
          '2015': { name: '2015' },
          '2016': { name: '2016' },
          '2017': { name: '2017' },
          '2018': { name: '2018' },
          '2019': { name: '2019' },
          '2020': { name: '2020' },
          ou: { name: 'Organisation unit' },
          dx: { name: 'Data' },
          pe: { name: 'Period' },
          m0frOspS7JY: { name: 'MOH - Tanzania' },
          wo7ITisRXeE: { name: 'Number of employments' },
        },
        dimensions: {
          dx: ['wo7ITisRXeE'],
          pe: [
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
          ],
          ou: ['m0frOspS7JY'],
          co: [],
        },
      },
      rows: [
        ['wo7ITisRXeE', '2010', 'm0frOspS7JY', '5275'],
        ['wo7ITisRXeE', '2011', 'm0frOspS7JY', '3310'],
        ['wo7ITisRXeE', '2012', 'm0frOspS7JY', '5031'],
        ['wo7ITisRXeE', '2013', 'm0frOspS7JY', '5207'],
        ['wo7ITisRXeE', '2014', 'm0frOspS7JY', '7437'],
        ['wo7ITisRXeE', '2015', 'm0frOspS7JY', '7498'],
        ['wo7ITisRXeE', '2016', 'm0frOspS7JY', '718'],
        ['wo7ITisRXeE', '2017', 'm0frOspS7JY', '1975'],
        ['wo7ITisRXeE', '2018', 'm0frOspS7JY', '5650'],
        ['wo7ITisRXeE', '2019', 'm0frOspS7JY', '340'],
      ],
      width: 4,
      height: 36,
    },
    yKypqIROIO9: {
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
          name: 'value',
          column: 'Value',
          valueType: 'NUMBER',
          type: 'java.lang.Double',
          hidden: false,
          meta: false,
        },
      ],
      metaData: {
        items: {
          '2010': { name: '2010' },
          '2011': { name: '2011' },
          '2012': { name: '2012' },
          '2013': { name: '2013' },
          '2014': { name: '2014' },
          '2015': { name: '2015' },
          '2016': { name: '2016' },
          '2017': { name: '2017' },
          '2018': { name: '2018' },
          '2019': { name: '2019' },
          '2020': { name: '2020' },
          ou: { name: 'Organisation unit' },
          dx: { name: 'Data' },
          pe: { name: 'Period' },
          m0frOspS7JY: { name: 'MOH - Tanzania' },
          yKypqIROIO3: { name: 'Female' },
          yKypqIROIO9: { name: 'Male' },
        },
        dimensions: {
          dx: ['yKypqIROIO9', 'yKypqIROIO3'],
          pe: [],
          ou: ['m0frOspS7JY'],
          co: [],
        },
      },
      rows: [
        ['yKypqIROIO9', 'm0frOspS7JY', '5275'],
        ['yKypqIROIO3', 'm0frOspS7JY', '3310'],
      ],
      width: 4,
      height: 36,
    },
    yKypqIROIO4: {
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
          name: 'pe',
          column: 'Period',
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
          name: 'value',
          column: 'Value',
          valueType: 'NUMBER',
          type: 'java.lang.Double',
          hidden: false,
          meta: false,
        },
      ],
      metaData: {
        items: {
          '2010': { name: '20-24' },
          '2011': { name: '25-29' },
          '2012': { name: '30-34' },
          '2013': { name: '35-39' },
          '2014': { name: '40-44' },
          '2015': { name: '45-49' },
          '2016': { name: '50-54' },
          '2017': { name: '55-59' },
          '2018': { name: '60-64' },
          '2019': { name: '65-69' },
          '2020': { name: '70-74' },
          ou: { name: 'Organisation unit' },
          dx: { name: 'Data' },
          pe: { name: 'Period' },
          m0frOspS7JY: { name: 'MOH - Tanzania' },
          wo7ITisRXeE: { name: 'Number of employees by age' },
        },
        dimensions: {
          dx: ['wo7ITisRXeE'],
          pe: [
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
          ],
          ou: ['m0frOspS7JY'],
          co: [],
        },
      },
      rows: [
        ['wo7ITisRXeE', '2010', 'm0frOspS7JY', '0'],
        ['wo7ITisRXeE', '2011', 'm0frOspS7JY', '1188'],
        ['wo7ITisRXeE', '2012', 'm0frOspS7JY', '13714'],
        ['wo7ITisRXeE', '2013', 'm0frOspS7JY', '16401'],
        ['wo7ITisRXeE', '2014', 'm0frOspS7JY', '10221'],
        ['wo7ITisRXeE', '2015', 'm0frOspS7JY', '10841'],
        ['wo7ITisRXeE', '2016', 'm0frOspS7JY', '9725'],
        ['wo7ITisRXeE', '2017', 'm0frOspS7JY', '10320'],
        ['wo7ITisRXeE', '2018', 'm0frOspS7JY', '9834'],
        ['wo7ITisRXeE', '2019', 'm0frOspS7JY', '4076'],
      ],
      width: 4,
      height: 36,
    },
    any: {
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
          name: 'pe',
          column: 'Period',
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
          name: 'value',
          column: 'Value',
          valueType: 'NUMBER',
          type: 'java.lang.Double',
          hidden: false,
          meta: false,
        },
      ],
      metaData: {
        items: {
          '201907': { name: 'July 2019' },
          MqMQnGOqLuY: { name: 'KE' },
          '201906': { name: 'June 2019' },
          '201909': { name: 'September 2019' },
          '201908': { name: 'August 2019' },
          '201903': { name: 'March 2019' },
          '201902': { name: 'February 2019' },
          yKypqIROIO9: { name: 'Watoto Waliopatiwa LLIN' },
          '201905': { name: 'May 2019' },
          ou: { name: 'Organisation unit' },
          '201904': { name: 'April 2019' },
          '201910': { name: 'October 2019' },
          '201901': { name: 'January 2019' },
          '201912': { name: 'December 2019' },
          '201911': { name: 'November 2019' },
          X0Me7ygpiUT: { name: 'ME' },
          dx: { name: 'Data' },
          pe: { name: 'Period' },
          Kl9MzjQI3ms: { name: 'Expected children Under 1 Year' },
          m0frOspS7JY: { name: 'MOH - Tanzania' },
          wo7ITisRXeE: { name: 'Measles/Rubella 1 doses given' },
        },
        dimensions: {
          dx: ['Kl9MzjQI3ms', 'wo7ITisRXeE', 'yKypqIROIO9'],
          pe: [
            '201901',
            '201902',
            '201903',
            '201904',
            '201905',
            '201906',
            '201907',
            '201908',
            '201909',
            '201910',
            '201911',
            '201912',
          ],
          ou: ['m0frOspS7JY'],
          co: ['MqMQnGOqLuY', 'X0Me7ygpiUT'],
        },
      },
      rows: [
        ['Kl9MzjQI3ms', '201901', 'm0frOspS7JY', '2.36250253E7'],
        ['Kl9MzjQI3ms', '201902', 'm0frOspS7JY', '2.6156278E7'],
        ['Kl9MzjQI3ms', '201903', 'm0frOspS7JY', '2.36250253E7'],
        ['Kl9MzjQI3ms', '201904', 'm0frOspS7JY', '2.44125262E7'],
        ['Kl9MzjQI3ms', '201905', 'm0frOspS7JY', '2.36250253E7'],
        ['Kl9MzjQI3ms', '201906', 'm0frOspS7JY', '2.44125262E7'],
        ['Kl9MzjQI3ms', '201907', 'm0frOspS7JY', '2.36250253E7'],
        ['Kl9MzjQI3ms', '201908', 'm0frOspS7JY', '2.36250253E7'],
        ['Kl9MzjQI3ms', '201909', 'm0frOspS7JY', '2.44125262E7'],
        ['Kl9MzjQI3ms', '201910', 'm0frOspS7JY', '2.36250253E7'],
        ['Kl9MzjQI3ms', '201911', 'm0frOspS7JY', '2.44125262E7'],
        ['Kl9MzjQI3ms', '201912', 'm0frOspS7JY', '2.36250253E7'],
        ['wo7ITisRXeE', '201901', 'm0frOspS7JY', '172808.0'],
        ['wo7ITisRXeE', '201902', 'm0frOspS7JY', '164532.0'],
        ['wo7ITisRXeE', '201903', 'm0frOspS7JY', '171820.0'],
        ['wo7ITisRXeE', '201904', 'm0frOspS7JY', '162847.0'],
        ['wo7ITisRXeE', '201905', 'm0frOspS7JY', '181111.0'],
        ['wo7ITisRXeE', '201906', 'm0frOspS7JY', '167957.0'],
        ['wo7ITisRXeE', '201907', 'm0frOspS7JY', '177640.0'],
        ['wo7ITisRXeE', '201908', 'm0frOspS7JY', '181368.0'],
        ['wo7ITisRXeE', '201909', 'm0frOspS7JY', '177983.0'],
        ['wo7ITisRXeE', '201910', 'm0frOspS7JY', '204312.0'],
        ['wo7ITisRXeE', '201911', 'm0frOspS7JY', '155853.0'],
        ['wo7ITisRXeE', '201912', 'm0frOspS7JY', '139938.0'],
        ['yKypqIROIO9', '201910', 'm0frOspS7JY', '134130.0'],
        ['yKypqIROIO9', '201911', 'm0frOspS7JY', '126009.0'],
        ['yKypqIROIO9', '201902', 'm0frOspS7JY', '127274.0'],
        ['yKypqIROIO9', '201909', 'm0frOspS7JY', '146883.0'],
        ['yKypqIROIO9', '201901', 'm0frOspS7JY', '134887.0'],
        ['yKypqIROIO9', '201903', 'm0frOspS7JY', '135008.0'],
        ['yKypqIROIO9', '201912', 'm0frOspS7JY', '105449.0'],
        ['yKypqIROIO9', '201906', 'm0frOspS7JY', '133842.0'],
        ['yKypqIROIO9', '201905', 'm0frOspS7JY', '140172.0'],
        ['yKypqIROIO9', '201907', 'm0frOspS7JY', '146057.0'],
        ['yKypqIROIO9', '201908', 'm0frOspS7JY', '149497.0'],
        ['yKypqIROIO9', '201904', 'm0frOspS7JY', '126747.0'],
      ],
      width: 4,
      height: 36,
    },
  };
  async fetchAnalytics(dx: any, pe: any, ou: any[], context: any) {
    if (false) {
      return this.sampleAnalytics[dx]
        ? this.sampleAnalytics[dx]
        : this.sampleAnalytics['any'];
    } else {
      let analytics: Analytics = {
        headers: getAnalyticsHeaders(),
        metaData: { items: {}, dimensions: { dx: [], pe: [], ou: [], co: [] } },
        rows: [],
      };

      // Get organisation unit levels
      const orgUnitLevels = await this.orgUnitLevelService.findAll();

      // Get indicators for use in computation
      const indicators = await this.indicatorService.findIn({ uid: dx });

      // Attached indicator information in analytics payload

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
        for (let orgUnit of getISOOrgUnits(ou, context.user)) {
          queries.push(
            `SELECT '${
              indicator.uid
            }' as dx,'${orgUnit}' as ou,pe.iso as pe,COUNT(*) as value FROM _resource_table_${
              indicator.form.uid
            } data INNER JOIN _organisationunitstructure ous ON(data.ou=ous.uid) INNER JOIN _periodstructure pe ON((${getISOPeriods(
              pe,
            )
              .map((p) => `pe.iso='${p}'`)
              .join(' OR ')}) ${filter} ) WHERE ${generateOUFilterQuery(
              'ous',
              ou,
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
        for (const orgUnit of getISOOrgUnits(ou, context.user)) {
          queries.push(
            `SELECT '${
              field.optionuid
            }' as dx,'${orgUnit}' as ou,pe.iso as pe,COUNT(*) as value FROM _resource_table_${
              field.formuid
            } data
        INNER JOIN _organisationunitstructure ous ON(data.ou=ous.uid) 
        INNER JOIN _periodstructure pe ON((${getISOPeriods(pe)
          .map((p) => `pe.iso='${p}'`)
          .join(' OR ')})) 
        WHERE data."${field.uid}" = '${
              field.option
            }' AND ${generateOUFilterQuery(
              'ous',
              ou,
              orgUnitLevels,
              context.user,
            )} 
        GROUP BY pe.iso`,
          );
        }
      }

      // update period in analytics metadata
      analytics.metaData.dimensions.pe = getISOPeriods(pe);
      analytics.metaData.dimensions.pe.forEach((pe) => {
        analytics.metaData.items[pe] = getPeriodDetails(pe);
      });

      // Get analytics results
      const result = await this.connetion.manager.query(
        queries.join(' UNION '),
      );

      // Attach result as analytics rows
      analytics.rows = result.map((data) => {
        if (analytics.metaData.dimensions.ou.indexOf(data.ou) === -1) {
          analytics.metaData.dimensions.ou.push(data.ou);
        }
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
      wo7ITisRXe1: {
        id: 'wo7ITisRXe1',
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
      wo7ITisRXeE: {
        id: 'wo7ITisRXeE',
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

    return await this.indicatorService.findIn({ uid: dx });
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
    console.log('Query:', query);
    let fields = await this.connetion.manager.query(query);
    fields.forEach((field) => {
      //console.log(field);
      if (Object.keys(otherDimensions).indexOf(field.uid) > -1) {
        analytics.metaData.items[field.uid] = { name: field.caption };
      }
    });
    console.log('Here');
    // Dealing with headers
    let headers = await this.connetion.manager.query(
      'SELECT columns.table_name,columns.column_name,' +
        'columns.data_type, columns.column_default, columns.is_nullable FROM information_schema.columns' +
        " WHERE table_name = '_resource_table_" +
        formid +
        "'",
    );
    console.log('Here1');
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
      INNER JOIN _organisationunitstructure ous ON(ous.uid = data.ou AND ${levelquery.join(
        ' OR ',
      )})`;
    if (pe) {
      let periodquery = pe.map((p) => {
        let whereCondition = getWhereConditions(p);
        console.log('whereCondition:', p, whereCondition);
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
    console.log(query);
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
    console.log(query);
    let organisationunits = await this.connetion.manager.query(query);
    organisationunits.forEach((orgUnit) => {
      analytics.metaData.items[orgUnit.uid] = orgUnit.name;
      analytics.metaData.dimensions.ou.push(orgUnit.uid);
    });
    console.log('organisationunits:', organisationunits);
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
    console.log(queries.join(' UNION '));
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
    console.log('Query To Load', query);
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
