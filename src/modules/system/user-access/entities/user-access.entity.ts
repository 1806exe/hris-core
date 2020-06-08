import { UserIdentification } from '../../user/entities/user-identification';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
@Entity('useraccess', { schema: 'public' })
export class UserAccess extends UserIdentification {
  @PrimaryGeneratedColumn()
  useraccessid: number;

  @Column('json', {
    nullable: false,
    name: 'useraccess',
  })
  useraccess: any;

  @OneToMany(() => User, (user: User) => user.access, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  user: User;
}
