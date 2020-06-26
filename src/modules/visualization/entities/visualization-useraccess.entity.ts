import { UserIdentification } from '../../system/user/entities/user-identification';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Visualization } from './visualization.entity';
@Entity('visualizationaccess', { schema: 'public' })
export class VisualizationAccess extends UserIdentification {
  static plural = 'userAccesses';
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {
    nullable: false,
    name: 'access',
  })
  access: string;

  @Column('integer', { nullable: false, name: 'userid' })
  userid: number;

  @ManyToMany(
    (type) => Visualization,
    (visualization) => visualization.visualizationaccess,
  )
  visualization: Visualization[];
}
