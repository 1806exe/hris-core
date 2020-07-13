import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';

import { User } from '../../system/user/entities/user.entity';
import { MessageMetadata } from './message-metadata.entity';
import { MessageThread } from './message-thread.entity';

@Entity('message', { schema: 'public' })
export class Message extends EntityCoreProps {
  static plural = 'messages';

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'messageid',
  })
  id: number;

  @ManyToOne(type => MessageThread, messageThread => messageThread.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'threadid' })
  thread: MessageThread | null;

  // ! Deprecated
  // @ManyToOne(type => User, user => user.messages, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'userid' })
  // user: User | null;
  // ! Deprecated

  @ManyToMany(type => User, user => user.messages)
  user: User;

  @Column('text', {
    nullable: false,
    name: 'body',
  })
  body: string;

  @OneToMany(
    type => MessageMetadata,
    messageMetadata => messageMetadata.message,
    { onDelete: 'CASCADE' },
  )
  messageMetadatas: MessageMetadata[];
}
