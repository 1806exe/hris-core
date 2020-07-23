import { Column, Entity, ManyToMany } from 'typeorm';
import { UserRole } from '../../user-role/entities/user-role.entity';
import { User } from '../../user/entities/user.entity';
import { UserCoreProps } from '../../../../core/entities/user-core-props.entity';

@Entity('usergroup', { schema: 'public' })
export class UserGroup extends UserCoreProps {
  static plural = 'userGroups';

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToMany((type) => User, (user) => user.userGroups)
  users: User[];
}
