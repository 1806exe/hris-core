import { EntityCoreProps } from '../../../core/entities/entity-core-props';
import { Column, Entity } from 'typeorm';

@Entity('trainingtrainer', { schema: 'public' })
export class TrainingTrainer extends EntityCoreProps {
  static plural = 'trainers';
  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'trainingtrainerid',
  })
  id: number;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'firstname',
  })
  firstName: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'middlename',
  })
  middleName: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'lastname',
  })
  lastName: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'primaryjobresponsibility',
  })
  primaryJobResponsibility: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'secondaryjobresponsibility',
  })
  secondaryJobResponsibility: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'profession',
  })
  profession: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'currentjobtitle',
  })
  currentJobTitle: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'placeofwork',
  })
  placeOfWork: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'organisationtype',
  })
  organisationType: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'trainertype',
  })
  trainerType: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'trainerlanguage',
  })
  trainerLanguage: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'traineraffiliation',
  })
  trainerAffiliation: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'experience',
  })
  experience: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'highestlevelofqualification',
  })
  highestLevelOfQualification: string;
}
