import { Column, Entity, Index } from 'typeorm';

@Entity('hris_friendlyreportcategory', { schema: 'public' })
@Index('idx_9016a10da1a91b38', ['fieldoptiongroup_'])
@Index('idx_9016a10d5bc2af53', ['friendlyreport_'])
export class hris_friendlyreportcategory {
  //   @ManyToOne(
  //     type => hris_friendlyreport,
  //     hris_friendlyreport => hris_friendlyreport.hris_friendlyreportcategorys,
  //     { primary: true, nullable: false, onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'friendlyreport_id' })
  //   friendlyreport_: hris_friendlyreport | null;

  //   @ManyToOne(
  //     type => hris_fieldoptiongroup,
  //     hris_fieldoptiongroup => hris_fieldoptiongroup.hris_friendlyreportcategorys,
  //     { primary: true, nullable: false, onDelete: 'CASCADE' },
  //   )
  //   @JoinColumn({ name: 'fieldoptiongroup_id' })
  //   fieldoptiongroup_: hris_fieldoptiongroup | null;

  @Column('integer', {
    nullable: false,
    name: 'sort',
  })
  sort: number;
}
