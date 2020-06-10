import { UserIdentification } from '../../user/entities/user-identification';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { TrainingSession } from '../../../training/entities/training-session.entity';
@Entity('userroleaccess', { schema: 'public' })
export class UserRoleAccess extends UserIdentification {
  static plural = 'userRoleAcceses';
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', {
    nullable: false,
    name: 'access',
  })
  access: any;

  @Column('integer', { nullable: false, name: 'userroleid' })
  userroleid: number;

  @ManyToMany((type) => TrainingSession, (session) => session.userroleaccess)
  session: TrainingSession;
}
