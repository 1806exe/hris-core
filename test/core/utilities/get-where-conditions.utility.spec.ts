import { getWhereConditions } from '../../../src/core/utilities/get-where-conditions.utility';

describe('Testing Fields Convertion on API', () => {
  it('Testing Equality', () => {
    let filters: any = getWhereConditions('id:eq:id');
    console.log(filters);
    expect(filters[0].uid).toEqual('id');
  });
  it('Testing Contains', () => {
    let filters: any = getWhereConditions('id:in:[id,id]');
    expect(filters[0].uid._type).toContain(('in'));
  })
})
