import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../../../core/services/base.service';
import { User } from '../entities/user.entity';
import { passwordHash } from '../../../../core/utilities/password-utilities';
import { MaintenanceBaseService } from '../../../../core/maintenance/services/base.service';

@Injectable()
export class UserService extends MaintenanceBaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository, User);
  }

  async findOneByToken(token): Promise<User> {
    return await this.userRepository.findOne({
      where: { confirmationToken: token },
    });
  }
  async findByUsername(username): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

  async create(entity: User): Promise<any> {
    const user = await super.create(entity);
    delete user.password;
    return user;
  }
}
