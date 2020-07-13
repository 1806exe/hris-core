import { isArray, keys, map, omit } from 'lodash';
import { Logger } from '@nestjs/common';

export const sanitizeResponseObject: any = (responseObject: any) => {
  const newResponseObject = { id: responseObject.uid };
  const attributeKeys = keys(omit(responseObject, ['id', 'uid'])) || [];

  attributeKeys.forEach(attributeKey => {
    const attributeValue = responseObject[attributeKey];

    if (attributeValue) {
      if (typeof attributeValue === 'object') {
        if (isArray(attributeValue)) {
          newResponseObject[attributeKey] = map(
            attributeValue,
            sanitizeResponseObject,
          );
        } else {
          if (isNaN(Date.parse(attributeValue))) {
            newResponseObject[attributeKey] = sanitizeResponseObject(
              attributeValue,
            );
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
