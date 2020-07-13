import { JoinColumn } from 'typeorm';

import { User } from './user.entity';
import { TransactionTimestamp } from '../../../../core/entities/transaction-timestamp.entity';

export abstract class UserTracker extends TransactionTimestamp {
  @JoinColumn({ name: 'createbyid' })
  createdBy: User;

  @JoinColumn({ name: 'updatedbyid' })
  lastUpdatedBy: User;
}
