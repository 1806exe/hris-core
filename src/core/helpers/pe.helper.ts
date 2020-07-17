import { Period } from '@iapps/period-utilities';
import { flatten } from 'lodash';
export function getISOPeriods(periods: string[]) {
  return flatten(
    periods.map((period: string) => {
      const periodInstance = new Period();
      const periodObject = periodInstance.getById(period);
      return periodObject ? periodObject.iso || periodObject : null;
    }),
  );
}
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export function getPeriodDetails(pe) {
  //TODO Capture all types of periods
  if (pe.length == 6) {
    return {
      name: monthNames[parseInt(pe.substr(4)) - 1] + ' ' + pe.substr(0, 4),
    };
  } else {
    return {
      name: pe,
    };
  }
}
