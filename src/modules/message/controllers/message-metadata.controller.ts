import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';
import { MessageMetadata } from '../entities/message-metadata.entity';
import { MessageMetadataService } from '../services/message-metadata.service';

@Controller('api/' + MessageMetadata.plural)
export class MessageMetadataController extends BaseController<MessageMetadata> {
  constructor(messageMetadataService: MessageMetadataService) {
    super(messageMetadataService, MessageMetadata);
  }
}
