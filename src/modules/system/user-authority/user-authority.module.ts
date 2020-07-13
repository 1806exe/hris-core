import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthority } from './entities/user-authority.entity';
import { UserAuthorityController } from './controllers/user-authority.controller';
import { UserAuthorityService } from './services/user-authority.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'basic', session: true }),
        TypeOrmModule.forFeature([UserAuthority]),
    ],
    controllers: [UserAuthorityController],
    providers: [UserAuthorityService],
}) export class UserAuthorityModule { }
