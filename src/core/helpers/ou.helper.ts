export function getISOOrgUnits(ou, user) {
  let ouIds = ou.filter(
    (ouId) =>
      ouId.indexOf('LEVEL-') === -1 &&
      ouId.indexOf('OU_GROUP-') === -1 &&
      ouId.indexOf('USER_ORGUNIT') === -1,
  );
  ou.forEach((orgU) => {
    if (orgU === 'USER_ORGUNIT') {
      console.log(user.organisationUnits);
      console.log(user.organisationUnits);
      ouIds = ouIds.concat(user.organisationUnits.map((orgUnit) => orgUnit.id));
    }
  });
  return ouIds;
}

export function generateOUFilterQuery(ousAlias, ou, orgUnitLevels, user) {
  let ouIds = ou.filter(
    (ouId) =>
      ouId.indexOf('LEVEL-') === -1 &&
      ouId.indexOf('OU_GROUP-') === -1 &&
      ouId.indexOf('USER_ORGUNIT') === -1,
  );
  ou.forEach((orgU) => {
    if (orgU === 'USER_ORGUNIT') {
      ouIds = ouIds.concat(user.organisationUnits.map((orgUnit) => orgUnit.id));
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
      `${ousAlias}.uidlevel${orgUnitLevel.substring(6)} IS NOT NULL`,
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
