import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { EntityCoreProps } from '../../../../core/entities/entity-core-props';

@Entity('usersetting', { schema: 'public' })
export class UserSettings extends EntityCoreProps {
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'boolean', nullable: false })
  emailNotification: boolean;

  @Column({ type: 'boolean', nullable: false })
  smsNotification: boolean;

  @Column({ type: 'boolean', nullable: false })
  completenessAlert: boolean;

  @Column({ type: 'boolean', nullable: false })
  qualityCheckAlert: boolean;

  @OneToOne((type) => User, (user) => user.userSettings)
  user: User;
}
