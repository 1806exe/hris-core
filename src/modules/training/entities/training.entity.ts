import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionTimestamp } from '../../../core/entities/transaction-timestamp.entity';

@Entity('training', { schema: 'public' })
export class Training extends TransactionTimestamp {
  static plural = 'trainings';

  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', {
    nullable: true,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column()
  coursename: string;

  @Column()
  trainingcategory: string;

  @Column()
  traininginstruction: string;

  @Column()
  curiculum: string;
}
