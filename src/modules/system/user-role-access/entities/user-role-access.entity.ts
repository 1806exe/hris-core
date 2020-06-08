import { UserIdentification } from '../../user/entities/user-identification';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { UserRole } from '../../user-role/entities/user-role.entity';
import { TrainingSession } from 'src/modules/training/entities/training-session.entity';
@Entity('userroleaccess', { schema: 'public' })
export class UserRoleAccess extends UserIdentification {
  static plural = 'userRoleAcceses';
  @PrimaryGeneratedColumn()
  userroleaccessid: number;

  @Column('json', {
    nullable: false,
    name: 'access',
  })
  access: any;

  @Column('integer', { nullable: false, name: 'userroleid' })
  userroleid: number;

  @OneToMany(() => UserRole, (userrole: UserRole) => userrole.access, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userroleid', referencedColumnName: 'id' })
  userrole: UserRole;

  @ManyToMany((type) => TrainingSession, (session) => session.userroleaccess)
  session: TrainingSession;
}
