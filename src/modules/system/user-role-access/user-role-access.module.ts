import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleAccess } from './entities/user-role-access.entity';
import { UserRoleAccessController } from './controllers/user-role-access.controller';
import { UserRoleAccessService } from './services/user-role-access.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([UserRoleAccess]),
  ],
  controllers: [UserRoleAccessController],
  providers: [UserRoleAccessService],
})
export class UserRoleAccessModule {}
