import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TransactionTimestamp } from '../../../core/entities/transaction-timestamp.entity';
import { Dashboard } from './dashboard.entity';
import { Visualization } from './visualization.entity';
import { DashboardItemAccess } from './dashboard-item-useraccess.entity';

@Entity('dashboarditem', { schema: 'public' })
export class DashboardItem extends TransactionTimestamp {
  static plural = 'dashboardItems';
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 11, unique: true })
  uid: string;

  @Column({
    type: 'char',
    nullable: true,
    length: 8,
    name: 'publicaccess',
  })
  publicAccess: string | null;

  @Column({
    type: 'boolean',
    nullable: true,
    name: 'externalaccess',
  })
  externalAccess: boolean | null;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    name: 'appkey',
  })
  appkey: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
    name: 'shape',
  })
  shape: string | null;

  @Column({
    type: 'integer',
    nullable: true,
    name: 'x',
  })
  x: number | null;

  @Column({
    type: 'integer',
    nullable: true,
    name: 'y',
  })
  y: number | null;

  @Column({
    type: 'integer',
    nullable: true,
    name: 'height',
  })
  height: number | null;

  @Column({
    type: 'integer',
    nullable: true,
    name: 'width',
  })
  width: number | null;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
    name: 'type',
  })
  type: string | null;

  @ManyToOne(
    () => Dashboard,
    (dashboard: Dashboard) => dashboard.dashboardItems,
  )
  @JoinColumn({ name: 'dashboardid' })
  dashboard: Dashboard;

  @ManyToOne(
    () => Visualization,
    (visualization: Visualization) => visualization.dashboardItems,
    { eager: true },
  )
  @JoinColumn({ name: 'visualizationid' })
  visualization: Visualization;

  @ManyToMany(
    () => DashboardItemAccess,
    (dashboarditemaccess) => dashboarditemaccess.dashboarditem,
  )
  @JoinTable({ name: 'dashboarditemuseraccess' })
  dashboarditemaccess: DashboardItemAccess[];
}
