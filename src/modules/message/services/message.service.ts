import { Injectable } from '@nestjs/common';
import { Message } from '../entities/message.entity';
import { BaseService } from '../../../core/services/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService extends BaseService<Message> {
  constructor(
    @InjectRepository(Message)
    messageService: Repository<Message>,
  ) {
    super(messageService, Message);
  }
}
