
export const extractAnalytics = (query:any):{dx:string[],ou:string[],pe:string[]}=>{
    let pe = [];
    let ou = [];
    let dx = [];
    query.dimension.forEach((dimension) => {
        let split = dimension.split(':');
        if (split[0] === 'pe') {
          pe = pe.concat(split[1].split(';'));
        } else if (split[0] === 'ou') {
          ou = ou.concat(split[1].split(';'));
        } else if (split[0] === 'dx') {
          dx = dx.concat(split[1].split(';'));
        }
      });
      if (query.filter) {
        if (!Array.isArray(query.filter)) {
          query.filter = [query.filter];
        }
  
        query.filter.forEach((dimension) => {
          let split = dimension.split(':');
          if (split[0] === 'pe') {
            pe = pe.concat(split[1].split(';'));
          } else if (split[0] === 'ou') {
            ou = ou.concat(split[1].split(';'));
          } else if (split[0] === 'dx') {
            dx = dx.concat(split[1].split(';'));
          }
        });
      }
    return {
        dx:dx.map((d)=>d.trim()),
        ou:ou.map((d)=>d.trim()),
        pe:pe.map((d)=>d.trim())
    }
}