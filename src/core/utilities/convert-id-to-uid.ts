import { isArray, isPlainObject, keys, map, omit } from 'lodash';
import { Logger } from '@nestjs/common';

export const convertIdToUid: any = (responseObject: any) => {
  const newResponseObject = { uid: responseObject.id || responseObject.uid };
  const attributeKeys = keys(omit(responseObject, ['id', 'uid'])) || [];

  attributeKeys.forEach((attributeKey) => {
    const attributeValue = responseObject[attributeKey];

    if (attributeValue) {
      if (typeof attributeValue === 'object') {
        if (isArray(attributeValue)) {
          newResponseObject[attributeKey] = map(attributeValue, convertIdToUid);
        } else {
          console.log(attributeKey);
          console.log(attributeValue);
          if (isNaN(Date.parse(attributeValue))) {
            newResponseObject[attributeKey] = convertIdToUid(attributeValue);
          } else {
            newResponseObject[attributeKey] = attributeValue;
          }
        }
      } else {
        newResponseObject[attributeKey] = attributeValue;
      }
    }
  });

  return newResponseObject;
};
