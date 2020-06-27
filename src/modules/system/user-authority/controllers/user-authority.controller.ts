import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from '../../../../core/controllers/base.contoller';
import { UserAuthorityService } from '../services/user-authority.service';
import { UserAuthority } from '../entities/user-authority.entity';

@Controller('api/' + UserAuthority.plural)
// @UseGuards(AuthGuard())
export class UserAuthorityController extends BaseController<UserAuthority> {
    constructor(private readonly userAuthorityService: UserAuthorityService) {
        super(userAuthorityService, UserAuthority);
    }
}
