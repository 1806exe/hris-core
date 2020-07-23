import { UserIdentification } from '../../system/user/entities/user-identification';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Dashboard } from './dashboard.entity';
@Entity('dashboardaccess', { schema: 'public' })
export class DashboardAccess extends UserIdentification {
  static plural = 'userAccesses';
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {
    nullable: false,
    name: 'access',
  })
  access: string;

  @Column('integer', { nullable: false, name: 'userid' })
  userid: number;

  @ManyToMany((type) => Dashboard, (dashboard) => dashboard.dashboardaccess)
  dashboard: Dashboard[];
}
