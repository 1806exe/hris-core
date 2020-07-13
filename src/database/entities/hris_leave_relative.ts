import { Column, Entity, Index } from 'typeorm';

@Entity('hris_leave_relative', { schema: 'public' })
@Index('idx_cbbd24371b2adb5c', ['leave_'])
export class hris_leave_relative {
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  //   @ManyToOne(
  //     type => hris_leave,
  //     hris_leave => hris_leave.hris_leave_relatives,
  //     { onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'leave_id' })
  //   leave_: hris_leave | null;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'name',
  })
  name: string;

  @Column('date', {
    nullable: false,
    name: 'date_of_birth',
  })
  date_of_birth: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'age',
  })
  age: string;

  @Column('character varying', {
    nullable: false,
    length: 13,
    name: 'uid',
  })
  uid: string;
}
