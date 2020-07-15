import { Column, Entity, Index } from 'typeorm';

@Entity('hris_intergration_dhis_dataelementfieldoptionrelation', {
  schema: 'public',
})
@Index(
  'unique_dhisdataelement_idx',
  ['categorycombouid', 'dataelementuid', 'dhis_data_connection_'],
  { unique: true },
)
@Index(
  'unique_hrfieldoptiongroups_idx',
  [
    'column_fieldoption_group_',
    'dhis_data_connection_',
    'row_fieldoption_group_',
  ],
  { unique: true },
)
@Index('idx_6902021b1bd8199f', ['column_fieldoption_group_'])
@Index('idx_6902021bb17756c2', ['dhis_data_connection_'])
@Index('idx_6902021bceff300e', ['row_fieldoption_group_'])
export class hris_intergration_dhis_dataelementfieldoptionrelation {
  //   @ManyToOne(
  //     type => hris_intergration_dhis_dataconnection,
  //     hris_intergration_dhis_dataconnection =>
  //       hris_intergration_dhis_dataconnection.hris_intergration_dhis_dataelementfieldoptionrelations,
  //     { primary: true, nullable: false, onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'dhis_data_connection_id' })
  //   dhis_data_connection_: hris_intergration_dhis_dataconnection | null;

  //   @ManyToOne(
  //     type => hris_fieldoptiongroup,
  //     hris_fieldoptiongroup =>
  //       hris_fieldoptiongroup.hris_intergration_dhis_dataelementfieldoptionrelations,
  //     { onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'column_fieldoption_group_id' })
  //   column_fieldoption_group_: hris_fieldoptiongroup | null;

  //   @ManyToOne(
  //     type => hris_fieldoptiongroup,
  //     hris_fieldoptiongroup =>
  //       hris_fieldoptiongroup.hris_intergration_dhis_dataelementfieldoptionrelations2,
  //     { onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'row_fieldoption_group_id' })
  //   row_fieldoption_group_: hris_fieldoptiongroup | null;

  @Column('character varying', {
    nullable: false,
    primary: true,
    length: 16,
    name: 'dataelementuid',
  })
  dataelementuid: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'dataelementname',
  })
  dataelementname: string;

  @Column('character varying', {
    nullable: false,
    primary: true,
    length: 16,
    name: 'categorycombouid',
  })
  categorycombouid: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'categorycomboname',
  })
  categorycomboname: string;
}
