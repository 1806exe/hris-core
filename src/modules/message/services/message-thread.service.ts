import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { MessageThread } from '../entities/message-thread.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageThreadService extends BaseService<MessageThread> {
  constructor(
    @InjectRepository(MessageThread)
    messageThreadService: Repository<MessageThread>,
  ) {
    super(messageThreadService, MessageThread);
  }
}
