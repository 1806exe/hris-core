import { BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { HRISBaseEntity } from './base-entity';

export abstract class TransactionTimestamp extends HRISBaseEntity {
  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  lastUpdated: Date;

  @BeforeInsert()
  beforeInsertTransaction() {
    this.created = new Date();
    this.lastUpdated = new Date();
  }

  @BeforeInsert()
  beforeUpdateTransaction() {
    this.lastUpdated = new Date();
  }
}
