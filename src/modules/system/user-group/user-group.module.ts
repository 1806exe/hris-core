import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroup } from './entities/user-group.entity';
import { UserGroupController } from './controllers/user-group.controller';
import { UserGroupService } from './services/user-group.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([UserGroup]),
  ],
  controllers: [UserGroupController],
  providers: [UserGroupService],
})
export class UserGroupModule {}
