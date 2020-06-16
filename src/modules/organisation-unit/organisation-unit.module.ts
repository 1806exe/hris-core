import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganisationUnitsController } from './controllers/organisation-unit.controller';
import { OrganisationUnitGroupSet } from './entities/organisation-unit-group-set.entity';
import { OrganisationUnitGroup } from './entities/organisation-unit-group.entity';
import { OrganisationUnit } from './entities/organisation-unit.entity';
import { OrganisationUnitService } from './services/organisation-unit.service';
import { OrganisationUnitGroupController } from './controllers/organisation-unit-group.controller';
import { OrganisationUnitGroupService } from './services/organisation-unit-group.service';
import { OrganisationUnitGroupSetController } from './controllers/organisation-unit-group-set.controller';
import { OrganisationUnitGroupSetService } from './services/organisation-unit-group-set.service';
import { OrganisationUnitCompleteness } from './entities/organisation-unit-completeness.entity';
import { OrganisationUnitCompletenessController } from './controllers/organisation-unit-completeness.controller';
import { OrganisationUnitCompletenessService } from './services/organisation-unit-completeness.service';
import { OrganisationUnitLevel } from './entities/organisation-unit-level.entity';
import { OrganisationUnitLevelController } from './controllers/organisation-unit-level.controller';
import { OrganisationUnitLevelService } from './services/organisation-unit-level.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([
      OrganisationUnit,
      OrganisationUnitGroup,
      OrganisationUnitGroupSet,
      OrganisationUnitCompleteness,
      OrganisationUnitLevel,
    ]),
  ],
  controllers: [
    OrganisationUnitsController,
    OrganisationUnitGroupController,
    OrganisationUnitGroupSetController,
    OrganisationUnitCompletenessController,
    OrganisationUnitLevelController,
  ],
  providers: [
    OrganisationUnitService,
    OrganisationUnitGroupService,
    OrganisationUnitGroupSetService,
    OrganisationUnitCompletenessService,
    OrganisationUnitLevelService,
  ],
  exports: [OrganisationUnitLevelService, OrganisationUnitService],
})
export class OrganisatinUnitModule {}
