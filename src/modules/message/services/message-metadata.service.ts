import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { MessageMetadata } from '../entities/message-metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageMetadataService extends BaseService<MessageMetadata> {
  constructor(
    @InjectRepository(MessageMetadata)
    messageMetadataService: Repository<MessageMetadata>,
  ) {
    super(messageMetadataService, MessageMetadata);
  }
}
