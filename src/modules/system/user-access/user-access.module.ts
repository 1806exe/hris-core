import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccess } from './entities/user-access.entity';
import { UserAccessController } from './controllers/user-access.controller';
import { UserAccessService } from './services/user-access.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([UserAccess]),
  ],
  controllers: [UserAccessController],
  providers: [UserAccessService],
})
export class UserAccessModule {}
