import { extractAnalytics } from '../../../src/core/utilities/analytics-query-extractor';

describe('Testing Fields Convertion on API', () => {
    it('Testing Getting Selections', () => {
        //organisationUnit.con
        var results = extractAnalytics({ dimension: [ 'dx:uLhsWqITzfk6p', 'ou:USER_ORGUNIT ', 'pe:LAST_10_YEARS' ] });
        expect(results.dx.includes('uLhsWqITzfk6p')).toBe(true);
        expect(results.ou.includes('USER_ORGUNIT')).toBe(true);
        expect(results.pe.includes('LAST_10_YEARS')).toBe(true);
    });
});
