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
import { Record } from '../../modules/record/entities/record.entity';
import { hris_leave_type } from './hris_leave_type';
import { hris_leave_relative } from './hris_leave_relative';

@Entity('hris_leave', { schema: 'public' })
@Index('idx_4d817b688313f474', ['leave_type_'])
// @Index("unique_leave_idx",["leave_type_","record_","startdate",],{unique:true})
// @Index("idx_4d817b684dfd750c",["record_",])
export class hris_leave {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  // @ManyToOne(
  //   type => hris_leave_type,
  //   hris_leave_type => hris_leave_type.hris_leaves,
  //   { onDelete: 'CASCADE' },
  // )
  // @JoinColumn({ name: 'leave_type_id' })
  // leave_type_: hris_leave_type | null;

  @Column('character varying', {
    nullable: false,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'username',
  })
  username: string;

  @Column('timestamp without time zone', {
    nullable: false,
    name: 'startdate',
  })
  startdate: Date;

  @Column('timestamp without time zone', {
    nullable: false,
    name: 'enddate',
  })
  enddate: Date;

  @Column('integer', {
    nullable: false,
    name: 'duration',
  })
  duration: number;

  @Column('integer', {
    nullable: false,
    name: 'amount',
  })
  amount: number;

  @Column('character varying', {
    nullable: false,
    length: 13,
    name: 'leave_benefit_applicable',
  })
  leave_benefit_applicable: string;

  @Column('character varying', {
    nullable: false,
    length: 13,
    name: 'leave_benefit_status',
  })
  leave_benefit_status: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'phone',
  })
  phone: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'address',
  })
  address: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'email',
  })
  email: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'leave_destination',
  })
  leave_destination: string;

  @Column('character varying', {
    nullable: true,
    length: 255,
    default: () => 'NULL::character varying',
    name: 'reason',
  })
  reason: string | null;

  @Column('timestamp without time zone', {
    nullable: false,
    name: 'datecreated',
  })
  datecreated: Date;

  @Column('timestamp without time zone', {
    nullable: true,
    default: () => 'NULL::timestamp without time zone',
    name: 'lastupdated',
  })
  lastupdated: Date | null;

  // @OneToMany(
  //   type => hris_leave_relative,
  //   hris_leave_relative => hris_leave_relative.leave_,
  //   { onDelete: 'CASCADE' },
  // )
  // hris_leave_relatives: hris_leave_relative[];
}
