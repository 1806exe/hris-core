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

@Entity('hris_arithmeticfilter', { schema: 'public' })
@Index(
  'arithmetic_filter_idx',
  ['leftexpression', 'operator', 'rightexpression'],
  { unique: true },
)
export class hris_arithmeticfilter {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  @Column('character varying', {
    nullable: false,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'name',
  })
  name: string;

  @Column('text', {
    nullable: true,
    name: 'description',
  })
  description: string | null;

  @Column('character varying', {
    nullable: false,
    length: 10,
    name: 'operator',
  })
  operator: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'leftexpression',
  })
  leftexpression: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'rightexpression',
  })
  rightexpression: string;

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
}
