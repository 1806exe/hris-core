import { UserIdentification } from './user-identification';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { TrainingSession } from '../../../training/entities/training-session.entity';
@Entity('useraccess', { schema: 'public' })
export class UserAccess extends UserIdentification {
  static plural = 'userAccesses';
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', {
    nullable: false,
    name: 'access',
  })
  access: any;

  @Column('integer', { nullable: false, name: 'userid' })
  userid: number;

  @ManyToMany((type) => TrainingSession, (session) => session.access)
  session: TrainingSession;
}
