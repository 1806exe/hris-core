import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingVenue } from '../entities/training-venue.entity';
import { OrganisationUnit } from '../../../modules/organisation-unit/entities/organisation-unit.entity';
import { generateUid } from '../../../core/helpers/makeuid';

@Injectable()
export class TrainingVenueService extends BaseService<TrainingVenue> {
  constructor(
    @InjectRepository(TrainingVenue)
    private trainingVenueRepository: Repository<TrainingVenue>,
    @InjectRepository(OrganisationUnit)
    private organisationUnitRepository: Repository<OrganisationUnit>,
  ) {
    super(trainingVenueRepository, TrainingVenue);
  }
  async createVenue(createvenueDTO: TrainingVenue): Promise<TrainingVenue> {
    const { name, district, region, organisationUnit } = createvenueDTO;

    return await this.trainingVenueRepository.save({
      uid: generateUid(),
      name: name,
      district: district,
      region: region,
      organisationUnit: await this.organisationUnitRepository.findOne({
        where: { uid: organisationUnit },
      }),
    });
  }
}
