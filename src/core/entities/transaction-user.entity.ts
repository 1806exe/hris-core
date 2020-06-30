import { JoinColumn } from 'typeorm';
import { User } from '../../modules/system/user/entities/user.entity';
import { TransactionTimestamp } from './transaction-timestamp.entity';

export class TransactionUser extends TransactionTimestamp {
    @JoinColumn({ name: 'createdbyid' })
    createdBy: User;

    @JoinColumn({ name: 'lastupdatedbyid' })
    lastUpdatedBy: User;
}
