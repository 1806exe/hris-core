import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingVenue } from '../entities/training-venue.entity';
import { OrganisationUnit } from '../../../modules/organisation-unit/entities/organisation-unit.entity';

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
  async createVenue(createvenueDTO: TrainingVenue): Promise<any> {
    const venue = new TrainingVenue();
    Object.keys(createvenueDTO).forEach((key) => {
      venue[key] = createvenueDTO[key];
    });
    venue.organisationUnit = await this.organisationUnitRepository.findOne({
      where: { uid: createvenueDTO.organisationUnit },
    });
    const venueid = await this.trainingVenueRepository.save(venue);

    return await this.trainingVenueRepository.findOne({
      where: { uid: venueid.uid },
    });
  }
  async updateVenue(uid: string, updateVenueDTO: TrainingVenue): Promise<any> {
    const { name, district, region, organisationUnit } = updateVenueDTO;

    await this.trainingVenueRepository.update(
      {
        uid: (
          await this.trainingVenueRepository.findOne({ where: { uid: uid } })
        ).uid,
      },
      {
        name: name,
        district: district,
        region: region,
        organisationUnit: await this.organisationUnitRepository.findOne({
          where: { uid: organisationUnit },
        }),
      },
    );
    return this.trainingVenueRepository.findOne({ where: { uid: uid } });
  }
}
