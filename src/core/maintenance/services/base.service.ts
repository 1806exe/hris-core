import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  Repository,
  UpdateResult,
  FindConditions,
} from 'typeorm';

import * as _ from 'lodash';
import { HRISBaseEntity } from 'src/core/entities/base-entity';
import {
  getSelections,
  getRelations,
} from 'src/core/utilities/get-fields.utility';
import { getWhereConditions } from 'src/core/utilities';
import { entityTableMapper } from 'src/core/resolvers/database-table.resolver';
import { UIDToIDTransformation } from '@icodebible/utils/resolvers/uid-to-id';
import { ObjectPayloadUpdater } from '@icodebible/utils/resolvers/updater';

// class Factory {
//   create<T>(type: (new () => T)): T {
//     return new type();
//   }
// }

@Injectable()
export class MaintenanceBaseService<T extends HRISBaseEntity> {
  constructor(
    private readonly modelRepository: Repository<T>,
    private readonly Model,
  ) {}

  async findAll(): Promise<T[]> {
    return await this.modelRepository.find();
  }

  // TODO: Find best way to merge all find operations in single method so dynamic filters can be used for all
  async findIn(inConditions: { [attributeName: string]: any[] }) {
    return await this.modelRepository.find(inConditions);
  }

  /**
   *
   * @param where
   */
  async findWhere(where: FindConditions<T>): Promise<T[]> {
    return await this.modelRepository.find({ where });
  }

  async findAndCount(fields, filter, size, page): Promise<[T[], number]> {
    const metaData = this.modelRepository.manager.connection.getMetadata(
      this.Model,
    );

    return await this.modelRepository.findAndCount({
      select: getSelections(fields, metaData),
      relations: getRelations(fields, metaData),
      where: getWhereConditions(filter),
      take: size,
      skip: page * size,
    });
  }

  /**
   *
   * @param entity
   */
  async findOneByUid(param: any): Promise<T> {
    /**
     *
     */
    return await this.modelRepository.findOne({
      where: { uid: _.has(param, 'id') ? param.id : undefined },
    });
  }

  /**
   *
   * @param id
   */
  async findOneById(id: string): Promise<T> {
    return await this.modelRepository.findOne({ where: { id } });
  }

  /**
   *
   * @param name
   */
  async findOneByName(name: string): Promise<T[]> {
    return await this.modelRepository.find({ where: { name } });
  }

  /**
   *
   * @param data
   * @param modelTarget
   */
  saveEntity(data, modelTarget) {
    const model = new modelTarget();
    const metaData = this.modelRepository.manager.connection.getMetadata(
      this.Model,
    );
    const savedEntity = model.save();
    Object.keys(data).forEach((key) => {
      if (
        metaData.relations
          .map((item) => {
            return item.propertyName;
          })
          .indexOf(key) > -1
      ) {
        metaData.relations
          .filter((item) => {
            return item.propertyName === key;
          })
          .forEach((item) => {
            if (item.relationType === 'one-to-many') {
              data[key].forEach((child) => {
                savedEntity[key].push(this.saveEntity(child, item.target));
              });
            }
            // return {
            //   propertyName: item.propertyName,
            //   relationType: item.relationType,
            //   target: item.target,
            // }
          });
      } else {
        model[key] = data[key];
      }
    });
    return savedEntity;
  }

  /**
   *
   * @param entity
   */
  async create(entity: any): Promise<any> {
    const model = new this.Model();
    const savedEntity = _.merge(model, entity);
    const objModel = await UIDToIDTransformation(
      this.modelRepository,
      savedEntity,
      entityTableMapper,
    );
    const transformedEntity = _.merge(savedEntity, objModel);
    return await this.modelRepository.save(transformedEntity);
  }

  /**
   *
   * @param condType
   * @param condValue
   * @param model
   */
  // ToDO: To Be Tested And Further Reseached For Expected Results
  async updateByUID(uid: string, model: any): Promise<UpdateResult> {
    const condition: any = { uid };
    if (condition) {
      return await this.modelRepository.update(condition, model);
    }
  }

  /**
   *
   * @param entity
   * @param updates
   */
  async update(entity: any, updates: any): Promise<UpdateResult> {
    /**
     *
     */
    if (entity && updates) {
      /**
       *
       */
      const resolvedEntityDTO: any = await ObjectPayloadUpdater(
        entity,
        updates,
      );
      /**
       *
       */
      const transformedEntity: any = await UIDToIDTransformation(
        this.modelRepository,
        resolvedEntityDTO,
        entityTableMapper,
      );
      /**
       *
       */
      return await this.modelRepository.save(transformedEntity);
    }
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<DeleteResult> {
    const condition: any = { id };
    if (condition) {
      return this.modelRepository.delete(condition);
    }
  }
}
