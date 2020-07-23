import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../../../core/services/base.service';
import { UserGroup } from '../entities/user-group.entity';

@Injectable()
export class UserGroupService extends BaseService<UserGroup> {
  constructor(
    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>,
  ) {
    super(userGroupRepository, UserGroup);
  }
}
