import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Dashboard } from './dashboard.entity';
import { Visualization } from './visualization.entity';

@Entity('dashboarditem', { schema: 'public' })
export class DashboardItem extends EntityCoreProps {
  static plural = 'dashboardItems';
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
}
