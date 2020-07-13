import { Column, Entity, Index } from 'typeorm';

@Entity('hris_validation', { schema: 'public' })
@Index(
  'validation_equation_idx',
  ['leftexpression', 'operator', 'rightexpression'],
  { unique: true },
)
@Index('uniq_95b764235e237e06', ['name'], { unique: true })
@Index('uniq_95b76423539b0606', ['uid'], { unique: true })
export class hris_validation {
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
    length: 40,
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
