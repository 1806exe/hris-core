import { EntityMetadata } from 'typeorm';
import { Logger } from '@nestjs/common';

export function getSelections(fields: any, metaData: EntityMetadata): any {
  if (fields) {
    fields = fields.split('*').join(
      metaData.columns
        .map(metadataColumn => {
          return metadataColumn.propertyName;
        })
        .join(','),
    );
    let resutls = fields.split(',').filter(item => {
      return (
        item.indexOf('[') === -1 &&
        metaData.columns
          .map(metadataColumn => {
            return metadataColumn.propertyName;
          })
          .indexOf(item) > -1
      );
    });
    if(resutls.indexOf('id') > -1){
      resutls.push('uid');
    }
    if(resutls.indexOf('id') === -1){
      resutls.push('id');
    }
    return resutls;
  } else {
    return null;
  }
}

function evaluateRelations(fields, results, metaData: EntityMetadata) {
  results = results.concat(
    fields.split(',').filter(item => {
      return (
        metaData.relations
          .map(metadataRelation => {
            return metadataRelation.propertyName;
          })
          .indexOf(item) > -1
      );
    }),
  );
  // results = results.concat(
  //   fields.split(',').filter(item => {
  //     return (
  //       metaData.relations
  //         .map(metadataRelation => {
  //           return metadataRelation.propertyName;
  //         })
  //         .indexOf(item) > -1
  //     );
  //   }),
  // );

  /*results = results
    .concat(
      fields.split(',').filter(item => {
        return item.indexOf('[') > -1;
      }),
    )
    .map(item => {
      const newFields = item.substring(
        item.indexOf('[') + 1,
        item.substring(0, item.indexOf('[')).length - 1,
      );
      const relation = item.substring(0, item.indexOf('['));
      const relations = metaData.relations.filter(metadataRelation => {
        return metadataRelation.propertyName === relation;
      });
      if (relations.length === 1) {
        results = results.concat(
          evaluateRelations(
            newFields,
            results,
            relations[0].entityMetadata,
          ).map(rel => {
            return relation + '.' + rel;
          }),
        );
      }
      return relation;
    });*/
  return results;
}
export function getRelations(fields: any, metaData: EntityMetadata): any {
  if (fields) {
    let results = [];

    // results = results.concat(
    //   fields.split(',').filter(item => {
    //     return (
    //       metaData.relations
    //         .map(relation => {
    //           return relation.propertyName;
    //         })
    //         .indexOf(item) > -1
    //     );
    //   }),
    // );
    results = results
      .concat(
        fields.split(',').filter(item => {
          return item.indexOf('[') > -1;
        }),
      )
      .map(item => {
        item.substring(
          item.indexOf('[') + 1,
          item.substring(0, item.indexOf('[')).length - 1,
        );
        return item.substring(0, item.indexOf('['));
      });

    results = evaluateRelations(fields, results, metaData);

    return results;
  } else {
    return [];
  }
}
