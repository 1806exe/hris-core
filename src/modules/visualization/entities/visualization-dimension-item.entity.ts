import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { VisualizationDimension } from './visualization-dimension.entity';
import { TransactionTimestamp } from '../../../core/entities/transaction-timestamp.entity';

@Entity('visualizationdimensionitem', { schema: 'public' })
export class VisualizationDimensionItem extends TransactionTimestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', {
    nullable: true,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'dimensionitem',
    nullable: false,
  })
  dimensionItem: string;

  @Column({ type: 'varchar', length: 50, name: 'dimensionitemtype' })
  dimensionItemType: string;

  @ManyToOne(
    () => VisualizationDimension,
    (visualizationDimension: VisualizationDimension) =>
      visualizationDimension.items,
  )
  @JoinColumn({ name: 'visualizationdimensionid' })
  visualizationDimension: VisualizationDimension;
}
