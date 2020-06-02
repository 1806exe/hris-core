import { Injectable, Logger } from '@nestjs/common';
import {
  DeleteResult,
  Repository,
  UpdateResult,
  FindConditions,
} from 'typeorm';

import { getWhereConditions } from '../utilities';
import { getRelations, getSelections } from '../utilities/get-fields.utility';
import { HRISBaseEntity } from '../entities/base-entity';
import { UIDToIDResolver } from '../resolvers/uid-to-id.resolver';
import { entityTableMapper } from '../resolvers/database-table.resolver';
import { isArray } from 'util';
import * as _ from 'lodash';

// class Factory {
//   create<T>(type: (new () => T)): T {
//     return new type();
//   }
// }

@Injectable()
export class BaseService<T extends HRISBaseEntity> {
  constructor(
    private readonly modelRepository: Repository<T>,
    private readonly Model,
  ) {}

  async findAll(): Promise<T[]> {
    const results = await this.modelRepository.find();

    return results;
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

    let join: any = {};

    // TODO: Find best way to join any recursive relation
    if (metaData.tableName === 'organisationunit') {
      join = {
        alias: 'organisationunit',
        leftJoinAndSelect: {
          profile: 'organisationunit.parent',
        },
      };
    }
    return await this.modelRepository.findAndCount({
      select: getSelections(fields, metaData),
      relations: getRelations(fields, metaData),
      join,
      where: getWhereConditions(filter),
      skip: page * size,
      take: size,
    });
  }

  /**
   *
   * @param entity
   */
  async findOneByUid(uid: string): Promise<T> {
    return await this.modelRepository.findOne({ where: { uid } });
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
   * @param data
   * @param modelTarget
   */
  saveEntity(data, modelTarget) {
    const model = new modelTarget();
    const metaData = this.modelRepository.manager.connection.getMetadata(
      this.Model,
    );
    const savedEntity = model.save();
    Object.keys(data).forEach(key => {
      if (
        metaData.relations
          .map(item => {
            return item.propertyName;
          })
          .indexOf(key) > -1
      ) {
        metaData.relations
          .filter(item => {
            return item.propertyName === key;
          })
          .forEach(item => {
            if (item.relationType === 'one-to-many') {
              data[key].forEach(child => {
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
    // var metaData = this.modelRepository.manager.connection.getMetadata(this.model);
    // var savedEntity = entity;
    // model = {...model, ...entity};
    Object.keys(entity).forEach(key => {
      model[key] = entity[key];
    });

    // return model.save();
    return await this.modelRepository.save(model);
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
   * @param dataModel
   */
  async update(dataModel: any): Promise<UpdateResult> {
    if (dataModel) {
      dataModel.id = parseInt(dataModel.id);
      return await this.modelRepository.save(dataModel);
    }
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<any> {
    const condition: any = { uid:id };
    if (id) {
      return this.modelRepository.delete(condition);
    }
  }

  /**
   *
   * @param entityRelationProps
   * @param key
   */
  async getRelationUids(entityRelationProps: any[], key: string): Promise<any> {
    return Promise.all(
      await _.map(
        entityRelationProps[key],
        async (relationObj: any): Promise<any> => {
          const relationUids = await UIDToIDResolver(
            relationObj.uid,
            this.modelRepository,
            entityTableMapper[key],
          );
          return await relationUids;
        },
      ),
    );
  }

  /**
   *
   * @param entityUpdates
   * @param entity
   */
  async EntityUidResolver(entityUpdates: any, entity: any) {
    if (entityUpdates) {
      let id = entity.id;
      entity = { ...entity, id: entity.id };
      const objectKeys = Object.keys(entityUpdates);
      const relationUIDs = await Promise.all(
        await _.map(
          objectKeys,
          async (key: string): Promise<any> => {
            if (isArray(entityUpdates[key])) {
              const result = await this.getRelationUids(entityUpdates, key);
              entity[key] = [
                ...entity[key],
                ...(await this.getRelationUids(entityUpdates, key)),
              ];
              if (result) {
                return await this.getRelationUids(entityUpdates, key);
              }
            } else {
              if (_.has(entityUpdates, key) && _.has(entity, key)) {
                entity[key] = entityUpdates[key];
              }
            }
          },
        ),
      );
      entity.id = id;
      return _.flatten(_.filter(relationUIDs, uid => uid === 0 || Boolean(uid)))
        .length >= 1
        ? entity
        : entity;
    }
  }
}
