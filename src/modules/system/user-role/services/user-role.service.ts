import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../../core/services/base.service';
import { UserRole } from '../entities/user-role.entity';

@Injectable()
export class UserRoleService extends BaseService<UserRole> {
    constructor(
        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>,
    ) {
        super(userRoleRepository, UserRole);
    }
}
