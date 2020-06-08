import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/core/controllers/base.contoller';
import { UserRoleAccess } from '../entities/user-role-access.entity';
import { UserRoleAccessService } from '../services/user-role-access.service';

@Controller('api/' + UserRoleAccess.plural)
// @UseGuards(AuthGuard())
export class UserRoleAccessController extends BaseController<UserRoleAccess> {
  constructor(private readonly userRoleService: UserRoleAccessService) {
    super(userRoleService, UserRoleAccess);
  }
}
