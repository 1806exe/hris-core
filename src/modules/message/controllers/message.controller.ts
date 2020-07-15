import { Controller } from '@nestjs/common';
import { BaseController } from '../../../core/controllers/base.contoller';
import { Message } from '../entities/message.entity';
import { MessageService } from '../services/message.service';

@Controller('api/' + Message.plural)
export class MessageController extends BaseController<Message> {
  constructor(messageService: MessageService) {
    super(messageService, Message);
  }
}
