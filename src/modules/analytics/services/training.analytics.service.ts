import { Injectable } from '@nestjs/common';
import { getWhereConditions } from 'src/core/utilities';
import { Connection } from 'typeorm';
import { resultNotFoundResponse } from 'src/core/helpers/response.helper';
import { Analytics } from 'src/core/interfaces/analytics.interface';
import { generateOUFilterQuery, getISOOrgUnits } from 'src/core/helpers/ou.helper';
import { getISOPeriods } from 'src/core/helpers/pe.helper';

@Injectable()
export class TrainingAnalyticsService {
  constructor(private connetion: Connection) {

  }
  sampleAnalytics = {
    "wo7ITisRXeE": { "headers": [{ "name": "dx", "column": "Data", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "pe", "column": "Period", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "ou", "column": "Organisation unit", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "value", "column": "Value", "valueType": "NUMBER", "type": "java.lang.Double", "hidden": false, "meta": false }], "metaData": { "items": { "2010": { "name": "2010" }, "2011": { "name": "2011" }, "2012": { "name": "2012" }, "2013": { "name": "2013" }, "2014": { "name": "2014" }, "2015": { "name": "2015" }, "2016": { "name": "2016" }, "2017": { "name": "2017" }, "2018": { "name": "2018" }, "2019": { "name": "2019" }, "2020": { "name": "2020" }, "ou": { "name": "Organisation unit" }, "dx": { "name": "Data" }, "pe": { "name": "Period" }, "m0frOspS7JY": { "name": "MOH - Tanzania" }, "wo7ITisRXeE": { "name": "Number of employments" } }, "dimensions": { "dx": ["wo7ITisRXeE"], "pe": ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"], "ou": ["m0frOspS7JY"], "co": [] } }, "rows": [["wo7ITisRXeE", "2010", "m0frOspS7JY", "5275"], ["wo7ITisRXeE", "2011", "m0frOspS7JY", "3310"], ["wo7ITisRXeE", "2012", "m0frOspS7JY", "5031"], ["wo7ITisRXeE", "2013", "m0frOspS7JY", "5207"], ["wo7ITisRXeE", "2014", "m0frOspS7JY", "7437"], ["wo7ITisRXeE", "2015", "m0frOspS7JY", "7498"], ["wo7ITisRXeE", "2016", "m0frOspS7JY", "718"], ["wo7ITisRXeE", "2017", "m0frOspS7JY", "1975"], ["wo7ITisRXeE", "2018", "m0frOspS7JY", "5650"], ["wo7ITisRXeE", "2019", "m0frOspS7JY", "340"]], "width": 4, "height": 36 },
    "yKypqIROIO9": { "headers": [{ "name": "dx", "column": "Data", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "ou", "column": "Organisation unit", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "value", "column": "Value", "valueType": "NUMBER", "type": "java.lang.Double", "hidden": false, "meta": false }], "metaData": { "items": { "2010": { "name": "2010" }, "2011": { "name": "2011" }, "2012": { "name": "2012" }, "2013": { "name": "2013" }, "2014": { "name": "2014" }, "2015": { "name": "2015" }, "2016": { "name": "2016" }, "2017": { "name": "2017" }, "2018": { "name": "2018" }, "2019": { "name": "2019" }, "2020": { "name": "2020" }, "ou": { "name": "Organisation unit" }, "dx": { "name": "Data" }, "pe": { "name": "Period" }, "m0frOspS7JY": { "name": "MOH - Tanzania" }, "yKypqIROIO3": { "name": "Female" }, "yKypqIROIO9": { "name": "Male" } }, "dimensions": { "dx": ["yKypqIROIO9", "yKypqIROIO3"], "pe": [], "ou": ["m0frOspS7JY"], "co": [] } }, "rows": [["yKypqIROIO9", "m0frOspS7JY", "5275"], ["yKypqIROIO3", "m0frOspS7JY", "3310"]], "width": 4, "height": 36 },
    "yKypqIROIO4": { "headers": [{ "name": "dx", "column": "Data", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "pe", "column": "Period", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "ou", "column": "Organisation unit", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "value", "column": "Value", "valueType": "NUMBER", "type": "java.lang.Double", "hidden": false, "meta": false }], "metaData": { "items": { "2010": { "name": "20-24" }, "2011": { "name": "25-29" }, "2012": { "name": "30-34" }, "2013": { "name": "35-39" }, "2014": { "name": "40-44" }, "2015": { "name": "45-49" }, "2016": { "name": "50-54" }, "2017": { "name": "55-59" }, "2018": { "name": "60-64" }, "2019": { "name": "65-69" }, "2020": { "name": "70-74" }, "ou": { "name": "Organisation unit" }, "dx": { "name": "Data" }, "pe": { "name": "Period" }, "m0frOspS7JY": { "name": "MOH - Tanzania" }, "wo7ITisRXeE": { "name": "Number of employees by age" } }, "dimensions": { "dx": ["wo7ITisRXeE"], "pe": ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"], "ou": ["m0frOspS7JY"], "co": [] } }, "rows": [["wo7ITisRXeE", "2010", "m0frOspS7JY", "0"], ["wo7ITisRXeE", "2011", "m0frOspS7JY", "1188"], ["wo7ITisRXeE", "2012", "m0frOspS7JY", "13714"], ["wo7ITisRXeE", "2013", "m0frOspS7JY", "16401"], ["wo7ITisRXeE", "2014", "m0frOspS7JY", "10221"], ["wo7ITisRXeE", "2015", "m0frOspS7JY", "10841"], ["wo7ITisRXeE", "2016", "m0frOspS7JY", "9725"], ["wo7ITisRXeE", "2017", "m0frOspS7JY", "10320"], ["wo7ITisRXeE", "2018", "m0frOspS7JY", "9834"], ["wo7ITisRXeE", "2019", "m0frOspS7JY", "4076"]], "width": 4, "height": 36 },
    "any": { "headers": [{ "name": "dx", "column": "Data", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "pe", "column": "Period", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "ou", "column": "Organisation unit", "valueType": "TEXT", "type": "java.lang.String", "hidden": false, "meta": true }, { "name": "value", "column": "Value", "valueType": "NUMBER", "type": "java.lang.Double", "hidden": false, "meta": false }], "metaData": { "items": { "201907": { "name": "July 2019" }, "MqMQnGOqLuY": { "name": "KE" }, "201906": { "name": "June 2019" }, "201909": { "name": "September 2019" }, "201908": { "name": "August 2019" }, "201903": { "name": "March 2019" }, "201902": { "name": "February 2019" }, "yKypqIROIO9": { "name": "Watoto Waliopatiwa LLIN" }, "201905": { "name": "May 2019" }, "ou": { "name": "Organisation unit" }, "201904": { "name": "April 2019" }, "201910": { "name": "October 2019" }, "201901": { "name": "January 2019" }, "201912": { "name": "December 2019" }, "201911": { "name": "November 2019" }, "X0Me7ygpiUT": { "name": "ME" }, "dx": { "name": "Data" }, "pe": { "name": "Period" }, "Kl9MzjQI3ms": { "name": "Expected children Under 1 Year" }, "m0frOspS7JY": { "name": "MOH - Tanzania" }, "wo7ITisRXeE": { "name": "Measles/Rubella 1 doses given" } }, "dimensions": { "dx": ["Kl9MzjQI3ms", "wo7ITisRXeE", "yKypqIROIO9"], "pe": ["201901", "201902", "201903", "201904", "201905", "201906", "201907", "201908", "201909", "201910", "201911", "201912"], "ou": ["m0frOspS7JY"], "co": ["MqMQnGOqLuY", "X0Me7ygpiUT"] } }, "rows": [["Kl9MzjQI3ms", "201901", "m0frOspS7JY", "2.36250253E7"], ["Kl9MzjQI3ms", "201902", "m0frOspS7JY", "2.6156278E7"], ["Kl9MzjQI3ms", "201903", "m0frOspS7JY", "2.36250253E7"], ["Kl9MzjQI3ms", "201904", "m0frOspS7JY", "2.44125262E7"], ["Kl9MzjQI3ms", "201905", "m0frOspS7JY", "2.36250253E7"], ["Kl9MzjQI3ms", "201906", "m0frOspS7JY", "2.44125262E7"], ["Kl9MzjQI3ms", "201907", "m0frOspS7JY", "2.36250253E7"], ["Kl9MzjQI3ms", "201908", "m0frOspS7JY", "2.36250253E7"], ["Kl9MzjQI3ms", "201909", "m0frOspS7JY", "2.44125262E7"], ["Kl9MzjQI3ms", "201910", "m0frOspS7JY", "2.36250253E7"], ["Kl9MzjQI3ms", "201911", "m0frOspS7JY", "2.44125262E7"], ["Kl9MzjQI3ms", "201912", "m0frOspS7JY", "2.36250253E7"], ["wo7ITisRXeE", "201901", "m0frOspS7JY", "172808.0"], ["wo7ITisRXeE", "201902", "m0frOspS7JY", "164532.0"], ["wo7ITisRXeE", "201903", "m0frOspS7JY", "171820.0"], ["wo7ITisRXeE", "201904", "m0frOspS7JY", "162847.0"], ["wo7ITisRXeE", "201905", "m0frOspS7JY", "181111.0"], ["wo7ITisRXeE", "201906", "m0frOspS7JY", "167957.0"], ["wo7ITisRXeE", "201907", "m0frOspS7JY", "177640.0"], ["wo7ITisRXeE", "201908", "m0frOspS7JY", "181368.0"], ["wo7ITisRXeE", "201909", "m0frOspS7JY", "177983.0"], ["wo7ITisRXeE", "201910", "m0frOspS7JY", "204312.0"], ["wo7ITisRXeE", "201911", "m0frOspS7JY", "155853.0"], ["wo7ITisRXeE", "201912", "m0frOspS7JY", "139938.0"], ["yKypqIROIO9", "201910", "m0frOspS7JY", "134130.0"], ["yKypqIROIO9", "201911", "m0frOspS7JY", "126009.0"], ["yKypqIROIO9", "201902", "m0frOspS7JY", "127274.0"], ["yKypqIROIO9", "201909", "m0frOspS7JY", "146883.0"], ["yKypqIROIO9", "201901", "m0frOspS7JY", "134887.0"], ["yKypqIROIO9", "201903", "m0frOspS7JY", "135008.0"], ["yKypqIROIO9", "201912", "m0frOspS7JY", "105449.0"], ["yKypqIROIO9", "201906", "m0frOspS7JY", "133842.0"], ["yKypqIROIO9", "201905", "m0frOspS7JY", "140172.0"], ["yKypqIROIO9", "201907", "m0frOspS7JY", "146057.0"], ["yKypqIROIO9", "201908", "m0frOspS7JY", "149497.0"], ["yKypqIROIO9", "201904", "m0frOspS7JY", "126747.0"]], "width": 4, "height": 36 }
  }
  async getTrainingCoverageRecords(ou, pe, otherDimensions, context: any) {
    let analytics = {
      headers: [],
      metaData: {
        items: {
          ou: { name: 'Organisation unit' },
          pe: { name: 'Period' },
        },
        dimensions: { pe: [], ou: [] },
      },
      rows: [],
      height: 0,
      width: 0,
    };
    analytics.width = analytics.headers.length;

    let query = 'SELECT level FROM organisationunitlevel';
    let orglevels = await this.connetion.manager.query(query);

    /*let periodquery = pe.map(p => {
      let whereCondition = getWhereConditions(p);
      let [dx, operator, operand] = p.split(':');
      analytics.metaData.dimensions.pe.push(operand);
      if (operator == 'lt') {
        return `(data."${dx}" < pes.enddate AND pes.iso='${operand}')`;
      }
      return `(data."${dx}" BETWEEN pes.startdate AND pes.enddate AND pes.iso='${operand}')`;
    });*/
    let groups = await this.connetion.manager.query('SELECT id,uid FROM organisationunitgroup');
    //TODO improve performance for fetching alot of data
    let filter = '';
    if(Object.keys(otherDimensions).length > 0){
        let trainingFilter = '';
        filter = 'INNER JOIN sessionparticipant ON(sessionparticipant."recordId"=record.id) '
        if(Object.keys(otherDimensions).filter((dim) =>['sections','units','topics','curriculums','organizers','sponsors','deliverymodes'].indexOf(dim)).length > -1){
            if(trainingFilter == ''){
                trainingFilter = 'INNER JOIN trainingsession ON(sessionparticipant."trainingsessionId"=trainingsession.id ';
            }
            if(Object.keys(otherDimensions).indexOf('deliverymodes') > -1){
                trainingFilter += `trainingsession.deliverymode = '${otherDimensions['deliverymodes'].split(':')[1]}') `; 
            }else{
                trainingFilter += `) `; 
            }
        }
        console.log('otherDimensions:',otherDimensions);
        console.log(Object.keys(otherDimensions).filter((dim) =>['sections','units','topics','curriculums'].indexOf(dim)).length);
        if(Object.keys(otherDimensions).filter((dim) =>['sections','units','topics','curriculums'].indexOf(dim)).length > -1){
            let sectionFilter = this.getDimensionFilter(otherDimensions, 'sections','trainingsections');
            let unitFilter = this.getDimensionFilter(otherDimensions, 'units','trainingunit');
            let curriculumFilter = this.getDimensionFilter(otherDimensions, 'curriculums','trainingcurriculum');
            
            trainingFilter += `
                INNER JOIN trainingcurriculum ON(trainingcurriculum.id=trainingsession.curriculumid ${curriculumFilter})
                INNER JOIN trainingunit ON(trainingunit.id =trainingcurriculum.unitid ${unitFilter})
                INNER JOIN trainingsections ON(trainingsections.id =trainingcurriculum.sectionid ${sectionFilter})
             `; 
        }
        if(Object.keys(otherDimensions).filter((dim) =>'sponsors'==dim).length > 0){
            let sponsorFilter = this.getDimensionFilter(otherDimensions, 'units','trainingunit');
            
            trainingFilter += `
                INNER JOIN trainingsponsor sponsor ON(sponsor.id =trainingsession.sponsor ${sponsorFilter})
             `; 
        }
        if(Object.keys(otherDimensions).filter((dim) =>'organizers'==dim).length > 0){
            let organizerFilter = this.getDimensionFilter(otherDimensions, 'sections','trainingsections');
            
            trainingFilter += `
                INNER JOIN trainingsponsor orgnizer ON(orgnizer.id=trainingsession.organiser ${organizerFilter})
             `; 
        }
        filter += trainingFilter;
    }
    let ouFilter = generateOUFilterQuery('ous', ou, orglevels, context.user);
    query =
      `SELECT ous.uid,
      ${orglevels.map(
        orglevel =>
          'ous.uidlevel' + orglevel.level + ", namelevel" + orglevel.level,
      ).join(', ')},
      ${groups.map(
        group =>
          'ous."' + group.uid + '"',
      ).join(', ')},
      COUNT(record.*) as providers FROM _organisationunitstructure ous
      LEFT JOIN record ON(record.organisationunitid=ous.organisationunitid)
      ${filter}
      WHERE ${ouFilter}
      GROUP BY ous.uid,${orglevels.map(
        orglevel =>
          'ous.uidlevel' + orglevel.level + ", namelevel" + orglevel.level,
      ).join(', ')}
      ,${groups.map(
        group =>
          'ous."' + group.uid + '"',
      ).join(', ')}`;
    analytics.headers = orglevels.map(
      orglevel => {
        return {
          name: "namelevel" + orglevel.level
        }
      }
    );
    analytics.headers = analytics.headers.concat(groups.map(
      group => {
        return {
          name: group.uid
        }
      }
    ));
    analytics.headers.push({
      name: 'providers'
    })
    console.log(query);
    let rows = await this.connetion.manager.query(query);
    analytics.height = rows.length;
    analytics.rows = rows.map(row => {
      let newRow = [];
      analytics.headers.forEach((header, index) => {
        newRow[index] = row[header.name];
      });
      return newRow;
    });
    query =
      'SELECT ou.uid,ou.name FROM  organisationunit ou WHERE (' +
      ou.map(o => "ou.uid = '" + o + "'").join(' OR ') +
      ') ';
    let organisationunits = await this.connetion.manager.query(query);
    organisationunits.forEach(orgUnit => {
      analytics.metaData.items[orgUnit.uid] = orgUnit.name;
      analytics.metaData.dimensions.ou.push(orgUnit.uid);
    });
    return analytics;
  }
  getDimensionFilter(dimensionMap, dimension,table){
    let filter = '';
    if(Object.keys(dimensionMap).indexOf(dimension) > -1){
        let split = dimensionMap[dimension].split(':');
        if(split[0] == 'eq'){
            filter = ` AND ${table}.uid = '${split[1]}'`
        }
        if(split[0] == 'in'){
            filter = ` AND ${table}.uid IN ('${split[1].spli(',').join("'',")}')`
        }
    }
    return filter;
  }
  async getTrainingAnalyticsRecords(formid, ou, pe, otherDimensions) {
      console.log(otherDimensions);
    let analytics = {
      headers: [],
      metaData: {
        items: {
          ou: { name: 'Organisation unit' },
          pe: { name: 'Period' },
        },
        dimensions: { pe: [], ou: [] },
      },
      rows: [],
      height: 0,
      width: 0,
    };
    let query =
      `SELECT field.uid,field.caption FROM field 
      INNER JOIN formfieldmember ON(formfieldmember.fieldid = field.id) 
      INNER JOIN form ON(form.id = formfieldmember.formid AND form.uid ='${formid}');`;
    let fields = await this.connetion.manager.query(query);
    fields.forEach(field => {
      if (Object.keys(otherDimensions).indexOf(field.uid) > -1) {
        analytics.metaData.items[field.uid] = { name: field.caption };
      }
    });
    // Dealing with headers
    let headers = await this.connetion.manager.query(
      'SELECT columns.table_name,columns.column_name,' +
      'columns.data_type, columns.column_default, columns.is_nullable FROM information_schema.columns' +
      " WHERE table_name = '_resource_table_" +
      formid +
      "'",
    );
    let allowedColumns = ['uid', 'ou'].concat(Object.keys(otherDimensions));
    analytics.headers = headers
      .filter(header => {
        return allowedColumns.indexOf(header.column_name) > -1;
      })
      .map(header => {
        return {
          name: header.column_name,
          column: header.column_name,
          valueType: this.getGenericType(header.data_type),
        };
      });
    analytics.width = analytics.headers.length;

    query = 'SELECT level FROM organisationunitlevel';
    let orglevels = await this.connetion.manager.query(query);
    let levelquery = orglevels.map(
      orglevel =>
        'ous.uidlevel' + orglevel.level + " IN ('" + ou.join("','") + "')",
    );

    //TODO improve performance for fetching alot of data
    query =
      `SELECT ${allowedColumns.map(column => 'data."' + column + '"')} FROM _resource_table_${formid} data
      INNER JOIN _organisationunitstructure ous ON(ous.uid = data.ou AND ${levelquery.join(' OR ')})`;
    /*if (pe) {
      let periodquery = pe.map(p => {
        let whereCondition = getWhereConditions(p);
        console.log(whereCondition);
        let [dx, operator, operand] = p.split(':');
        console.log('whereCondition:', dx, operator, operand);
        analytics.metaData.dimensions.pe.push(operand);
        if (operator == 'lt') {
          return `(data."${dx}" < pes.enddate AND pes.iso='${operand}')`;
        }
        return `(data."${dx}" BETWEEN pes.startdate AND pes.enddate AND pes.iso='${operand}')`;
      });
      query += ` INNER JOIN _periodstructure pes ON(${periodquery.join(' OR ')}) LIMIT 200000`;
    }*/
    console.log(query);
    let rows = await this.connetion.manager.query(query);
    analytics.height = rows.length;
    analytics.rows = rows.map(row => {
      let newRow = [];
      analytics.headers.forEach((header, index) => {
        newRow[index] = row[header.name];
      });
      return newRow;
    });
    query =
      'SELECT ou.uid,ou.name FROM  organisationunit ou WHERE (' +
      ou.map(o => "ou.uid = '" + o + "'").join(' OR ') +
      ') ';
    let organisationunits = await this.connetion.manager.query(query);
    organisationunits.forEach(orgUnit => {
      analytics.metaData.items[orgUnit.uid] = orgUnit.name;
      analytics.metaData.dimensions.ou.push(orgUnit.uid);
    });
    return analytics;
  }
  async getTrainingSessions(ou, pe, otherDimensions, context: any) {
    let analytics = {
      headers: [
        {
            name: 'section',
            column: 'section'
        },{
            name: 'unit',
            column: 'unit'
        },{
            name: 'curriculum',
            column: 'curriculum'
        },{
            name: 'region',
            column: 'region'
        },{
            name: 'district',
            column: 'district'
        },{
            name: 'venue',
            column: 'venue'
        },{
            name: 'sponsor',
            column: 'sponsor'
        },{
            name: 'organiser',
            column: 'organiser'
        },{
            name: 'deliverymode',
            column: 'deliverymode'
        },{
            name: 'startdate',
            column: 'startdate'
        },{
            name: 'enddate',
            column: 'enddate'
        },{
            name: 'participants',
            column: 'participants'
        }
      ],
      metaData: {
        items: {
          ou: { name: 'Organisation unit' },
          pe: { name: 'Period' },
        },
        dimensions: { pe: [], ou: [] },
      },
      rows: [],
      height: 0,
      width: 0,
    };
    analytics.width = analytics.headers.length;
    let curriculumnFilter = '';
    let unitFilter = '';
    let sectionFilter = '';
    let organiserFilter = '';
    let sponsorFilter = '';
    let ouFilter = '';
    if(ou){
      let query = 'SELECT level FROM organisationunitlevel';
      let orglevels = await this.connetion.manager.query(query);
      let levelquery = orglevels.map(
        orglevel =>
          'ous.uidlevel' + orglevel.level + " IN ('" + ou.join("','") + "')",
      );
    }
    let periodFilter = '';
    if (pe) {
      console.log('PE');
      console.log(pe);
      let rows = await this.connetion.manager.query(`SELECT * FROM _periodstructure WHERE iso IN ('${pe.join("','")}')`);
      console.log(rows);
      periodFilter = `WHERE (${rows.map((row)=>{
        return `ts.startdate BETWEEN '${row.startdate.toISOString()}' AND '${row.enddate.toISOString()}' 
        OR ts.enddate BETWEEN '${row.startdate.toISOString()}' AND '${row.enddate.toISOString()}'`;
      }).join(' OR ')} )`;
    }
    let query = `
    SELECT section.name section,unit.name unit,
        curriculum.name curriculum,region.name region,
        district.name district,
        venuename venue,sponsor.name sponsor,organiser.name organiser,
        ts.deliverymode,ts.startdate,ts.enddate,COUNT(sp) participants 
    FROM trainingsession ts
        INNER JOIN organisationunit district ON(district.id=ts.organisationunit ${ouFilter})
        INNER JOIN organisationunit region ON(district.parentid=region.id)
        INNER JOIN trainingcurriculum curriculum ON(ts.curriculumid=curriculum.id ${curriculumnFilter})
        INNER JOIN trainingunit unit ON(unit.id=curriculum.unitid ${unitFilter})
        INNER JOIN trainingsections section ON(section.id=unit.sectionid ${sectionFilter})
        INNER JOIN trainingsponsor sponsor ON(sponsor.id=ts.sponsor ${sponsorFilter})
        INNER JOIN trainingsponsor organiser ON(organiser.id=ts.organiser ${organiserFilter})
        LEFT JOIN sessionparticipant sp ON(sp."trainingsessionId" = ts.id)
        ${periodFilter}
        GROUP BY section.name,unit.name,curriculum.name,region.name,district.name,
        venuename,sponsor.name,organiser.name,ts.deliverymode,ts.startdate,ts.enddate
    `;
    console.log(query);
    let rows = await this.connetion.manager.query(query);
    analytics.height = rows.length;
    analytics.rows = rows.map(row => {
      let newRow = [];
      analytics.headers.forEach((header, index) => {
        newRow[index] = row[header.column];
      });
      return newRow;
    });
    query =
      'SELECT ou.uid,ou.name FROM  organisationunit ou WHERE (' +
      ou.map(o => "ou.uid = '" + o + "'").join(' OR ') +
      ') ';
    let organisationunits = await this.connetion.manager.query(query);
    organisationunits.forEach(orgUnit => {
      analytics.metaData.items[orgUnit.uid] = orgUnit.name;
      analytics.metaData.dimensions.ou.push(orgUnit.uid);
    });
    return analytics;
  }
  getGenericType(type) {
    if (type === 'timestamp without time zone') {
      return 'DATETIME'
    } else if (type === 'character varying') {
      return 'TEXT'
    } else if (type === 'integer') {
      return 'INTEGER'
    } else {
      return type
    }
  }
}
