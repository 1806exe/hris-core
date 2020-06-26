import { UserIdentification } from '../../system/user/entities/user-identification';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { DashboardItem } from './dashboard-item.entity';
@Entity('dashboarditemaccess', { schema: 'public' })
export class DashboardItemAccess extends UserIdentification {
  static plural = 'userAccesses';
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varying character', {
    nullable: false,
    name: 'access',
  })
  access: string;

  @Column('integer', { nullable: false, name: 'userid' })
  userid: number;

  @ManyToMany(
    (type) => DashboardItem,
    (dashboarditem) => dashboarditem.dashboarditemaccess,
  )
  dashboarditem: DashboardItem[];
}
