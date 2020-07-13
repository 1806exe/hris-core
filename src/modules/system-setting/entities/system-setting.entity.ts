import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('systemsetting', { schema: 'public' })
export class SystemSetting {
  static plural = 'systemSettings';
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 256 })
  name: string;

  @Column('bytea', {
    nullable: true,
    name: 'value',
  })
  value: Buffer | null;
}
