import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';
import { UserAccess } from '../entities/user-access.entity';
import { UserAccessService } from '../services/user-access.service';

@Controller('api/' + UserAccess.plural)
// @UseGuards(AuthGuard())
export class UserAccessController extends BaseController<UserAccess> {
  constructor(private readonly userRoleService: UserAccessService) {
    super(userRoleService, UserAccess);
  }
}
