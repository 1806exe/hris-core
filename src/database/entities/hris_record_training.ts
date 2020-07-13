import { Column, Entity, Index } from 'typeorm';

@Entity('hris_record_training', { schema: 'public' })
// @Index("unique_recordtraining_idx",["record_","trainingsession_",],{unique:true})
// @Index("idx_f3e7ab184dfd750c",["record_",])
@Index('uniq_f3e7ab18539b0606', ['uid'], { unique: true })
export class hris_record_training {
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
    length: 255,
    name: 'coursename',
  })
  coursename: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'courselocation',
  })
  courselocation: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'sponsor',
  })
  sponsor: string;

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

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'username',
  })
  username: string;

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

  // @ManyToOne(
  //   type => hris_traininginstance,
  //   hris_traininginstance => hris_traininginstance.hris_record_trainings,
  //   {},
  // )
  // @JoinColumn({ name: 'trainingsession_id' })
  // trainingsession_: hris_traininginstance | null;
}
