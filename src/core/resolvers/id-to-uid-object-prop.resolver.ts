import * as _ from 'lodash';
export async function IDTOUIDObjectPropsResolver(payload: any) {
    let mPayload = {};
    if (payload) {
        _.forEach(_.keys(payload), (key: string) => {
            if (isArray(payload[key])) {
                mPayload = {
                    ...mPayload,
                    [key]: getArrayOfRenamedObjectProp(payload[key]),
                };
            } else if (isObject(payload[key])) {
                mPayload = {
                    ...mPayload,
                    [key]: _.mapKeys(payload[key], (value: string, pos: string) => {
                        return pos === 'id' ? 'uid' : [pos];
                    }),
                };
            } else {
                mPayload =
                    key === 'id'
                        ? { ...mPayload, uid: payload[key] }
                        : { ...mPayload, [key]: payload[key] };
            }
        });
        return mPayload;
    } else {
        return 'No payload supplied';
    }
}

function getArrayOfRenamedObjectProp(dataArray) {
    if (isArray(dataArray)) {
        return _.map(dataArray, data => {
            return renameObjectPropIdToUid(data);
        });
    }
}

function renameObjectPropIdToUid(obj) {
    return obj
        ? _.mapKeys(obj, (value: string, key: string) => {
            return key === 'id' ? 'uid' : [key];
        })
        : {};
}

function isArray(dataObject) {
    return dataObject.constructor.name === 'Array'
        ? dataObject.constructor.name === 'Array'
        : false;
}

function isObject(dataObject) {
    return dataObject.constructor.name === 'Object'
        ? dataObject.constructor.name === 'Object'
        : false;
}
