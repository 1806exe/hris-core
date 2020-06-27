import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';
import { MessageThread } from '../entities/message-thread.entity';
import { MessageThreadService } from '../services/message-thread.service';

@Controller('api/' + MessageThread.plural)
export class MessageThreadController extends BaseController<MessageThread> {
  constructor(messageThreadService: MessageThreadService) {
    super(messageThreadService, MessageThread);
  }
}
