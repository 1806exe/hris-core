import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserRole } from '../user-role/entities/user-role.entity';
import { UserGroup } from '../user-group/entities/user-group.entity';
import { UserSettings } from './entities/user-settings.entity';

import { AuthService } from './services/auth.service';
import { AppAuthGuard } from './guards/roles.guard';
import { UsersController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([User, UserGroup, UserRole, UserSettings]),
  ],
  controllers: [UsersController, AuthController],
  providers: [UserService, AuthService, AppAuthGuard],
})
export class UserModule {}
