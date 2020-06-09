import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../../core/services/base.service';
import { UserAccess } from '../entities/user-access.entity';

@Injectable()
export class UserAccessService extends BaseService<UserAccess> {
    constructor(
        @InjectRepository(UserAccess)
        private readonly userRoleRepository: Repository<UserAccess>,
    ) {
        super(userRoleRepository, UserAccess);
    }
}
