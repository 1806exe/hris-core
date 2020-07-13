import { Module } from '@nestjs/common';
import { MessageMetadataController } from './controllers/message-metadata.controller';
import { MessageThreadMetadataController } from './controllers/message-thread-metadata.controller';
import { MessageThreadController } from './controllers/message-thread.controller';
import { MessageController } from './controllers/message.controller';
import { MessageMetadataService } from './services/message-metadata.service';
import { MessageThreadMetadataService } from './services/message-thread-metadata.service';
import { MessageThreadService } from './services/message-thread.service';
import { MessageService } from './services/message.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageMetadata } from './entities/message-metadata.entity';
import { MessageThread } from './entities/message-thread.entity';
import { MessageThreadMetadata } from './entities/message-thread-metadata.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([
      MessageMetadata,
      MessageThread,
      MessageThreadMetadata,
      Message,
    ]),
  ],
  controllers: [
    MessageMetadataController,
    MessageThreadMetadataController,
    MessageThreadController,
    MessageController,
  ],
  providers: [
    MessageMetadataService,
    MessageThreadMetadataService,
    MessageThreadService,
    MessageService,
  ],
})
export class MessageModule {}
