import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../../../../modules/system/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from '../../../../core/controllers/base.contoller';

@Controller('api/' + User.plural)
// @UseGuards(AuthGuard())
export class UsersController extends BaseController<User> {
  constructor(private readonly userService: UserService) {
    super(userService, User);
  }
}
