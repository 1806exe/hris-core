import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { User } from '../../system/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DashboardItem } from './dashboard-item.entity';
import { VisualizationDimension } from './visualization-dimension.entity';

@Entity('visualization', { schema: 'public' })
export class Visualization extends EntityCoreProps {
  static plural = 'visualizations';

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'domainaxislabel',
  })
  domainAxisLabel: string | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'rangeaxislabel',
  })
  rangeAxisLabel: string | null;

  @Column('character varying', {
    nullable: false,
    length: 40,
    name: 'type',
  })
  type: string;

  @Column('boolean', {
    nullable: true,
    name: 'hidelegend',
  })
  hideLegend: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'nospacebetweencolumns',
  })
  noSpaceBetweenColumns: boolean | null;

  @Column('character varying', {
    nullable: false,
    length: 40,
    name: 'regressiontype',
  })
  regressionType: string;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'title',
  })
  title: string | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'subtitle',
  })
  subtitle: string | null;

  @Column('boolean', {
    nullable: true,
    name: 'hidetitle',
  })
  hideTitle: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'hidesubtitle',
  })
  hideSubtitle: boolean | null;

  @Column('double precision', {
    nullable: true,
    name: 'targetlinevalue',
  })
  targetLineValue: number | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'targetlinelabel',
  })
  targetLineLabel: string | null;

  @Column('double precision', {
    nullable: true,
    name: 'baselinevalue',
  })
  baselineValue: number | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'baselinelabel',
  })
  baseLineLabel: string | null;

  @Column('character varying', {
    nullable: true,
    length: 40,
    name: 'aggregationtype',
  })
  aggregationType: string | null;

  @Column('boolean', {
    nullable: true,
    name: 'completedonly',
  })
  completedOnly: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'showdata',
  })
  showData: boolean | null;

  @Column('character varying', {
    nullable: true,
    length: 40,
    name: 'hideemptyrowitems',
  })
  hideEmptyRowItems: string | null;

  @Column('boolean', {
    nullable: true,
    name: 'percentstackedvalues',
  })
  percentStackedValues: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'cumulativevalues',
  })
  cumulativeValues: boolean | null;

  @Column('double precision', {
    nullable: true,
    name: 'rangeaxismaxvalue',
  })
  rangeAxisMaxValue: number | null;

  @Column('double precision', {
    nullable: true,
    name: 'rangeaxisminvalue',
  })
  rangeAxisMinValue: number | null;

  @Column('integer', {
    nullable: true,
    name: 'rangeaxissteps',
  })
  rangeAxisSteps: number | null;

  @Column('integer', {
    nullable: true,
    name: 'rangeaxisdecimals',
  })
  rangeAxisDecimals: number | null;

  @Column('character varying', {
    nullable: true,
    length: 40,
    name: 'legenddisplaystrategy',
  })
  legendDisplayStrategy: string | null;

  @Column('integer', {
    nullable: true,
    name: 'sortorder',
  })
  sortOrder: number | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'measurecriteria',
  })
  measureCriteria: string | null;

  @Column('boolean', {
    nullable: true,
    name: 'regression',
  })
  regression: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'cumulative',
  })
  cumulative: boolean | null;

  @Column('integer', {
    nullable: true,
    name: 'toplimit',
  })
  topLimit: number | null;

  @Column('boolean', {
    nullable: true,
    name: 'rowtotals',
  })
  rowTotals: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'coltotals',
  })
  colTotals: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'rowsubtotals',
  })
  rowSubTotals: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'colsubtotals',
  })
  colSubTotals: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'hideemptyrows',
  })
  hideEmptyRows: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'hideemptycolumns',
  })
  hideEmptyColumns: boolean | null;

  @Column('character varying', {
    nullable: true,
    length: 40,
    name: 'digitgroupseparator',
  })
  digitGroupSeparator: string | null;

  @Column('character varying', {
    nullable: true,
    length: 40,
    name: 'displaydensity',
  })
  displayDensity: string | null;

  @Column('character varying', {
    nullable: true,
    length: 40,
    name: 'fontsize',
  })
  fontSize: string | null;

  @Column('character varying', {
    nullable: true,
    length: 40,
    name: 'legenddisplaystyle',
  })
  legendDisplayStyle: string | null;

  @Column('character varying', {
    nullable: true,
    length: 40,
    name: 'numbertype',
  })
  numberType: string | null;

  @Column('boolean', {
    nullable: true,
    name: 'showhierarchy',
  })
  showHierarchy: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'showdimensionlabels',
  })
  showDimensionLabels: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'skiprounding',
  })
  skipRounding: boolean | null;

  @Column('double precision', {
    nullable: true,
    name: 'longitude',
  })
  longitude: number | null;

  @Column('double precision', {
    nullable: true,
    name: 'latitude',
  })
  latitude: number | null;

  @Column('integer', {
    nullable: true,
    name: 'zoom',
  })
  zoom: number | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'basemap',
  })
  baseMap: string | null;

  @ManyToOne(() => User, (user: User) => user.visualizations)
  @JoinColumn({ name: 'userid' })
  user: User | null;

  @OneToMany(
    () => DashboardItem,
    (dashboardItem: DashboardItem) => dashboardItem.visualization,
    { cascade: false },
  )
  dashboardItems: DashboardItem[];

  @OneToMany(
    () => VisualizationDimension,
    (visualizationDimension: VisualizationDimension) =>
      visualizationDimension.visualization,
    { eager: true },
  )
  dimensions: VisualizationDimension[];
}
