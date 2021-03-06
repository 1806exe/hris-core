import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { User } from '../entities/user.entity';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    try {
        const user = await User.authenticateUser(request.body.username, request.body.password);
        if (user) {
          if (!request.session) {
            request.session = {};
          }
          request.session.user = user;
          return true;
        }
    } catch (e) {
      Logger.error(e.message);
      throw new Error('Not In Session');
    }
  }
}
