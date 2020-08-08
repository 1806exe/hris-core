import { BaseEntity } from 'typeorm';

export class HRISBaseEntity extends BaseEntity {
  static plural: string;

  toResponseObject() {
    return this;
  }
}
