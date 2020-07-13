import { Module } from '@nestjs/common';
import { TrainingCurriculumController } from './controllers/training-curriculum.controller';
import { TrainingTopicController } from './controllers/training-topic.controller';
import { TrainingSectionController } from './controllers/training-section.controller';
import { TrainingSessionController } from './controllers/training-session.controller';
import { TrainingSponsorController } from './controllers/training-sponsor.controller';
import { TrainingTrainerController } from './controllers/training-trainers.controller';
import { TrainingUnitController } from './controllers/training-unit.controller';
import { TrainingVenueController } from './controllers/training-venue.controller';
import { TrainingCurriculumService } from './services/training-curriculum.service';
import { TrainingTopicService } from './services/training-topic.service';
import { TrainingSectionService } from './services/training-section.service';
import { TrainingSessionService } from './services/training-session.service';
import { TrainingSponsorService } from './services/training-sponsor.service';
import { TrainingTrainerService } from './services/training-trainers.service';
import { TrainingUnitService } from './services/training-unit.service';
import { TrainingVenueService } from './services/training-venue.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingCurriculum } from './entities/training-curriculum.entity';
import { TrainingTopic } from './entities/training-topic.entity';
import { TrainingSession } from './entities/training-session.entity';
import { TrainingSponsor } from './entities/training-sponsor.entity';
import { TrainingTrainer } from './entities/training-trainer.entity';
import { TrainingUnit } from './entities/training-unit.entity';
import { TrainingVenue } from './entities/training-venue.entity';
import { TrainingSection } from './entities/training-section.entity';
import { Training } from './entities/training.entity';
import { TrainingController } from './controllers/training.controller';
import { TrainingService } from './services/training.service';
import { SessionParticipant } from './entities/training-session-participant.entity';
import { SessionFacilitator } from './entities/training-session-facilitatory.entity';
import { Record } from '../record/entities/record.entity';
import { RecordValue } from '../record/entities/record-value.entity';
import { OrganisationUnit } from '../organisation-unit/entities/organisation-unit.entity';
import { User } from '../system/user/entities/user.entity';
import { TrainingSessionAccess } from './entities/training-session-access.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([
      TrainingSection,
      TrainingCurriculum,
      TrainingTopic,
      TrainingSession,
      TrainingSponsor,
      TrainingTrainer,
      TrainingUnit,
      TrainingVenue,
      Training,
      SessionParticipant,
      SessionFacilitator,
      Record,
      RecordValue,
      OrganisationUnit,
      User,
      TrainingSessionAccess,
    ]),
  ],
  controllers: [
    TrainingCurriculumController,
    TrainingTopicController,
    TrainingSectionController,
    TrainingSessionController,
    TrainingSponsorController,
    TrainingTrainerController,
    TrainingUnitController,
    TrainingVenueController,
    TrainingController,
  ],
  providers: [
    TrainingCurriculumService,
    TrainingTopicService,
    TrainingSectionService,
    TrainingSessionService,
    TrainingSponsorService,
    TrainingTrainerService,
    TrainingUnitService,
    TrainingVenueService,
    TrainingService,
  ],
})
export class TrainingModule {}
