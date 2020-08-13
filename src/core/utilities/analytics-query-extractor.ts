import { AnalyticsDimensions } from "../interfaces/analytics-dimensions";

export const extractAnalytics = (
  query: any,
): AnalyticsDimensions => {
  let analyticsDimensions:AnalyticsDimensions ={
    pe:[],
    ou:[],
    dx:[],
    startDate:'',
    endDate:'',
    other:{}
  }
  if (!Array.isArray(query.dimension)) {
    query.dimension = [query.dimension];
  }
  query.dimension.forEach((dimension) => {
    dimension = dimension.trim();
    let split = dimension.split(':');
    if (split[0] === 'pe') {
      analyticsDimensions.pe = analyticsDimensions.pe.concat(split[1].split(';'));
    } else if (split[0] === 'ou') {
      analyticsDimensions.ou = analyticsDimensions.ou.concat(split[1].split(';'));
    } else if (split[0] === 'dx') {
      analyticsDimensions.dx = analyticsDimensions.dx.concat(split[1].split(';'));
    } else if (split[0] === 'startDate') {
      analyticsDimensions.startDate = split[1];
    } else if (split[0] === 'endDate') {
      analyticsDimensions.endDate = split[1];
    } else {
      if(split[1]){
        if([
          'certification',
          'sections',
          'unit',
          'units',
          'curriculum',
          'curriculums',
          'topic',
          'topics',
          'sponsor',
          'sponsors',
          'organizers',
          'deliverymode'
        ].indexOf(split[0]) > -1){
          analyticsDimensions[(['unit','curriculum', 'topic','sponsor'].indexOf(split[0]) > -1?split[0]+'s':split[0])] = {
            left:split[0],
            operator:split[1],
            right:split[2]
          };
        }else{
          if(split[2]){
            analyticsDimensions.other[split[0]] = {
              left:split[0],
              operator:split[1],
              right:split[2]
            };
          }else{
            analyticsDimensions.other[split[0]] = split[1];
          }
        }
        
      }else{
        analyticsDimensions.other[split[0]] = '';
      }
    }
  });
  if (query.filter) {
    if (!Array.isArray(query.filter)) {
      query.filter = [query.filter];
    }
    query.filter.forEach((dimension) => {
      let split = dimension.split(':');
      if (split[0] === 'pe') {
        analyticsDimensions.pe = analyticsDimensions.pe.concat(split[1].split(';'));
      } else if (split[0] === 'ou') {
        analyticsDimensions.ou = analyticsDimensions.ou.concat(split[1].split(';'));
      } else if (split[0] === 'dx') {
        analyticsDimensions.dx = analyticsDimensions.dx.concat(split[1].split(';'));
      }
    });
  }
  return analyticsDimensions;
};
