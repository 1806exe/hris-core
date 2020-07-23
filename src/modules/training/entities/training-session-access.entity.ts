import { UserIdentification } from '../../system/user/entities/user-identification';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import { TrainingSession } from './training-session.entity';
import { User } from '../../system/user/entities/user.entity';
import { generateUid } from '../../../core/helpers/makeuid';
@Entity('trainingsessionaccess', { schema: 'public' })
export class TrainingSessionAccess extends UserIdentification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {
    nullable: false,
    name: 'access',
  })
  access: string;

  @Column('char', {
    nullable: false,
    name: 'uid',
    length: 13,
  })
  uid: string;

  @Column('integer', { nullable: false, name: 'userid' })
  userid: number;

  @ManyToMany(
    (type) => TrainingSession,
    (session) => session.trainingsessionaccess,
  )
  session: TrainingSession;

  @OneToOne((type) => User, (user) => user.sessionaccess)
  user: User;

  @BeforeInsert()
  beforeUpdateTransaction() {
    this.uid = generateUid();
  }

  //generateUid
}
