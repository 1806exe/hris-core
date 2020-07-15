import { Column, Entity, Index, OneToOne } from 'typeorm';

import { hris_intergration_tiis_employee_fieldrelation } from './hris_intergration_tiis_employee_fieldrelation';

@Entity('hris_intergration_tiis_data_connection', { schema: 'public' })
@Index('idx_eaa7f9f983954d93', ['organisationunit_'])
@Index('uniq_eaa7f9f9539b0606', ['uid'], { unique: true })
export class hris_intergration_tiis_data_connection {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  // @ManyToOne(type=>hris_organisationunit, hris_organisationunit=>hris_organisationunit.hris_intergration_tiis_data_connections,{ onDelete: 'CASCADE', })
  // @JoinColumn({ name:'organisationunit_id'})
  // organisationunit_:hris_organisationunit | null;

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

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'recordstablename',
  })
  recordstablename: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'organisationunittablename',
  })
  organisationunittablename: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'organisationunitlongnamecolumnname',
  })
  organisationunitlongnamecolumnname: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'organisationunitcodecolumnname',
  })
  organisationunitcodecolumnname: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'organisationunitownershipcolumnname',
  })
  organisationunitownershipcolumnname: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'recordsorganisationunitcolumnname',
  })
  recordsorganisationunitcolumnname: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'recordsinstancecolumnname',
  })
  recordsinstancecolumnname: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'tiisparentorganisationunitcode',
  })
  tiisparentorganisationunitcode: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'hristopmostorganisationunitshrotname',
  })
  hristopmostorganisationunitshrotname: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'hrisinstituiongroupname',
  })
  hrisinstituiongroupname: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'host_url',
  })
  host_url: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'password',
  })
  password: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'username',
  })
  username: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'database',
  })
  database: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'employeeformname',
  })
  employeeformname: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'defaultnationality',
  })
  defaultnationality: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'defaulthrnationality',
  })
  defaulthrnationality: string;

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

  // @OneToOne(
  //   type => hris_intergration_tiis_employee_fieldrelation,
  //   hris_intergration_tiis_employee_fieldrelation =>
  //     hris_intergration_tiis_employee_fieldrelation.tiis_data_connection_,
  //   { onDelete: 'CASCADE' },
  // )
  // hris_intergration_tiis_employee_fieldrelation: hris_intergration_tiis_employee_fieldrelation | null;
}
