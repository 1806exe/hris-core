import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '../../../system/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from '../../../../core/controllers/base.contoller';
import { UserGroup } from '../entities/user-group.entity';
import { UserGroupService } from '../services/user-group.service';

@Controller('api/' + UserGroup.plural)
// @UseGuards(AuthGuard())
export class UserGroupController extends BaseController<UserGroup> {
    constructor(private readonly userGroupService: UserGroupService) {
        super(userGroupService, UserGroup);
    }
}
