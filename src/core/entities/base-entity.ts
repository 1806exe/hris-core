import { BaseEntity } from 'typeorm';

export class HRISBaseEntity extends BaseEntity {
  static plural: string;

  toResponseObject() {
    console.log(this);
    return this;
  }
}
