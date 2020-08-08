import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../../core/services/base.service';
import { UserRole } from '../entities/user-role.entity';
import { MaintenanceBaseService } from '../../../../core/maintenance/services/base.service';

@Injectable()
export class UserRoleService extends MaintenanceBaseService<UserRole> {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {
    super(userRoleRepository, UserRole);
  }
}
