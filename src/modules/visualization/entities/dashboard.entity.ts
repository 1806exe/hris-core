import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DashboardItem } from './dashboard-item.entity';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { User } from '../../system/user/entities/user.entity';
import { DashboardAccess } from './dashboard-useraccess.entity';
@Entity('dashboard', { schema: 'public' })
export class Dashboard extends EntityCoreProps {
  static plural = 'dashboards';

  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', {
    nullable: true,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'href',
  })
  href: string | null;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
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

  @ManyToMany(
    () => DashboardAccess,
    (dashboardaccess) => dashboardaccess.dashboard,
    { eager: true },
  )
  @JoinTable({ name: 'dashboarduseraccess' })
  dashboardaccess: DashboardAccess[];
}
