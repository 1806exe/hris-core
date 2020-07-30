import { extractAnalytics } from '../../../src/core/utilities/analytics-query-extractor';

describe('Testing Fields Convertion on API', () => {
    it('Testing Getting Single Selections', () => {
        //organisationUnit.con
        var results = extractAnalytics({ dimension: 'dx:uLhsWqITzfk6p'});
        expect(results.dx.includes('uLhsWqITzfk6p')).toBe(true);
    });
    it('Testing Getting Selections', () => {
        //organisationUnit.con
        var results = extractAnalytics({ dimension: [ 'dx:uLhsWqITzfk6p', 'ou:USER_ORGUNIT ', 'pe:LAST_10_YEARS' ] });
        expect(results.dx.includes('uLhsWqITzfk6p')).toBe(true);
        expect(results.ou.includes('USER_ORGUNIT')).toBe(true);
        expect(results.pe.includes('LAST_10_YEARS')).toBe(true);
    });
    it('Testing Getting Date Selections', () => {
        //organisationUnit.con
        var results = extractAnalytics({ dimension: [ 'startDate:2020-02-19', 'endDate:2020-02-19' ] });
        expect(results.startDate.includes('2020-02-19')).toBe(true);
        expect(results.endDate.includes('2020-02-19')).toBe(true);
    });
    it('Testing Getting Other Selections', () => {
        //organisationUnit.con
        var results = extractAnalytics({ dimension: [ '36486234', '89374938475:data', '8937475:eq:data' ] });
        expect(results.other['36486234']).toBeDefined();
        expect(results.other['89374938475']).toBe('data');
        expect(results.other['8937475']).toBeDefined();
        expect((<Comparison>results.other['8937475']).left).toBe('8937475');
        expect((<Comparison>results.other['8937475']).operator).toBe('eq');
        expect((<Comparison>results.other['8937475']).right).toBe('data');
    });
});
