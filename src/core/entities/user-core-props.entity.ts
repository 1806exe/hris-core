import {
    BeforeInsert,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionTimestamp } from '../../core/entities/transaction-timestamp.entity';
import { User } from '../../modules/system/user/entities/user.entity';
import { generateUid } from '../helpers/makeuid';

export class UserCoreProps extends TransactionTimestamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 256, unique: true })
    uid: string;

    @JoinColumn({ referencedColumnName: 'id' })
    createdBy: User;

    @JoinColumn({ referencedColumnName: 'id' })
    lastUpdatedBy: User;

    @BeforeInsert()
    beforeInsertEntityCoreProps() {
        /**
         *  You can generate UUID in different ways
         *  1. You can generate uuid of any length: i.e getUid('', 20)
         *      Example of UUID::: 8aydSxYBrrP
         *  2. You can generat UUID by prepending a context specific keyword i.e getUid('HRIS', 20)
         *      Example of UUID::: HRIS_8aydSxYBrrP
         */
        this.uid = generateUid();
    }
}
