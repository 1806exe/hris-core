import { Column } from 'typeorm';

import { EntityCoreProps } from './entity-core-props';

export class NamedIdentifiableObject extends EntityCoreProps {
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  shortName: string;
}
