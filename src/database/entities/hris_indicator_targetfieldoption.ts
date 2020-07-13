import { Column, Entity, Index } from 'typeorm';

@Entity('hris_indicator_targetfieldoption', { schema: 'public' })
@Index('idx_e7321b205f3cdfc2', ['fieldoption_'])
@Index('idx_e7321b20158e0b66', ['target_'])
export class hris_indicator_targetfieldoption {
  //   @ManyToOne(
  //     type => hris_indicator_target,
  //     hris_indicator_target =>
  //       hris_indicator_target.hris_indicator_targetfieldoptions,
  //     { primary: true, nullable: false, onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'target_id' })
  //   target_: hris_indicator_target | null;

  //   @ManyToOne(
  //     type => hris_fieldoption,
  //     hris_fieldoption => hris_fieldoption.hris_indicator_targetfieldoptions,
  //     { primary: true, nullable: false, onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'fieldoption_id' })
  //   fieldoption_: hris_fieldoption | null;

  @Column('integer', {
    nullable: false,
    name: 'value',
  })
  value: number;

  @Column('integer', {
    nullable: true,
    name: 'max_value',
  })
  max_value: number | null;
}
