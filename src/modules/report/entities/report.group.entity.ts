import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Report } from './report.entity';

@Entity('reportgroup', { schema: 'public' })
export class ReportGroup extends EntityCoreProps {
  static plural = 'reportGroups';

  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', {
    nullable: false,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column('char', {
    nullable: false,
    length: 255,
    name: 'name',
  })
  name: string;

  // ToDo: BEGIN: Review Implementation
  // @ManyToMany(
  //   type => Report,
  //   report => report.reportGroups,
  //   { nullable: false, eager: true },
  // )
  // @JoinTable({ name: 'reportgroupmembers' })
  // reports: Report[];
  // ToDo: END: Review Implementation

  @ManyToMany((type) => Report, (report) => report.reportGroups, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'reportgroupmembers' })
  reports: Report[];
}
