import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    BeforeInsert,
    PrimaryGeneratedColumn,
    JoinTable,
    JoinColumn,
} from 'typeorm';
import { Form } from '../../../form/entities/form.entity';
import { User } from '../../../system/user/entities/user.entity';
import { RecordRuleAction } from '../record-rule-action/record-rule-action.entity';
import { TransactionTimestamp } from '../../../../core/entities/transaction-timestamp.entity';
import { generateUid } from '../../../../core/helpers/makeuid';

@Entity('recordrule', { schema: 'public' })
export class RecordRule extends TransactionTimestamp {
    static plural = 'recordRules';

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'char', length: 13, unique: true })
    uid: string;

    @Column({ type: 'varchar', nullable: false, length: 256 })
    name: string;

    @Column({
        type: 'text',
        nullable: true,
        name: 'description',
    })
    description: string | null;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    priority: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    condition: string;

    // TODO Find best way to associated last updated field with user entity
    @Column({ nullable: true, name: 'lastupdatedby' })
    lastUpdatedBy: string | null;

    @Column({
        type: 'char',
        nullable: true,
        length: 8,
        name: 'publicaccess',
    })
    publicAccess: string | null;

    @Column({
        type: 'boolean',
        nullable: true,
        name: 'externalaccess',
    })
    externalAccess: boolean | null;

    /**
     *
     */
    @ManyToOne((type) => Form, (form) => form.recordRules, {
        eager: false,
    })
    @JoinColumn({ name: 'formid' })
    form: Form;

    /**
     *
     */
    @ManyToOne((type) => User, (user) => user.recordRules)
    @JoinColumn({ name: 'userid' })
    user: User;

    @OneToMany(
        (type) => RecordRuleAction,
        (recordRuleAction) => recordRuleAction.recordRule,
        {
            eager: true,
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'recordruleid' })
    recordRuleActions: RecordRuleAction[];

    @BeforeInsert()
    beforeInsertEntityCoreProps() {
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
