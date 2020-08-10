import { extractAnalytics } from '../../../src/core/utilities/analytics-query-extractor';
import { Comparison } from '../../../src/core/interfaces/analytics-dimensions';

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
        var results = extractAnalytics({ dimension: [ '36486234', '89374938475:data', '8937475:eq:data', 'certification:in:certified', 'sections:in:5bbb3b99369cb' ] });
        expect(results.other['36486234']).toBeDefined();
        expect(results.other['89374938475']).toBe('data');
        expect(results.other['8937475']).toBeDefined();
        expect((<Comparison>results.other['8937475']).left).toBe('8937475');
        expect((<Comparison>results.other['8937475']).operator).toBe('eq');
        expect((<Comparison>results.other['8937475']).right).toBe('data');

        expect((<Comparison>results.certification).left).toBe('certification');
        expect((<Comparison>results.certification).operator).toBe('in');
        expect((<Comparison>results.certification).right).toBe('certified');

        expect((<Comparison>results.sections).left).toBe('sections');
        expect((<Comparison>results.sections).operator).toBe('in');
        expect((<Comparison>results.sections).right).toBe('5bbb3b99369cb');
    });
});
