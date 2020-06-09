import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../../core/services/base.service';
import { UserRoleAccess } from '../entities/user-role-access.entity';

@Injectable()
export class UserRoleAccessService extends BaseService<UserRoleAccess> {
    constructor(
        @InjectRepository(UserRoleAccess)
        private readonly userRoleRepository: Repository<UserRoleAccess>,
    ) {
        super(userRoleRepository, UserRoleAccess);
    }
}
