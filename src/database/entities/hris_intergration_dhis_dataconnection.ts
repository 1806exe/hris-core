import { Column, Entity, Index } from 'typeorm';

@Entity('hris_intergration_dhis_dataconnection', { schema: 'public' })
@Index('unique_serverdatasetname_idx', ['dataset_name', 'host_url'], {
  unique: true,
})
@Index('unique_serverdatasetuid_idx', ['dataset_uid', 'host_url'], {
  unique: true,
})
@Index('idx_c47f616d4108d2f5', ['parent_organisationunit_'])
@Index('uniq_c47f616d539b0606', ['uid'], { unique: true })
export class hris_intergration_dhis_dataconnection {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  // @ManyToOne(type=>hris_organisationunit, hris_organisationunit=>hris_organisationunit.hris_intergration_dhis_dataconnections,{  })
  // @JoinColumn({ name:'parent_organisationunit_id'})
  // parent_organisationunit_:hris_organisationunit | null;

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
    name: 'dataset_name',
  })
  dataset_name: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'dataset_uid',
  })
  dataset_uid: string;

  @Column('text', {
    nullable: true,
    name: 'dataset_html',
  })
  dataset_html: string | null;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'host_url',
  })
  host_url: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'username',
  })
  username: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'password',
  })
  password: string;

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
  //   type => hris_intergration_dhis_dataelementfieldoptionrelation,
  //   hris_intergration_dhis_dataelementfieldoptionrelation =>
  //     hris_intergration_dhis_dataelementfieldoptionrelation.dhis_data_connection_,
  //   { onDelete: 'CASCADE' },
  // )
  // hris_intergration_dhis_dataelementfieldoptionrelations: hris_intergration_dhis_dataelementfieldoptionrelation[];

  // @ManyToMany(
  //   type => hris_fieldoptiongroupset,
  //   hris_fieldoptiongroupset =>
  //     hris_fieldoptiongroupset.hris_intergration_dhis_dataconnections,
  //   { nullable: false },
  // )
  // @JoinTable({ name: 'hris_intergration_dhis_fieldoptiongroupsetmember' })
  // hris_fieldoptiongroupsets: hris_fieldoptiongroupset[];
}
