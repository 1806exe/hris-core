import { UserIdentification } from '../../system/user/entities/user-identification';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TrainingSession } from './training-session.entity';
import { User } from '../../../modules/system/user/entities/user.entity';
@Entity('trainingsessionaccess', { schema: 'public' })
export class TrainingSessionAccess extends UserIdentification {
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

  @ManyToMany(
    (type) => TrainingSession,
    (session) => session.trainingsessionaccess,
  )
  session: TrainingSession;

  @OneToMany((type) => User, (user) => user.sessionaccess, {})
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  user: User[];
}
