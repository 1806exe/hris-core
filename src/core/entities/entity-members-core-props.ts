/**
 *
 */
import { BeforeInsert, Column, PrimaryGeneratedColumn } from 'typeorm';
/**
 *
 */
import { generateUid } from '../helpers/makeuid';
import { TransactionTimestamp } from './transaction-timestamp.entity';
/**
 *
 */
export class EntityMembersCoreProps extends TransactionTimestamp {
  /**
   *
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   *
   */
  @Column({ type: 'varchar', length: 256 })
  uid: string;

  /**
   *
   */
  @Column('varchar', {
    nullable: true,
    length: 255,
    name: 'title',
  })
  title: string | null;

  /**
   *
   */
  @Column('text', {
    nullable: true,
    name: 'description',
  })
  description: string | null;

  /**
   *
   */
  // TODO Find best way to associated last updated field with user entity
  @Column({ nullable: true, name: 'lastupdatedby' })
  lastUpdatedBy: string | null;

  /**
   *
   */
  @Column('character varying', {
    nullable: true,
    length: 8,
    name: 'publicaccess',
  })
  publicAccess: string | null;

  /**
   *
   */
  @Column('boolean', {
    nullable: true,
    name: 'externalaccess',
  })
  externalAccess: boolean | null;

  /**
   *
   */
  @BeforeInsert()
  beforeInsertEntityCoreProps() {
    /**
     *  You can generate UUID in different ways
     *  1. You can generate uuid of any length: i.e getUid('', 20)
     *      Example of UUID::: 8aydSxYBrrP
     *  2. You can generat UUID by prepending a context specific keyword i.e getUid('HRIS', 20)
     *      Example of UUID::: HRIS_8aydSxYBrrP
     */
    this.uid = generateUid();
  }
}
