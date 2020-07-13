export function getISOPeriods(periods) {
  //TODO handle all relative periods
  let returnPeriods = [];
  periods.forEach((period) => {
    if (period === 'LAST_10_YEARS') {
      for (
        let i = new Date().getFullYear() - 10;
        i < new Date().getFullYear();
        i++
      ) {
        returnPeriods.push('' + i);
      }
    } else if (period === 'THIS_YEAR') {
      returnPeriods.push('' + new Date().getFullYear());
    } else if (period === 'LAST_YEAR') {
      returnPeriods.push('' + (new Date().getFullYear() - 1));
    } else if (period === 'LAST_12_MONTHS') {
      let date = new Date();
      for (let i = 1; i <= 12; i++) {
        date.setMonth(date.getMonth() - 1);
        let month: any = date.getMonth() + 1;
        if (month < 9) {
          month = '0' + month;
        }
        returnPeriods.push(date.getFullYear() + '' + month);
      }
    } else {
      returnPeriods.push(period);
    }
  });
  return returnPeriods;
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
