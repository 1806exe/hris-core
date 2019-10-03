import {
    BeforeInsert,
    Column,
    JoinColumn,
    PrimaryColumn,
    Generated,
} from 'typeorm';
import { getUid } from '@iapps/utils/utils';
import { TransactionTimestamp } from 'src/core/entities/transaction-timestamp.entity';
import { User } from 'src/modules/system/user/entities/user.entity';

export class UserCoreProps extends TransactionTimestamp {

    @Column({ select: false })
    @Generated('increment')
    id: number;

    @PrimaryColumn({ type: 'varchar', length: 256, unique: true })
    uid: string;

    @JoinColumn({ referencedColumnName: 'uid' })
    createdBy: User;

    @JoinColumn({ referencedColumnName: 'uid' })
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
        this.uid = getUid('', 11);
    }
}
