import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';
import { User } from '../../system/user/entities/user.entity';
import { DashboardAccess } from '../entities/dashboard-useraccess.entity';
import { Dashboard } from '../entities/dashboard.entity';

@Injectable()
export class DashboardService extends MaintenanceBaseService<Dashboard> {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardRepository: Repository<Dashboard>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DashboardAccess)
    private dashboardAccessRepository: Repository<DashboardAccess>,
  ) {
    super(dashboardRepository, Dashboard);
  }

  async findOneDashboard(param: any): Promise<any> {
    return await this.dashboardRepository.findOne({
      where: { uid: param },
    });
  }

  async dashboardSharingCreation(
    uid: String,
    dashboardsharingDTO: any,
  ): Promise<any> {
    const shareduser = await this.userRepository.findOne({
      where: { uid: dashboardsharingDTO.user },
    });
    const dashboardaccess = new DashboardAccess();
    const dashboard = await this.dashboardRepository.findOne({
      where: { uid: uid },
    });
    dashboardaccess.userid = (
      await this.userRepository.findOne({
        where: { uid: dashboardsharingDTO.user },
      })
    ).id;

    dashboardaccess.access = dashboardsharingDTO.access;

    const shareddashboard = await this.dashboardAccessRepository.save(
      dashboardaccess,
    );
    if (shareddashboard !== undefined) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('dashboarduseraccess')
        .values([
          {
            dashboardId: dashboard.id,
            dashboardaccessId: shareddashboard.id,
          },
        ])
        .execute();
    }
    return {
      message: `Dashboard with ID ${uid} shared with ${shareduser.firstName}`,
      dashboardaccess: shareddashboard,
    };
  }
  async dashboardSharingEdit(uid: string, editSessionDTO): Promise<any> {
    const { user, access } = editSessionDTO;
    const shareduser = await this.userRepository.findOne({
      where: { uid: editSessionDTO.user },
    });
    const userId = (
      await this.userRepository.findOne({
        where: { uid: user },
      })
    ).id;
    const accessId = await this.dashboardAccessRepository.findOne({
      where: { userid: userId },
    });
    accessId.access = access;
    await this.dashboardAccessRepository.save(accessId);

    return {
      message: `Dashboard with ID ${uid} shared with ${shareduser.firstName}`,
      dashboardaccess: accessId,
    };
  }
  async SharedUser(uid: string): Promise<any> {
    const user = (await this.userRepository.findOne({ where: { uid: uid } }))
      .id;

    const dashboardaccessuser = await this.dashboardAccessRepository.findOne({
      where: { userid: user },
    });
    return dashboardaccessuser;
  }
}
