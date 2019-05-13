import { Controller } from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';

import { MessageThreadMetadata } from '../entities/message-thread-metadata.entity';
import { MessageThreadMetadataService } from '../services/message-thread-metadata.service';

@Controller(MessageThreadMetadata.plural)
export class MessageThreadMetadataController extends BaseController<
  MessageThreadMetadata
> {
  constructor(messageThreadMetadataService: MessageThreadMetadataService) {
    super(messageThreadMetadataService, MessageThreadMetadata);
  }
}
