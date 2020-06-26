import { UserIdentification } from '../../system/user/entities/user-identification';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { TrainingSession } from './training-session.entity';
@Entity('trainingsessionaccess', { schema: 'public' })
export class TrainingSessionAccess extends UserIdentification {
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
    (type) => TrainingSession,
    (session) => session.trainingsessionaccess,
  )
  session: TrainingSession;
}
