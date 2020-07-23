import { Column, Entity, JoinTable, ManyToMany, JoinColumn } from 'typeorm';
import { UserRole } from '../../user-role/entities/user-role.entity';
import { UserCoreProps } from '../../../../core/entities/user-core-props.entity';

@Entity('userauthority', { schema: 'public' })
export class UserAuthority extends UserCoreProps {
  static plural = 'userAuthorities';

  @Column({ type: 'varchar', unique: true, length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  /**
   * Many To Many Relationship: UserAuthorities and UserRole Entities
   */
  @ManyToMany((type) => UserRole, (userRole) => userRole.userAuthorities, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'userauthoritymembers',
    joinColumn: { referencedColumnName: 'id' },
    inverseJoinColumn: { referencedColumnName: 'id' },
  })
  userRoles: UserRole[];
}
