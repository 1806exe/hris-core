import { Entity, Column } from 'typeorm';
import { NamedIdentifiableObject } from '../../../core/entities/named-identifiable-object';

@Entity('app', { schema: 'public' })
export class App extends NamedIdentifiableObject {
  static plural = 'apps';

  @Column({ type: 'varchar', length: 255 })
  version: string;

  @Column({ type: 'varchar', length: 255 })
  launchpath: string;

  @Column({ type: 'varchar', length: 128 })
  appicon: string;
}
