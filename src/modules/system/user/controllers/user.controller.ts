import { Controller } from '@nestjs/common';
import { MaintenanceBaseController } from '../../../../core/maintenance/controllers/base.controller';
import { User } from '../../../system/user/entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('api/' + User.plural)
// @UseGuards(AuthGuard())
export class UsersController extends MaintenanceBaseController<User> {
  constructor(private readonly userService: UserService) {
    super(userService, User);
  }
}
