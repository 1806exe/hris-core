import { Injectable } from '@nestjs/common';
import { sanitizeResponseObject } from '../../../../core/utilities/sanitize-response-object';
import { User } from '../../../../modules/system/user/entities/user.entity';

import { UserService } from './user.service';
import { getBasicAuthanticationString } from '../../../../core/helpers/basic-auth-token';

@Injectable()
export class AuthService {
  private algorithm = 'sha512';
  private encodeHashAsBase64 = true;
  private iterations = 0;

  constructor(private readonly userService: UserService) {}

  async login(username, password): Promise<User> {
    let token = getBasicAuthanticationString(username,password);
    let user = await User.authenticateUserByToken(token);
    return user;
  }

  async getUserByUid(uid: string): Promise<User> {
    const user = await this.userService.findOneByUid(uid);
    return sanitizeResponseObject(user);
  }
}
