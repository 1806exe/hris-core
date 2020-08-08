import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../../../system/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from '../../../../core/controllers/base.contoller';
import { MaintenanceBaseController } from '../../../../core/maintenance/controllers/base.controller';

@Controller('api/' + User.plural)
// @UseGuards(AuthGuard())
export class UsersController extends MaintenanceBaseController<User> {
  constructor(private readonly userService: UserService) {
    super(userService, User);
  }
}
