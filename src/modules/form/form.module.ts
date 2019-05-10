import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldService } from './services/field.service';
import { FieldGroupService } from './services/field-group.service';
import { FieldGroupsetService } from './services/field-groupset.service';
import { FieldInputTypeService } from './services/field-input-type.service';
import { FieldMemberService } from './services/field-member.service';
import { FieldOptionService } from './services/field-option.service';
import { FieldOptionChildrenService } from './services/field-option-children.service';
import { FieldOptionGroupService } from './services/field-option-group.service';
import { FieldOptionGroupsetService } from './services/field-option-groupset.service';
import { FieldOptionMergeService } from './services/field-option-merge.service';
import { FieldRelationService } from './services/field-relation.service';
import { FormService } from './services/form.service';
import { FormFieldMemberService } from './services/form-field-member.service';
import { FormSectionService } from './services/form-section.service';
import { FormVisibleFieldsService } from './services/form-visible-fields.service';
import { FormsectionFieldmembersService } from './services/formsection-fieldmembers.service';
import { FieldDatatypeController } from './controllers/field-datatype.controller';
import { FieldGroupController } from './controllers/field-group.controller';
import { FieldGroupsetController } from './controllers/field-groupset.controller';
import { FieldInputTypeController } from './controllers/field-input-type.controller';
import { FieldOptionChildrenController } from './controllers/field-option-children.controller';
import { FieldOptionGroupController } from './controllers/field-option-group.controller';
import { FieldOptionGroupsetController } from './controllers/field-option-groupset.controller';
import { FieldOptionMergeController } from './controllers/field-option-merge.controller';
import { FieldOptionController } from './controllers/field-option.controller';
import { FieldRelationController } from './controllers/field-relation.controller';
import { FieldController } from './controllers/field.controller';
import { FormFieldMemberController } from './controllers/form-field-member.controller';
import { FormSectionController } from './controllers/form-section.controller';
import { FormVisibleFieldsController } from './controllers/form-visible-fields.controller';
import { FormController } from './controllers/form.controller';
import { FormsectionFieldmembersController } from './controllers/formsection-fieldmembers.controller';
import { FieldDataType } from './entities/field-datatype.entity';
import { FieldGroup } from './entities/field-group.entity';
import { FieldGroupSet } from './entities/field-groupset.entity';
import { FieldInputType } from './entities/field-input-type.entity';
import { FieldOptionChildren } from './entities/field-option-children.entity';
import { FieldOptionGroup } from './entities/field-option-group.entity';
import { FieldOptionGroupSet } from './entities/field-option-groupset.entity';
import { FieldOptionMerge } from './entities/field-option-merge.entity';
import { FieldOption } from './entities/field-option.entity';
import { FieldRelation } from './entities/field-relation.entity';
import { Field } from './entities/field.entity';
import { FormFieldMember } from './entities/form-field-member.entity';
import { FormSection } from './entities/form-section.entity';
import { FormVisibleField } from './entities/form-visible-fields.entity';
import { Form } from './entities/form.entity';
import { FormSectionFieldMember } from './entities/formsection-fieldmembers.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'basic', session: true }),
    TypeOrmModule.forFeature([
      FieldDataType,
      FieldGroup,
      FieldGroupSet,
      FieldInputType,
      FieldOptionChildren,
      FieldOptionGroup,
      FieldOptionGroupSet,
      FieldOptionMerge,
      FieldOption,
      FieldRelation,
      Field,
      FormFieldMember,
      FormSection,
      FormVisibleField,
      Form,
      FormSectionFieldMember,
    ]),
  ],
  controllers: [
    FieldDatatypeController,
    FieldGroupController,
    FieldGroupsetController,
    FieldInputTypeController,
    FieldOptionChildrenController,
    FieldOptionGroupController,
    FieldOptionGroupsetController,
    FieldOptionMergeController,
    FieldOptionController,
    FieldRelationController,
    FieldController,
    FormFieldMemberController,
    FormSectionController,
    FormVisibleFieldsController,
    FormController,
    FormsectionFieldmembersController,
  ],
  providers: [
    FieldService,
    FieldGroupService,
    FieldGroupsetService,
    FieldInputTypeService,
    FieldMemberService,
    FieldOptionService,
    FieldOptionChildrenService,
    FieldOptionGroupService,
    FieldOptionGroupsetService,
    FieldOptionMergeService,
    FieldRelationService,
    FormService,
    FormFieldMemberService,
    FormSectionService,
    FormVisibleFieldsService,
    FormsectionFieldmembersService,
  ],
})
export class FormModule {}
