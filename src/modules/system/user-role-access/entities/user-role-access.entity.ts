import { UserIdentification } from '../../user/entities/user-identification';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserRole } from '../../user-role/entities/user-role.entity';
@Entity('userroleaccess', { schema: 'public' })
export class UserRoleAccess extends UserIdentification {
  @PrimaryGeneratedColumn()
  userroleaccessid: number;

  @Column('json', {
    nullable: false,
    name: 'access',
  })
  access: any;

  @Column('integer', { nullable: false, name: 'userroleid' })
  userroleid: number;

  @OneToMany(
    () => UserRole,
    (userrole: UserRole) => userrole.access,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'userroleid', referencedColumnName: 'id' })
  userrole: UserRole;
}
