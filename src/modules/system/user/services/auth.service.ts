import { Injectable } from '@nestjs/common';
import { sanitizeResponseObject } from '../../../../core/utilities/sanitize-response-object';
import { User } from '../../../../modules/system/user/entities/user.entity';

import { UserService } from './user.service';
import { getBasicAuthanticationString } from '../../../../core/helpers/basic-auth-token';
import { passwordCompare } from '../../../../core/utilities/password-utilities';

@Injectable()
export class AuthService {

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
  async authenticateUser(username, password): Promise<User>{
    console.log('WHat');
    let user:User = await User.findOne({
      where: { username },
    });
    console.log(user);
    if(await passwordCompare(password,user.password)){
      return user;
    }else{
      return null;
    }
  }
}
