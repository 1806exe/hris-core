import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseController } from '../../../../core/controllers/base.contoller';
import { UserRole } from '../entities/user-role.entity';
import { UserRoleService } from '../services/user-role.service';

@Controller('api/' + UserRole.plural)
// @UseGuards(AuthGuard())
export class UserRoleController extends BaseController<UserRole> {
    constructor(private readonly userRoleService: UserRoleService) {
        super(userRoleService, UserRole);
    }
}
