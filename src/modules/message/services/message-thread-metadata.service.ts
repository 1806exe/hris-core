import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { MessageThreadMetadata } from '../entities/message-thread-metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageThreadMetadataService extends BaseService<
  MessageThreadMetadata
> {
  constructor(
    @InjectRepository(MessageThreadMetadata)
    messageThreadMetadataService: Repository<MessageThreadMetadata>,
  ) {
    super(messageThreadMetadataService, MessageThreadMetadata);
  }
}
