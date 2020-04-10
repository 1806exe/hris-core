import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/services/base.service';
import { Repository } from 'typeorm';
import { Chart } from '../entities/chart.entity';

@Injectable()
export class ChartService extends BaseService<Chart> {
  constructor(
    @InjectRepository(Chart)
    chartRepository: Repository<Chart>,
  ) {
    super(chartRepository, Chart);
  }
  // data = {
  //   MTWXrZKjPRa: {
  //     lastUpdated: '2019-02-09T20:13:45.425',
  //     uid: 'MTWXrZKjPRa',
  //     created: '2017-07-29T21:18:43.937',
  //     name: 'Employments',
  //     publicAccess: 'r-------',
  //     type: 'COLUMN',
  //     subscribed: false,
  //     cumulativeValues: false,
  //     sortOrder: 0,
  //     favorite: false,
  //     topLimit: 0,
  //     displayName: 'Employments',
  //     percentStackedValues: false,
  //     noSpaceBetweenColumns: false,
  //     hideTitle: false,
  //     series: 'dx',
  //     showData: true,
  //     parentGraphMap: {},
  //     regressionType: 'NONE',
  //     completedOnly: false,
  //     hideEmptyRowItems: 'NONE',
  //     aggregationType: 'DEFAULT',
  //     hideSubtitle: false,
  //     title: 'Employments',
  //     hideLegend: false,
  //     category: 'pe',
  //     access: {
  //       read: true,
  //       update: true,
  //       externalize: true,
  //       delete: true,
  //       write: true,
  //       manage: true,
  //     },
  //     lastUpdatedBy: { uid: 'I89T5MJIt27' },
  //     dataElementGroupSetDimensions: [],
  //     attributeDimensions: [],
  //     translations: [],
  //     interpretations: [],
  //     userGroupAccesses: [],
  //     columns: [
  //       {
  //         dimension: 'dx',
  //         items: [
  //           {
  //             uid: 'wo7ITisRXeE',
  //             dimensionItem: 'wo7ITisRXeE',
  //             displayName: 'Employment',
  //             dimensionItemType: 'INDICATOR',
  //           },
  //         ],
  //       },
  //     ],
  //     dataElementDimensions: [],
  //     categoryDimensions: [],
  //     programIndicatorDimensions: [],
  //     attributeValues: [],
  //     userAccesses: [],
  //     dataDimensionItems: [
  //       {
  //         dataDimensionItemType: 'INDICATOR',
  //         indicator: { uid: 'wo7ITisRXeE' },
  //       },
  //     ],
  //     categoryOptionGroupSetDimensions: [],
  //     organisationUnitGroupSetDimensions: [],
  //     filters: [
  //       {
  //         dimension: 'ou',
  //         items: [
  //           {
  //             uid: 'USER_ORGUNIT',
  //             dimensionItem: 'USER_ORGUNIT',
  //             displayName: 'USER_ORGUNIT',
  //           },
  //         ],
  //       },
  //     ],
  //     rows: [
  //       {
  //         dimension: 'pe',
  //         items: [
  //           {
  //             uid: 'LAST_12_MONTHS',
  //             dimensionItem: 'LAST_12_MONTHS',
  //             displayName: 'LAST_12_MONTHS',
  //             dimensionItemType: 'PERIOD',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   cbnWOXfp9vW: {
  //     lastUpdated: '2019-02-09T20:13:45.425',
  //     uid: 'cbnWOXfp9vW',
  //     created: '2017-07-29T21:18:43.937',
  //     name: 'Retirement',
  //     publicAccess: 'r-------',
  //     type: 'LINE',
  //     subscribed: false,
  //     cumulativeValues: false,
  //     sortOrder: 0,
  //     favorite: false,
  //     topLimit: 0,
  //     displayName: 'Retirement',
  //     percentStackedValues: false,
  //     noSpaceBetweenColumns: false,
  //     hideTitle: false,
  //     series: 'dx',
  //     showData: true,
  //     parentGraphMap: {},
  //     regressionType: 'NONE',
  //     completedOnly: false,
  //     hideEmptyRowItems: 'NONE',
  //     aggregationType: 'DEFAULT',
  //     hideSubtitle: false,
  //     title: 'Retirement',
  //     hideLegend: false,
  //     category: 'pe',
  //     access: {
  //       read: true,
  //       update: true,
  //       externalize: true,
  //       delete: true,
  //       write: true,
  //       manage: true,
  //     },
  //     lastUpdatedBy: { uid: 'I89T5MJIt27' },
  //     dataElementGroupSetDimensions: [],
  //     attributeDimensions: [],
  //     translations: [],
  //     interpretations: [],
  //     userGroupAccesses: [],
  //     columns: [
  //       {
  //         dimension: 'dx',
  //         items: [
  //           {
  //             uid: 'wo7ITisRXeE',
  //             dimensionItem: 'wo7ITisRXeE',
  //             displayName: 'Retirement',
  //             dimensionItemType: 'INDICATOR',
  //           },
  //         ],
  //       },
  //     ],
  //     dataElementDimensions: [],
  //     categoryDimensions: [],
  //     programIndicatorDimensions: [],
  //     attributeValues: [],
  //     userAccesses: [],
  //     dataDimensionItems: [
  //       {
  //         dataDimensionItemType: 'INDICATOR',
  //         indicator: { uid: 'Kl9MzjQI3ms' },
  //       },
  //       {
  //         dataDimensionItemType: 'INDICATOR',
  //         indicator: { uid: 'wo7ITisRXeE' },
  //       },
  //       {
  //         dataDimensionItemType: 'INDICATOR',
  //         dataElement: { uid: 'yKypqIROIO9' },
  //       },
  //     ],
  //     categoryOptionGroupSetDimensions: [],
  //     organisationUnitGroupSetDimensions: [],
  //     filters: [
  //       {
  //         dimension: 'ou',
  //         items: [
  //           {
  //             uid: 'USER_ORGUNIT',
  //             dimensionItem: 'USER_ORGUNIT',
  //             displayName: 'USER_ORGUNIT',
  //           },
  //         ],
  //       },
  //     ],
  //     rows: [
  //       {
  //         dimension: 'pe',
  //         items: [
  //           {
  //             uid: 'LAST_12_MONTHS',
  //             dimensionItem: 'LAST_12_MONTHS',
  //             displayName: 'LAST_12_MONTHS',
  //             dimensionItemType: 'PERIOD',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   x1cWTFjrxVd: {
  //     lastUpdated: '2019-02-09T20:13:45.425',
  //     uid: 'x1cWTFjrxVd',
  //     created: '2017-07-29T21:18:43.937',
  //     name: 'Gender Ratio',
  //     publicAccess: 'r-------',
  //     type: 'PIE',
  //     subscribed: false,
  //     cumulativeValues: false,
  //     sortOrder: 0,
  //     favorite: false,
  //     topLimit: 0,
  //     displayName: 'Gender Ratio',
  //     percentStackedValues: false,
  //     noSpaceBetweenColumns: false,
  //     hideTitle: false,
  //     series: 'dx',
  //     showData: true,
  //     parentGraphMap: {},
  //     regressionType: 'NONE',
  //     completedOnly: false,
  //     hideEmptyRowItems: 'NONE',
  //     aggregationType: 'DEFAULT',
  //     hideSubtitle: false,
  //     title: 'Gender Ratio',
  //     hideLegend: false,
  //     category: 'pe',
  //     access: {
  //       read: true,
  //       update: true,
  //       externalize: true,
  //       delete: true,
  //       write: true,
  //       manage: true,
  //     },
  //     lastUpdatedBy: { uid: 'I89T5MJIt27' },
  //     dataElementGroupSetDimensions: [],
  //     attributeDimensions: [],
  //     translations: [],
  //     interpretations: [],
  //     userGroupAccesses: [],
  //     rows: [
  //       {
  //         dimension: 'dx',
  //         items: [
  //           {
  //             uid: 'yKypqIROIO9',
  //             dimensionItem: 'yKypqIROIO9',
  //             displayName: 'Age Distribution',
  //             dimensionItemType: 'INDICATOR',
  //           },
  //         ],
  //       },
  //     ],
  //     dataElementDimensions: [],
  //     categoryDimensions: [],
  //     programIndicatorDimensions: [],
  //     attributeValues: [],
  //     userAccesses: [],
  //     dataDimensionItems: [
  //       {
  //         dataDimensionItemType: 'INDICATOR',
  //         dataElement: { uid: 'yKypqIROIO9' },
  //       },
  //     ],
  //     categoryOptionGroupSetDimensions: [],
  //     organisationUnitGroupSetDimensions: [],
  //     columns: [
  //       {
  //         dimension: 'ou',
  //         items: [
  //           {
  //             uid: 'USER_ORGUNIT',
  //             dimensionItem: 'USER_ORGUNIT',
  //             displayName: 'USER_ORGUNIT',
  //           },
  //         ],
  //       },
  //     ],
  //     filters: [
  //       {
  //         dimension: 'pe',
  //         items: [
  //           {
  //             uid: 'LAST_12_MONTHS',
  //             dimensionItem: 'LAST_12_MONTHS',
  //             displayName: 'LAST_12_MONTHS',
  //             dimensionItemType: 'PERIOD',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   CCIJuYfJqAG: {
  //     lastUpdated: '2019-02-09T20:13:45.425',
  //     uid: 'CCIJuYfJqAG',
  //     created: '2017-07-29T21:18:43.937',
  //     name: 'Age Distribution',
  //     publicAccess: 'r-------',
  //     type: 'COLUMN',
  //     subscribed: false,
  //     cumulativeValues: false,
  //     sortOrder: 0,
  //     favorite: false,
  //     topLimit: 0,
  //     displayName: 'Age Distribution',
  //     percentStackedValues: false,
  //     noSpaceBetweenColumns: false,
  //     hideTitle: false,
  //     series: 'dx',
  //     showData: true,
  //     parentGraphMap: {},
  //     regressionType: 'NONE',
  //     completedOnly: false,
  //     hideEmptyRowItems: 'NONE',
  //     aggregationType: 'DEFAULT',
  //     hideSubtitle: false,
  //     title: 'Age Distribution',
  //     hideLegend: false,
  //     category: 'pe',
  //     access: {
  //       read: true,
  //       update: true,
  //       externalize: true,
  //       delete: true,
  //       write: true,
  //       manage: true,
  //     },
  //     lastUpdatedBy: { uid: 'I89T5MJIt27' },
  //     dataElementGroupSetDimensions: [],
  //     attributeDimensions: [],
  //     translations: [],
  //     interpretations: [],
  //     userGroupAccesses: [],
  //     columns: [
  //       {
  //         dimension: 'dx',
  //         items: [
  //           {
  //             uid: 'yKypqIROIO4',
  //             dimensionItem: 'yKypqIROIO4',
  //             displayName: 'Age Distribution',
  //             dimensionItemType: 'INDICATOR',
  //           },
  //         ],
  //       },
  //     ],
  //     dataElementDimensions: [],
  //     categoryDimensions: [],
  //     programIndicatorDimensions: [],
  //     attributeValues: [],
  //     userAccesses: [],
  //     dataDimensionItems: [
  //       {
  //         dataDimensionItemType: 'INDICATOR',
  //         indicator: { uid: 'Kl9MzjQI3ms' },
  //       },
  //       {
  //         dataDimensionItemType: 'INDICATOR',
  //         indicator: { uid: 'wo7ITisRXeE' },
  //       },
  //       {
  //         dataDimensionItemType: 'INDICATOR',
  //         dataElement: { uid: 'yKypqIROIO9' },
  //       },
  //     ],
  //     categoryOptionGroupSetDimensions: [],
  //     organisationUnitGroupSetDimensions: [],
  //     filters: [
  //       {
  //         dimension: 'ou',
  //         items: [
  //           {
  //             uid: 'USER_ORGUNIT',
  //             dimensionItem: 'USER_ORGUNIT',
  //             displayName: 'USER_ORGUNIT',
  //           },
  //         ],
  //       },
  //     ],
  //     rows: [
  //       {
  //         dimension: 'pe',
  //         items: [
  //           {
  //             uid: 'LAST_12_MONTHS',
  //             dimensionItem: 'LAST_12_MONTHS',
  //             displayName: 'LAST_12_MONTHS',
  //             dimensionItemType: 'PERIOD',
  //           },
  //         ],
  //       },
  //     ],
  //   }
  // }
  // async findOneByUid(uid: string): Promise<any> {
  //   if (!this.data[uid]) {
  //     console.log('UID:', uid);
  //   }
  //   return this.data[uid];
  // }
}
