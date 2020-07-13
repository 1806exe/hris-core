import { Column, Entity, Index } from 'typeorm';

@Entity('hris_friendlyreport', { schema: 'public' })
@Index('uniq_354231795e237e06', ['name'], { unique: true })
@Index('idx_354231795278319c', ['series_'])
@Index('uniq_35423179539b0606', ['uid'], { unique: true })
export class hris_friendlyreport {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  //   @ManyToOne(
  //     type => hris_fieldoptiongroup,
  //     hris_fieldoptiongroup => hris_fieldoptiongroup.hris_friendlyreports,
  //     { onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'series_id' })
  //   series_: hris_fieldoptiongroup | null;

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

  @Column('integer', {
    nullable: false,
    name: 'sort',
  })
  sort: number;

  @Column('boolean', {
    nullable: true,
    name: 'ignoreskipinreport',
  })
  ignoreskipinreport: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'usetargets',
  })
  usetargets: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'showdeficitsurplus',
  })
  showdeficitsurplus: boolean | null;

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

  @Column('character varying', {
    nullable: true,
    length: 13,
    default: () => 'NULL::character varying',
    name: 'type',
  })
  type: string | null;

  @Column('text', {
    nullable: true,
    name: 'sql',
  })
  sql: string | null;

  @Column('text', {
    nullable: true,
    name: 'javascript',
  })
  javascript: string | null;

  @Column('text', {
    nullable: true,
    name: 'stylesheet',
  })
  stylesheet: string | null;

  //   @OneToMany(
  //     type => hris_friendlyreportcategory,
  //     hris_friendlyreportcategory => hris_friendlyreportcategory.friendlyreport_,
  //     { onDelete: 'CASCADE' },
  //   )
  //   hris_friendlyreportcategorys: hris_friendlyreportcategory[];

  //   @ManyToMany(
  //     type => hris_arithmeticfilter,
  //     hris_arithmeticfilter => hris_arithmeticfilter.hris_friendlyreports,
  //     { nullable: false },
  //   )
  //   @JoinTable({ name: 'hris_friendlyreport_arithmeticfilter' })
  //   hris_arithmeticfilters: hris_arithmeticfilter[];

  //   @ManyToMany(
  //     type => hris_relationalfilter,
  //     hris_relationalfilter => hris_relationalfilter.hris_friendlyreports,
  //     { nullable: false },
  //   )
  //   @JoinTable({ name: 'hris_friendlyreport_relationalfilter' })
  //   hris_relationalfilters: hris_relationalfilter[];
}
