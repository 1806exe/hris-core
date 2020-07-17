import { getWhereConditions } from '../../../src/core/utilities/get-where-conditions.utility';

describe('Testing Fields Convertion on API', () => {
  it('Testing Equality', () => {
    let filters: any = getWhereConditions('id:eq:theid');
    console.log(filters);
    expect(filters[0].uid).toEqual('theid');
  });
  it('Testing Contains', () => {
    let filters: any = getWhereConditions('id:in:[uids]');
    console.log(filters);
    expect(filters[0].uid).toContain('uids');
  });
});
