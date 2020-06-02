export function getISOPeriods(periods) {
    let returnPeriods = [];
    periods.forEach((period) => {
        if (period === 'LAST_10_YEARS') {
            for (let i = (new Date()).getFullYear() - 10; i < (new Date()).getFullYear(); i++) {
                returnPeriods.push("" + i);
            }
        } else if (period === 'THIS_YEAR') {
            returnPeriods.push("" + (new Date()).getFullYear());
        } else if (period === 'LAST_12_MONTHS') {
            let date = new Date();
            for (let i = 1; i <= 12; i++) {
                date.setMonth(date.getMonth() - 1);
                let month:any = date.getMonth() + 1;
                if(month < 9){
                    month = "0" + month;
                }
                returnPeriods.push(date.getFullYear() +"" + month);
            }
        } else {
            returnPeriods.push(period);
        }
    })
    return returnPeriods;
}