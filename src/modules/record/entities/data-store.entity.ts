import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';
import { UserIdentification } from '../../system/user/entities/user-identification';


@Entity('datastore', { schema: 'public' })
export class DataStore extends UserIdentification {

    static plural = 'dataStore';

    @PrimaryColumn({ select: false })
    @Generated('increment')
    id: number;

    @Column({ type: 'varchar', length: 256, unique: true })
    uid: string;

    @Column('character varying', {
        nullable: false,
        length: 64,
        name: 'namespace',
    })
    namespace: string;

    @Column('character varying', {
        nullable: false,
        length: 64,
        name: 'key',
    })
    key: string;

    @Column('json', {
        nullable: false,
        name: 'value',
    })
    value: any;
}
