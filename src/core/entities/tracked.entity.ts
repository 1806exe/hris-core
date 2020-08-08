import { Column, BeforeInsert } from 'typeorm';

export class Tracked {
  @Column('timestamp without time zone', {
    nullable: true,
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
    name: 'uid',
  })
  uid: string;

  @BeforeInsert()
  updateDates() {
    this.datecreated = new Date();
    this.lastupdated = new Date();
    this.uid = 'qwreyuwgstyw13';
  }
}
