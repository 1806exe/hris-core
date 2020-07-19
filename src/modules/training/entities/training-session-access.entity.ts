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
} from 'typeorm';
import { TrainingSession } from './training-session.entity';
import { User } from '../../system/user/entities/user.entity';
import { generateUid } from '../../../core/helpers/makeuid';
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
  user: User;

  @BeforeInsert()
  updateDates() {
    console.log('executing before insert');
    this.uid = generateUid();
  }

  //generateUid
}
