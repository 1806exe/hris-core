import { Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
import { passwordCompare } from '../../../../core/utilities/password-utilities';
import { sanitizeResponseObject } from '../../../../core/utilities/sanitize-response-object';
import { User } from '../../../system/user/entities/user.entity';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(username, password): Promise<User> {
    const user: User = await User.findOne({ where: { username } });
    const hashedPassword = await passwordCompare(password, user.password);
    if (hashedPassword) {
      delete user.password;
      return user;
    } else {
      throwError('Username or Password Invalid');
    }
  }

  async getUserByUid(uid: string): Promise<User> {
    const user = await this.userService.findOneByUid(uid);
    return sanitizeResponseObject(user);
  }
  async authenticateUser(username, password): Promise<User> {
    const user: User = await User.findOne({
      where: { username },
    });
    if (await passwordCompare(password, user.password)) {
      return user;
    } else {
      return null;
    }
  }
}
