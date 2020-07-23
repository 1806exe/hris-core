import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '../../system/user/entities/user.entity';
import { MessageThreadMetadata } from './message-thread-metadata.entity';
import { Message } from './message.entity';

@Entity('messagethread', { schema: 'public' })
export class MessageThread extends EntityCoreProps {
  static plural = 'messageThreads';

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  @ManyToOne((type) => User, (user) => user.messageThreads, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'createdbyid' })
  createdBy: User | null;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'subject',
  })
  subject: string;

  @Column('boolean', {
    nullable: false,
    name: 'isspam',
  })
  isSpam: boolean;

  @OneToMany((type) => Message, (message) => message.thread, {
    onDelete: 'CASCADE',
  })
  messages: Message[];

  @OneToMany(
    (type) => MessageThreadMetadata,
    (messageThreadMetadata) => messageThreadMetadata.thread,
    { onDelete: 'CASCADE' },
  )
  messageThreadMetadatas: MessageThreadMetadata[];
}
