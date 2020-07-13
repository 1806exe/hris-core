import { Column, Entity, Index } from 'typeorm';

@Entity('hris_intergration_tiis_employee_fieldrelation', { schema: 'public' })
@Index('idx_a802e39c443707b0', ['field_'])
export class hris_intergration_tiis_employee_fieldrelation {
  //   @OneToOne(
  //     type => hris_intergration_tiis_data_connection,
  //     hris_intergration_tiis_data_connection =>
  //       hris_intergration_tiis_data_connection.hris_intergration_tiis_employee_fieldrelation,
  //     { primary: true, nullable: false, onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'tiis_data_connection_id' })
  //   tiis_data_connection_: hris_intergration_tiis_data_connection | null;

  //   @ManyToOne(
  //     type => Field,
  //     Field => Field.hris_intergration_tiis_employee_fieldrelations,
  //     { onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'field_id' })
  //   field_: Field | null;

  @Column('character varying', {
    nullable: true,
    length: 255,
    default: () => 'NULL::character varying',
    name: 'columnname',
  })
  columnname: string | null;
}
