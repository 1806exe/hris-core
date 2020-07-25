import { UserIdentification } from '../../system/user/entities/user-identification';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Dashboard } from './dashboard.entity';
import { User } from '../../system/user/entities/user.entity';
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

  @ManyToOne((type) => User, (user) => user.dashboardaccess, { eager: true })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  users: User[];
}
