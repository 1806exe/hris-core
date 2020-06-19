import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { VisualizationDimensionItem } from './visualization-dimension-item.entity';
import { Visualization } from './visualization.entity';
import { TransactionTimestamp } from '../../../core/entities/transaction-timestamp.entity';

@Entity('visualizationdimension', { schema: 'public' })
export class VisualizationDimension extends TransactionTimestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 11, unique: true })
  uid: string;

  @Column({
    type: 'varchar',
    name: 'dimension',
    length: 5,
    nullable: false,
  })
  dimension: string;

  @Column({
    type: 'varchar',
    name: 'layout',
    length: 10,
    nullable: false,
  })
  layout: string;

  @OneToMany(
    () => VisualizationDimensionItem,
    (visualizationDimensionItem: VisualizationDimensionItem) =>
      visualizationDimensionItem.visualizationDimension,
    { eager: true, cascade: true },
  )
  items: VisualizationDimensionItem[];

  @ManyToOne(
    () => Visualization,
    (visualization: Visualization) => visualization.dimensions,
  )
  @JoinColumn({ name: 'visualizationid' })
  visualization: Visualization;
}
