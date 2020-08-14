export function getISOOrgUnits(ou, user) {
  if(ou.length == 0){
    ou = ['USER_ORGUNIT'];
  }
  ou = ou.map((o) => o.trim());
  let ouIds = ou.filter(
    (ouId) =>
      ouId.trim().indexOf('LEVEL-') === -1 &&
      ouId.trim().indexOf('OU_GROUP-') === -1 &&
      ouId.trim().indexOf('USER_ORGUNIT') === -1,
  );
  ou.forEach((orgU) => {
    if (orgU.trim() === 'USER_ORGUNIT') {
      ouIds = ouIds.concat(
        user.organisationUnits.map((orgUnit) => orgUnit.uid),
      );
    }
  });
  return ouIds;
}

export function generateOUFilterQuery(ousAlias, ou, orgUnitLevels, user) {
  ou = ou.map((o) => o.trim());
  let ouIds = ou.filter(
    (ouId) =>
      ouId.indexOf('LEVEL-') === -1 &&
      ouId.indexOf('OU_GROUP-') === -1 &&
      ouId.indexOf('USER_ORGUNIT') === -1,
  );
  ou.forEach((orgU) => {
    if (orgU === 'USER_ORGUNIT') {
      ouIds = ouIds.concat(
        user.organisationUnits.map((orgUnit) => orgUnit.uid),
      );
    }
  });
  const ouLevelIds = ou.filter((ouId) => ouId.indexOf('LEVEL-') > -1);
  const ouGroupIds = ou.filter((ouId) => ouId.indexOf('OU_GROUP-') > -1);
  const ouQuery = orgUnitLevels.map(
    (orgUnitLevel) =>
      `${ousAlias}.uidlevel${orgUnitLevel.level} IN ('${ouIds.join("','")}')`,
  );

  const levelQuery = ouLevelIds.map(
    (orgUnitLevel) =>
      `${ousAlias}.level = ${orgUnitLevel.substring(6)}`,
  );

  const groupQuery = ouGroupIds.map(
    (ouGroupId) => `${ousAlias}."${ouGroupId.substring(9)}" = TRUE`,
  );

  let queryFilter = '(' + ouQuery.join(' OR ') + ')';

  if (queryFilter !== '' && levelQuery.length > 0) {
    queryFilter += ' AND ';
    queryFilter += '(' + levelQuery.join(' OR ') + ')';
  }

  if (queryFilter !== '' && groupQuery.length > 0) {
    queryFilter += ' AND ';
    queryFilter += '(' + groupQuery.join(' OR ') + ')';
  }

  return queryFilter;
}
