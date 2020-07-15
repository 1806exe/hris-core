import {
    Column,
    Entity,
    Index,
    PrimaryColumn,
    Generated,
} from 'typeorm';
import { UserIdentification } from '../../system/user/entities/user-identification';

@Entity('sqlview', { schema: 'public' })
export class SqlView extends UserIdentification {
    static plural = 'sqlViews';

    @PrimaryColumn({ select: false })
    @Generated('increment')
    id: number;

    @Column({ type: 'varchar', length: 256, unique: true })
    uid: string;

    @Column({ type: 'varchar', length: 256, unique: true })
    name: string;

    @Column({ type: 'text', unique: true })
    query: string;
}
