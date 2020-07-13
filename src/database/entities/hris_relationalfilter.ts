import { Column, Entity, Index } from 'typeorm';

@Entity('hris_relationalfilter', { schema: 'public' })
@Index('idx_629c17cd443707b0', ['field_'])
@Index('uniq_629c17cd5e237e06', ['name'], { unique: true })
@Index('uniq_629c17cd539b0606', ['uid'], { unique: true })
export class hris_relationalfilter {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  // @ManyToOne(type=>Field, Field=>Field.hris_relationalfilters,{ onDelete: 'CASCADE', })
  // @JoinColumn({ name:'field_id'})
  // field_:Field | null;

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

  @Column('boolean', {
    nullable: false,
    name: 'excludefieldoptions',
  })
  excludefieldoptions: boolean;

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

  //   @ManyToMany(
  //     type => hris_friendlyreport,
  //     hris_friendlyreport => hris_friendlyreport.hris_relationalfilters,
  //   )
  //   hris_friendlyreports: hris_friendlyreport[];

  //   @ManyToMany(
  //     type => hris_fieldoption,
  //     hris_fieldoption => hris_fieldoption.hris_relationalfilters,
  //     { nullable: false },
  //   )
  //   @JoinTable({ name: 'hris_relationalfilter_member' })
  //   hris_fieldoptions: hris_fieldoption[];
}
