import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { ReportGroup } from './report.group.entity';

@Entity('report', { schema: 'public' })
export class Report extends EntityCoreProps {
  static plural = 'reports';

  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', {
    nullable: false,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'uri',
  })
  uri: string;

  @Column('json', {
    nullable: true,
    name: 'parameters',
  })
  parameters: any;

  // ToDo: BEGIN Improve Approach
  // @Column({
  //   nullable: false,
  //   name: 'userid',
  // })
  // userid: number;
  // ToDo: END Improve Approach

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'type',
  })
  type: string;

  @Column('character varying', {
    nullable: true,
    length: 255,
    name: 'createdby',
  })
  createdby: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'publicaccess',
  })
  publicAccess: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'externalaccess',
  })
  externalAccess: boolean;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'description',
  })
  description: string;

  @Column('character varying', {
    nullable: false,
    length: 256,
    name: 'code',
  })
  code: string;

  @Column('char', {
    nullable: false,
    length: 50000,
    name: 'html',
  })
  html: string;

  // ToDo: BEGIN: Improve Approach
  // @OneToOne(
  //   () => User,
  //   (user: User) => user.report,
  //   { onDelete: 'CASCADE' },
  // )
  // @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  // user: User;

  // @OneToOne(() => User, (user: User) => user.report, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'userid' })
  // user: User;
  // ToDo: END: Improve Approach

  @ManyToMany((type) => ReportGroup, (reportGroup) => reportGroup.reports)
  reportGroups: ReportGroup[];
}
