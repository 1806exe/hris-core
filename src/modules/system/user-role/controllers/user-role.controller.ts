import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseController } from '../../../../core/controllers/base.contoller';
import { UserRole } from '../entities/user-role.entity';
import { UserRoleService } from '../services/user-role.service';
import { MaintenanceBaseController } from '../../../../core/maintenance/controllers/base.controller';

@Controller('api/' + UserRole.plural)
// @UseGuards(AuthGuard())
export class UserRoleController extends MaintenanceBaseController<UserRole> {
  constructor(private readonly userRoleService: UserRoleService) {
    super(userRoleService, UserRole);
  }
}
