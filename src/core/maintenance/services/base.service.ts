import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  Repository,
  UpdateResult,
  FindConditions,
} from 'typeorm';

import * as _ from 'lodash';
import { HRISBaseEntity } from '../../../core/entities/base-entity';
import {
  getSelections,
  getRelations,
} from '../../../core/utilities/get-fields.utility';
import { getWhereConditions } from '../../../core/utilities';
import { entityTableMapper } from '../../../core/resolvers/database-table.resolver';
import { UIDToIDTransformation } from '@icodebible/utils/resolvers/uid-to-id';
import { ObjectPayloadUpdater } from '@icodebible/utils/resolvers/updater';
import { GetResponseSanitizer } from '@icodebible/utils/resolvers/id-to-uid';

// class Factory {
//   create<T>(type: (new () => T)): T {
//     return new type();
//   }
// }

@Injectable()
export class MaintenanceBaseService<T extends HRISBaseEntity> {
  constructor(
    protected readonly modelRepository: Repository<T>,
    private readonly Model,
  ) {}

  /**
   *
   */
  async findAll(): Promise<T[]> {
    /**
     *
     */
    return await GetResponseSanitizer(
      this.modelRepository,
      await this.modelRepository.find(),
      entityTableMapper,
    );
  }
  async getWhereNoPaging(filter, fields): Promise<T[]> {
    /*
     *
     */
    const metaData = this.modelRepository.manager.connection.getMetadata(
      this.Model,
    );
    /*
    let join: any = {};

    // TODO: Find best way to join any recursive relation
    if (metaData.tableName === 'organisationunit') {
      join = {
        alias: 'organisationunit',
        leftJoinAndSelect: {
          profile: 'organisationunit.parent',
        },
      };
    }*/
    /**
     *
     */
    return await GetResponseSanitizer(
      this.modelRepository,
      await this.modelRepository.find({
        where:
          filter && filter.includes('parent.id:eq')
            ? {
                parent: await this.modelRepository.findOne({
                  where: { uid: filter.replace(/^parent.id:eq:+/i, '') },
                }),
              }
            : getWhereConditions(filter),
        select: getSelections(fields, metaData),
        relations: getRelations(fields, metaData),
        // join,
      }),
      entityTableMapper,
    );
  }

  // TODO: Find best way to merge all find operations in single method so dynamic filters can be used for all
  async findIn(inConditions: { [attributeName: string]: string[] }) {
    const sanitizedConditions = _.flatten(
      _.keys(inConditions).map((conditionKey) => {
        return (inConditions[conditionKey] || []).map((conditionValue) => {
          return { [conditionKey]: conditionValue };
        });
      }),
    );

    const metaData = this.modelRepository.manager.connection.getMetadata(
      this.Model,
    );

    const relations = metaData.relations
      .map((relation) => {
        return relation.relationType === 'many-to-one'
          ? relation.propertyName
          : undefined;
      })
      .filter((propertyName) => propertyName);

    return await this.modelRepository.find({
      where: sanitizedConditions,
      relations,
    });
  }

  /**
   *
   * @param where
   */
  async findWhere(where: FindConditions<T>): Promise<T[]> {
    return await this.modelRepository.find({ where });
  }

  /**
   *
   * @param fields
   * @param filter
   * @param size
   * @param page
   */
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
    const [response, totalCount] = await this.modelRepository.findAndCount({
      select: getSelections(fields, metaData),
      relations: getRelations(fields, metaData),
      where: getWhereConditions(filter),
      join,
      take: size,
      skip: page * size,
    });

    /**
     *
     */

    return [
      await GetResponseSanitizer(
        this.modelRepository,
        response,
        entityTableMapper,
      ),
      totalCount,
    ];
  }

  /**
   *
   * @param entity
   */
  async findOneByUid(param: string | { id: string }): Promise<T> {
    /**
     *
     */
    const entity = await this.modelRepository.findOne({
      where: { uid: _.has(param, 'id') ? (param as { id: string }).id : param },
    });
    if ((this.modelRepository.metadata.tableName = 'user')) {
      return entity;
    } else {
      return entity;
    }
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

    const createdEntity = await this.modelRepository.save(transformedEntity);
    /*
     *    TODO: Delete password if entity is User
     */
    if ((this.modelRepository.metadata.tableName = 'user')) {
      delete createdEntity.password;
      return createdEntity;
    } else {
      return createdEntity;
    }
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
  /**
   *
   *
   * @param {*} entity
   * @param {*} updates
   * @returns {Promise<UpdateResult>}
   * @memberof MaintenanceBaseService
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
      const transformedEntity: any = await UIDToIDTransformation(
        this.modelRepository,
        resolvedEntityDTO,
        entityTableMapper,
      );
      /**
       *
       */
      const savedEntity = await this.modelRepository.save(transformedEntity);
      /*
       *    TODO: Delete password if entity is User
       */
      if ((this.modelRepository.metadata.tableName = 'user')) {
        delete savedEntity.password;
        return savedEntity;
      } else {
        return savedEntity;
      }
    }
  }

  /**
   *
   * @param id
   */
  async delete(id: string): Promise<DeleteResult> {
    /**
     *
     */
    const condition: any = { id };
    /**
     *
     */
    if (condition) {
      /**
       *
       */
      return this.modelRepository.delete(condition);
    }
  }
}
