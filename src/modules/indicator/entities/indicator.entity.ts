import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationId,
} from 'typeorm';
import { Form } from '../../form/entities/form.entity';
import { IndicatorGroup } from './indicatorgroup.entity';
import { HRISBaseEntity } from '../../../core/entities/base-entity';

@Entity('indicator', { schema: 'public' })
export class Indicator extends HRISBaseEntity {
    static plural = 'indicators';
    @PrimaryColumn('integer', {
        nullable: false,
        primary: true,
        name: 'id',
    })
    id: number;

    @Column('character varying', {
        nullable: true,
        length: 11,
        name: 'uid',
    })
    uid: string | null;

    @Column('character varying', {
        nullable: true,
        length: 50,
        name: 'code',
    })
    code: string | null;

    @Column('timestamp without time zone', {
        nullable: true,
        name: 'created',
    })
    created: Date | null;

    @Column('timestamp without time zone', {
        nullable: true,
        name: 'lastupdated',
    })
    lastupdated: Date | null;

    @Column('character varying', {
        nullable: false,
        length: 230,
        name: 'name',
    })
    name: string;

    @Column('character varying', {
        nullable: true,
        length: 255,
        name: 'shortname',
    })
    shortname: string | null;

    @Column('text', {
        nullable: true,
        name: 'description',
    })
    description: string | null;

    @ManyToOne(() => Form, (form: Form) => form.indicators, {})
    @JoinColumn({ name: 'formid' })
    form: Form | null;

    @Column('text', {
        nullable: true,
        name: 'expression',
    })
    expression: string | null;

    @Column('text', {
        nullable: true,
        name: 'filter',
    })
    filter: string | null;

    @Column('character varying', {
        nullable: true,
        length: 40,
        name: 'aggregationtype',
    })
    aggregationtype: string | null;

    @Column('character varying', {
        nullable: false,
        length: 15,
        name: 'analyticstype',
    })
    analyticstype: string;

    @OneToMany(
        () => IndicatorGroup,
        (indicatorGroup: IndicatorGroup) => indicatorGroup.indicators,
    )
    indicatorGroups: IndicatorGroup[];
}
