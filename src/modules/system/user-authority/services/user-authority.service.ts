import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../../../core/services/base.service';
import { UserAuthority } from '../entities/user-authority.entity';

@Injectable()
export class UserAuthorityService extends BaseService<UserAuthority> {
    constructor(
        @InjectRepository(UserAuthority)
        private readonly userAuthorityRepository: Repository<UserAuthority>,
    ) {
        super(userAuthorityRepository, UserAuthority);
    }
}
