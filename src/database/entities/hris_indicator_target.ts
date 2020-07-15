import { Column, Entity, Index, OneToMany } from 'typeorm';

import { hris_indicator_targetfieldoption } from './hris_indicator_targetfieldoption';

@Entity('hris_indicator_target', { schema: 'public' })
@Index('idx_31ac1bc748b73890', ['organisationunitgroup_'])
@Index('uniq_31ac1bc7539b0606', ['uid'], { unique: true })
export class hris_indicator_target {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  // @ManyToOne(
  //   type => hris_organisationunitgroup,
  //   hris_organisationunitgroup =>
  //     hris_organisationunitgroup.hris_indicator_targets,
  //   { onDelete: 'CASCADE' },
  // )
  // @JoinColumn({ name: 'organisationunitgroup_id' })
  // organisationunitgroup_: hris_organisationunitgroup | null;

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
  //   type => hris_indicator_targetfieldoption,
  //   hris_indicator_targetfieldoption =>
  //     hris_indicator_targetfieldoption.target_,
  //   { onDelete: 'CASCADE' },
  // )
  // hris_indicator_targetfieldoptions: hris_indicator_targetfieldoption[];
}
