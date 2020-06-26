import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { App } from '../../../app/entities/apps.entity';
import { UserAuthority } from '../../user-authority/entities/user-authority.entity';
import { UserIdentification } from '../../user/entities/user-identification';
import { User } from '../../user/entities/user.entity';
import { TrainingSessionAccess } from '../../../training/entities/training-session-access.entity';
import { UserRoleAccess } from './user-role-access.entity';

@Entity('userrole', { schema: 'public' })
export class UserRole extends UserIdentification {
  static plural = 'userRoles';

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToOne((type) => App, (app) => app.id, { eager: true })
  @JoinColumn({ name: 'landingpage' })
  landingPage: App;

  /**
   * Many To Many Relationship: UserRole and User Entities
   */
  @ManyToMany((type) => User, (user) => user.userRoles, { nullable: false })
  users: User[];

  /**
   * Many To Many Relationship: UserAuthorities and UserRole Entities
   */
  @ManyToMany(
    (type) => UserAuthority,
    (userAuthority) => userAuthority.userRoles,
    {
      nullable: false,
      eager: true,
      cascade: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  userAuthorities: UserAuthority[];

  // /**
  //  * Many To Many Relationship: UserAuthorities and UserRole Entities
  //  */
  // @ManyToMany(type => UserGroup, userGroup => userGroup.userRoles, {
  //   nullable: false,
  // })
  // @JoinTable({
  //   name: 'userrolegroupmembers',
  //   joinColumn: { referencedColumnName: 'id' },
  //   inverseJoinColumn: { referencedColumnName: 'id' },
  // })
  // userGroups: UserGroup[];
}
