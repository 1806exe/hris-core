import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DashboardItem } from './dashboard-item.entity';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { User } from '../../system/user/entities/user.entity';
@Entity('dashboard', { schema: 'public' })
export class Dashboard extends EntityCoreProps {
  static plural = 'dashboards';

  @Column({
    type: 'text',
    nullable: true,
    name: 'href',
  })
  href: string | null;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    name: 'displayname',
  })
  displayName: string | null;

  @ManyToOne(() => User, (user: User) => user.dashboards, {})
  @JoinColumn({ name: 'userid' })
  user: User | null;

  @OneToMany(
    () => DashboardItem,
    (dashboardItem: DashboardItem) => dashboardItem.dashboard,
    { eager: true },
  )
  dashboardItems: DashboardItem[];
}
