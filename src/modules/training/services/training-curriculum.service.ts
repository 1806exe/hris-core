import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Repository } from 'typeorm';
import { TrainingCurriculum } from '../entities/training-curriculum.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceBaseService } from '../../../core/maintenance/services/base.service';
import { TrainingUnit } from '../entities/training-unit.entity';
import { TrainingSection } from '../entities/training-section.entity';

@Injectable()
export class TrainingCurriculumService extends MaintenanceBaseService<
  TrainingCurriculum
> {
  constructor(
    @InjectRepository(TrainingCurriculum)
    private trainingCurriculumRepository: Repository<TrainingCurriculum>,

    @InjectRepository(TrainingUnit)
    private trainingUnitRepository: Repository<TrainingUnit>,

    @InjectRepository(TrainingSection)
    private trainingSectionRepository: Repository<TrainingSection>,
  ) {
    super(trainingCurriculumRepository, TrainingCurriculum);
  }

  async createCurriculum(
    createCurriculumDTO: any,
  ): Promise<TrainingCurriculum> {
    /*TODO: Add temporary creation of training curriculum for test scenarios */
    let curriculum = new TrainingCurriculum();
    Object.keys(createCurriculumDTO).forEach((key) => {
      curriculum[key] = createCurriculumDTO[key];
    });
    curriculum.unit = await this.trainingUnitRepository.findOne({
      where: { uid: createCurriculumDTO.unit },
    });
    curriculum.section = await this.trainingSectionRepository.findOne({
      where: { uid: createCurriculumDTO.section },
    });

    const savedcurriculum = await this.trainingCurriculumRepository.save(
      curriculum,
    );
    return await this.trainingCurriculumRepository.findOne({
      where: { uid: savedcurriculum.uid },
    });
  }
}
