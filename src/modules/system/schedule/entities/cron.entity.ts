import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { TransactionTimestamp } from '../../../../core/entities/transaction-timestamp.entity';
import { generateUid } from '../../../../core/helpers/makeuid';

@Entity('cron', { schema: 'public' })
export class Cron extends TransactionTimestamp {
  static plural = 'crons';

  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', {
    nullable: true,
    length: 13,
    name: 'uid',
    unique: true,
  })
  uid: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  cron: string;

  @BeforeInsert()
  beforeInsertTransactionTimestamp() {
    /**
     *  You can generate UUID in different ways
     *  1. You can generate uuid of any length: i.e getUid('', 20)
     *      Example of UUID::: 8aydSxYBrrP
     *  2. You can generat UUID by prepending a context specific keyword i.e getUid('HRIS', 20)
     *      Example of UUID::: HRIS_8aydSxYBrrP
     */
    this.uid = this.uid || generateUid();
  }
}
