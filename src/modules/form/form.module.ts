import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldGroupSetController } from './controllers/field-group-set.controller';
import { FieldGroupController } from './controllers/field-group.controller';
import { FieldOptionChildrenController } from './controllers/field-option-children.controller';
import { FieldOptionGroupSetController } from './controllers/field-option-group-set.controller';
import { FieldOptionGroupController } from './controllers/field-option-group.controller';
import { FieldOptionMergeController } from './controllers/field-option-merge.controller';
import { FieldOptionController } from './controllers/field-option.controller';
import { FieldRelationController } from './controllers/field-relation.controller';
import { FieldController } from './controllers/field.controller';
import { FormFieldMemberController } from './controllers/form-field-member.controller';
import { FormSectionController } from './controllers/form-section.controller';
import { FormVisibleFieldController } from './controllers/form-visible-fields.controller';
import { FormController } from './controllers/form.controller';
import { FormSectionFieldMemberController } from './controllers/formsection-fieldmembers.controller';
import { SqlViewController } from './controllers/sql-view-controller';
import { FieldGroup } from './entities/field-group.entity';
import { FieldGroupSet } from './entities/field-groupset.entity';
import { FieldOptionChildren } from './entities/field-option-children.entity';
import { FieldOptionGroupSet } from './entities/field-option-group-set.entity';
import { FieldOptionGroup } from './entities/field-option-group.entity';
import { FieldOptionMerge } from './entities/field-option-merge.entity';
import { FieldOption } from './entities/field-option.entity';
import { FieldRelation } from './entities/field-relation.entity';
import { Field } from './entities/field.entity';
import { FormFieldMember } from './entities/form-field-member.entity';
import { FormSection } from './entities/form-section.entity';
import { FormVisibleField } from './entities/form-visible-fields.entity';
import { Form } from './entities/form.entity';
import { FormSectionFieldMember } from './entities/formsection-fieldmembers.entity';
import { SqlView } from './entities/sqlview.entity';
import { FieldGroupSetService } from './services/field-group-set.service';
import { FieldGroupService } from './services/field-group.service';
import { FieldOptionChildrenService } from './services/field-option-children.service';
import { FieldOptionGroupSetService } from './services/field-option-group-set.service';
import { FieldOptionGroupService } from './services/field-option-group.service';
import { FieldOptionMergeService } from './services/field-option-merge.service';
import { FieldOptionService } from './services/field-option.service';
import { FieldRelationService } from './services/field-relation.service';
import { FieldService } from './services/field.service';
import { FormFieldMemberService } from './services/form-field-member.service';
import { FormSectionService } from './services/form-section.service';
import { FormVisibleFieldService } from './services/form-visible-fields.service';
import { FormService } from './services/form.service';
import { FormSectionFieldMemberService } from './services/formsection-fieldmembers.service';
import { SqlViewService } from './services/sql-view.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([
      Field,
      FieldGroup,
      FieldGroupSet,
      FieldOption,
      FieldOptionChildren,
      FieldOptionGroup,
      FieldOptionGroupSet,
      FieldOptionMerge,
      FieldRelation,
      FormFieldMember,
      FormSection,
      FormVisibleField,
      Form,
      FormSectionFieldMember,
      SqlView,
    ]),
  ],
  controllers: [
    FieldController,
    FieldGroupController,
    FieldGroupSetController,
    FieldOptionController,
    FieldOptionChildrenController,
    FieldOptionGroupController,
    FieldOptionGroupSetController,
    FieldOptionMergeController,
    FieldRelationController,
    FormFieldMemberController,
    FormSectionController,
    FormVisibleFieldController,
    FormController,
    FormSectionFieldMemberController,

    SqlViewController,
  ],
  providers: [
    FieldService,
    FieldGroupService,
    FieldGroupSetService,
    FieldOptionService,
    FieldOptionChildrenService,
    FieldOptionGroupService,
    FieldOptionGroupSetService,
    FieldOptionMergeService,
    FieldRelationService,
    FormService,
    FormFieldMemberService,
    FormSectionService,
    FormVisibleFieldService,
    FormSectionFieldMemberService,
    SqlViewService,
  ],
})
export class FormModule {}
