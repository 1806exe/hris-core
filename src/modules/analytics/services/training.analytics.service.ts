import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Connection } from 'typeorm';
import {
  generateOUFilterQuery
} from '../../../core/helpers/ou.helper';
import { AnalyticsDimensions, Comparison } from '../../../core/interfaces/analytics-dimensions';

@Injectable()
export class TrainingAnalyticsService {
  constructor(
    //private orgUnitRepository: Repository<OrganisationUnit>,
    private connetion: Connection,
  ) {}
  async getTrainingCoverageRecords(ou, pe, otherDimensions, context: any) {
    console.log('otherDimensions:',otherDimensions);
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

    let query = 'SELECT uid,name,level FROM organisationunitlevel';
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
    let groups = await this.connetion.manager.query(
      'SELECT id,uid,name FROM organisationunitgroup',
    );
    //TODO improve performance for fetching alot of data
    let filter = '';
    if (Object.keys(otherDimensions).length > 0) {
      let certifiedFilter = '';
      if(otherDimensions.certification){
        let split = otherDimensions.certification.split(':');
        certifiedFilter = 'AND ' + split[1].split(';').map((cert) =>{
          if(cert == 'assessed'){
            return ` sessionparticipant.assessed `
          }else if(cert == 'certified'){
            return ` sessionparticipant.certified `
          }else if(cert == 'notcertified'){
            return ` NOT sessionparticipant.certified `
          }
        }).join(' AND ')
      }
      let trainingFilter = '';
      filter =
        `LEFT JOIN sessionparticipant ON(sessionparticipant."recordId"=record.id ${certifiedFilter}) `;
      if (
        Object.keys(otherDimensions).filter((dim) =>
          [
            'sections',
            'units',
            'topics',
            'curriculums',
            'organizers',
            'sponsors',
            'deliverymodes',
          ].indexOf(dim),
        ).length > -1
      ) {
        if (trainingFilter == '') {
          let setDates = '';
          if(otherDimensions.startDate || otherDimensions.endDate){
            setDates += ' AND (';
            if(otherDimensions.startDate && otherDimensions.endDate){
              setDates += `trainingsession.startdate BETWEEN '${otherDimensions.startDate}' AND '${otherDimensions.endDate}' OR trainingsession.enddate BETWEEN '${otherDimensions.startDate}' AND '${otherDimensions.endDate}'`
            }else if(otherDimensions.startDate){
              setDates += `'${otherDimensions.startDate}' >= trainingsession.startdate OR '${otherDimensions.startDate}' >= trainingsession.enddate `
            }else if(otherDimensions.endDate){
              setDates += `'${otherDimensions.endDate}' <= trainingsession.startdate OR '${otherDimensions.endDate}' <= trainingsession.enddate `
            }
            setDates += ')';
          }
          trainingFilter =
            `LEFT JOIN trainingsession ON(sessionparticipant."trainingsessionId"=trainingsession.id ${setDates} `;
        }
        if (Object.keys(otherDimensions).indexOf('deliverymodes') > -1) {
          trainingFilter += `trainingsession.deliverymode = '${
            otherDimensions['deliverymodes'].split(':')[1]
          }') `;
        } else {
          trainingFilter += `) `;
        }
        if(pe){
          trainingFilter += `
            INNER JOIN _periodstructure pes ON(${pe.map(p => {
              return `(trainingsession.startdate BETWEEN pes.startdate AND pes.enddate OR trainingsession.enddate BETWEEN pes.startdate AND pes.enddate) AND pes.iso='${p}'`;
            })})
          `
        }
      }
      if (
        Object.keys(otherDimensions).filter((dim) =>
          ['sections', 'units', 'topics', 'curriculums'].indexOf(dim),
        ).length > -1
      ) {
        let sectionFilter = this.getDimensionFilter(
          otherDimensions,
          'sections',
          'trainingsections',
        );
        let unitFilter = this.getDimensionFilter(
          otherDimensions,
          'units',
          'trainingunit',
        );
        let curriculumFilter = this.getDimensionFilter(
          otherDimensions,
          'curriculums',
          'trainingcurriculum',
        );

        trainingFilter += `
                LEFT JOIN trainingcurriculum ON(trainingcurriculum.id=trainingsession.curriculumid ${curriculumFilter})
                LEFT JOIN trainingunit ON(trainingunit.id =trainingcurriculum.unitid ${unitFilter})
                LEFT JOIN trainingsections ON(trainingsections.id =trainingcurriculum.sectionid ${sectionFilter})
             `;
      }
      if (
        Object.keys(otherDimensions).filter((dim) => 'sponsors' == dim).length >
        0
      ) {
        let sponsorFilter = this.getDimensionFilter(
          otherDimensions,
          'units',
          'trainingunit',
        );

        trainingFilter += `
                INNER JOIN trainingsponsor sponsor ON(sponsor.id =trainingsession.sponsor ${sponsorFilter})
             `;
      }
      if (
        Object.keys(otherDimensions).filter((dim) => 'organizers' == dim)
          .length > 0
      ) {
        let organizerFilter = this.getDimensionFilter(
          otherDimensions,
          'sections',
          'trainingsections',
        );

        trainingFilter += `
                INNER JOIN trainingsponsor orgnizer ON(orgnizer.id=trainingsession.organiser ${organizerFilter})
             `;
      }
      filter += trainingFilter;
    }
    let providers = '';
    if(otherDimensions.providers){
      let splitComparison = otherDimensions.providers.split(':');
      let operator = '=';
      if(splitComparison[0].toLowerCase() == 'gt'){
        operator = '>'
      } else if(splitComparison[0].toLowerCase() == 'ge'){
        operator = '>='
      } else if(splitComparison[0].toLowerCase() == 'lt'){
        operator = '<'
      } else if(splitComparison[0].toLowerCase() == 'le'){
        operator = '<='
      }
      providers = `
        HAVING COUNT(record.*) ${operator} ${splitComparison[1]}
      `
    }
    let ouFilter = generateOUFilterQuery('ous', ou, orglevels, context.user);
    query = `SELECT TRIM(ous.uid) ou,
      ${orglevels
        .map(
          (orglevel) =>
            'ous.uidlevel' + orglevel.level + ', namelevel' + orglevel.level,
        )
        .join(', ')},
      ${groups.map((group) => 'ous."' + group.uid + '"').join(', ')},
      COUNT(record.*) as providers FROM _organisationunitstructure ous
      LEFT JOIN record ON(record.organisationunitid=ous.organisationunitid)
      ${filter}
      WHERE ${ouFilter}
      GROUP BY ous.uid,${orglevels
        .map(
          (orglevel) =>
            'ous.uidlevel' + orglevel.level + ', namelevel' + orglevel.level,
        )
        .join(', ')}
      ,${groups.map((group) => 'ous."' + group.uid + '"').join(', ')}
      ${providers}
      `;
    console.log(query);
    analytics.headers = orglevels.map((orglevel) => {
      return {
        //id: orglevel.uid,
        name: orglevel.name,
        id: 'namelevel' + orglevel.level,
      };
    });
    analytics.headers = analytics.headers.concat(
      groups.map((group) => {
        return {
          id: group.uid,
          name: group.name,
        };
      }),
    );
    analytics.headers.push({
      id: 'providers',
      name: 'providers',
    });
    analytics.headers = [{
      id: 'ou',
      name: 'Organisation Unit',
    }].concat(analytics.headers);
    let rows = await this.connetion.manager.query(query);
    analytics.height = rows.length;
    analytics.rows = rows.map((row) => {
      let newRow = [];
      analytics.headers.forEach((header, index) => {
        newRow[index] = row[header.id];
      });
      return newRow;
    });
    query =
      `SELECT ou.uid,ou.name FROM  organisationunit ou WHERE ou.uid IN (
        ${ou.map((o) => "'" + o + "'").join(",")}
      ) `;
      console.log('query :',query);
    let organisationunits = await this.connetion.manager.query(query);
    organisationunits.forEach((orgUnit) => {
      analytics.metaData.items[orgUnit.uid] = {
        name: orgUnit.name,
      };
      analytics.metaData.dimensions.ou.push(orgUnit.uid);
    });
    groups.forEach((group) => {
      analytics.metaData.items[group.uid] = {
        name: group.name,
      };
    });
    return analytics;
  }
  getDimensionFilter(dimensionMap, dimension, table) {
    let filter = '';
    if (Object.keys(dimensionMap).indexOf(dimension) > -1) {
      let split = dimensionMap[dimension].split(':');
      if (split[0] == 'eq') {
        filter = ` AND ${table}.uid = '${split[1]}'`;
      }
      if (split[0] == 'in') {
        filter = ` AND ${table}.uid IN ('${split[1].split(',').join("'',")}')`;
      }
    }
    return filter;
  }
  async getTrainingAnalyticsRecords(formid, dimensions: AnalyticsDimensions) {
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
    let query = `SELECT field.uid,field.caption FROM field 
      INNER JOIN formfieldmember ON(formfieldmember.fieldid = field.id) 
      INNER JOIN form ON(form.id = formfieldmember.formid AND form.uid ='${formid}');`;
    let fields = await this.connetion.manager.query(query);
    fields.forEach((field) => {
      if (Object.keys(dimensions.other).indexOf(field.uid) > -1) {
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
    let allowedColumns = ['uid', 'ou'].concat(Object.keys(dimensions.other));
    analytics.headers = headers
      .filter((header) => {
        return allowedColumns.indexOf(header.column_name) > -1;
      })
      .map((header) => {
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
      (orglevel) =>
        'ous.uidlevel' +
        orglevel.level +
        " IN ('" +
        dimensions.ou.join("','") +
        "')",
    );
    let trainingFilter = '';
    if(
      dimensions.certification || 
      dimensions.sections || 
      dimensions.units || 
      dimensions.curriculums || 
      dimensions.topics || 
      dimensions.sponsors || 
      dimensions.organizers || 
      dimensions.deliverymode
      ){
      let certificationFilter = '';
      if(dimensions.certification){
        if(typeof dimensions.certification == 'string'){
          certificationFilter = ` AND ${dimensions.certification}`;
        }else{
          certificationFilter = ` AND (${dimensions.certification.right.split(';').map((certificationStatus)=>{
            return 'sp.'+certificationStatus
          }).join(' OR ')})`;
        }
      }
      trainingFilter += `INNER JOIN sessionparticipant sp ON(sp."recordId" = data.recordid ${certificationFilter})`;

      let sectionFilter = '';
      console.log(dimensions);
      if(dimensions.sections){
        console.log(dimensions.sections);
        sectionFilter = ` AND tsec.uid IN ('${(<Comparison>dimensions.sections).right.split(';').map((sectionid)=>{
          return sectionid
        }).join("','")}')`;
      }

      let unitFilter = '';
      if(dimensions.units){
        unitFilter = ` AND tu.uid IN ('${(<Comparison>dimensions.units).right.split(';').map((unitid)=>{
          return unitid
        }).join("','")}')`;
      }

      let curriculumFilter = '';
      if(dimensions.curriculums){
        curriculumFilter = ` AND tc.uid IN ('${(<Comparison>dimensions.curriculums).right.split(';').map((curriculumid)=>{
          return curriculumid
        }).join("','")}')`;
      }

      let organiserFilter = '';
      if(dimensions.organizers){
        organiserFilter = ` AND torganiser.uid IN ('${(<Comparison>dimensions.organizers).right.split(';').map((organizerid)=>{
          return organizerid
        }).join("','")}')`;
      }

      let sponsorFilter = '';
      if(dimensions.sponsors){
        sponsorFilter = ` AND torganiser.uid IN ('${(<Comparison>dimensions.sponsors).right.split(';').map((sponsorid)=>{
          return sponsorid
        }).join("','")}')`;
      }
      trainingFilter += `
          INNER JOIN trainingsession ts ON(ts.id = sp."trainingsessionId")
          INNER JOIN trainingsponsor tsponsor ON(tsponsor.id = ts.sponsor ${sponsorFilter})
          INNER JOIN trainingsponsor torganiser ON(torganiser.id = ts.organiser ${organiserFilter})
          INNER JOIN trainingcurriculum tc ON(tc.id = ts.curriculumid ${curriculumFilter})
          INNER JOIN trainingunit tu ON(tu.id = tc.unitid ${unitFilter})
          INNER JOIN trainingsections tsec ON(tsec.id = tc.sectionid ${sectionFilter})
      `;
      //TODO add filtering for sections units and all training fields
    }
    //TODO improve performance for fetching alot of data
    query = `SELECT ${allowedColumns.map(
      (column) => 'data."' + column + '"',
    )} FROM _resource_table_${formid} data
      INNER JOIN _organisationunitstructure ous ON(ous.uid = data.ou AND (${levelquery.join(
        ' OR ',
      )}))
      ${trainingFilter}
      `;
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
    let rows = await this.connetion.manager.query(query);
    analytics.height = rows.length;
    analytics.rows = rows.map((row) => {
      let newRow = [];
      analytics.headers.forEach((header, index) => {
        newRow[index] = row[header.name];
      });
      return newRow;
    });
    await this.addMetaData(analytics, dimensions);
    return analytics;
  }
  async addMetaData(analytics, dimensions: AnalyticsDimensions) {
    /*let orgUnits = await this.orgUnitRepository.find(
      {
        select:['uid','name'],
        relations:['parent', 'organisationUnitGroups'],
        where:{
          "uid": dimensions.ou
        }
      }
    );*/
    let query = 'SELECT level FROM organisationunitlevel';
    let orglevels = await this.connetion.manager.query(query);
    let levelquery = orglevels.map(
      (orglevel) =>
        'ous.uidlevel' +
        orglevel.level +
        " IN ('" +
        dimensions.ou.join("','") +
        "')",
    );
    query = `
      SELECT 
        ou.uid as id,ou.name,
        json_agg(json_build_object('name',ancestor.name,'level',ancestor.level)) ancestors,
        json_agg(json_build_object('name',ougroup.name,'id',ougroup.uid,'groupSet',ougroupset)) groups 
      FROM  organisationunit ou
      INNER JOIN _organisationunitstructure ous ON(ous.organisationunitid = ou.id AND (${levelquery.join(
        ' OR ',
      )}))
      LEFT JOIN organisationunit ancestor ON(ou.path like '%'||ancestor.uid||'%' AND ancestor.id <> ou.id)
      INNER JOIN organisationunitgroupmembers member ON(member."organisationunitId" = ou.id)
      LEFT JOIN organisationunitgroup ougroup ON(ougroup.id = member."organisationunitgroupId")
      LEFT JOIN organisationunitgroupset ougroupset ON(ougroupset.id = ougroup.organisationunitgroupsetid)
      GROUP BY ou.uid,ou.name
      `;
    /*let query =
      'SELECT ou.uid,ou.name FROM  organisationunit ou WHERE (' +
      dimensions.ou.map((o) => "ou.uid = '" + o + "'").join(' OR ') +
      ') ';*/
    console.log(query);
    let organisationunits = await this.connetion.manager.query(query);
    organisationunits.forEach((orgUnit) => {
      analytics.metaData.items[orgUnit.id] = orgUnit;
      analytics.metaData.dimensions.ou.push(orgUnit.id);
    });
  }
  async getTrainingSessions(ou, pe, otherDimensions, context: any) {
    //console.log('pes :: ', pe, 'other dimensions :: ', otherDimensions);

    let analytics = {
      headers: [
        {
          name: 'id',
          column: 'id',
        },
        {
          name: 'section',
          column: 'section',
        },
        {
          name: 'unit',
          column: 'unit',
        },
        {
          name: 'curriculum',
          column: 'curriculum',
        },
        {
          name: 'region',
          column: 'region',
        },
        {
          name: 'district',
          column: 'district',
        },
        {
          name: 'venue',
          column: 'venue',
        },
        {
          name: 'sponsor',
          column: 'sponsor',
        },
        {
          name: 'organiser',
          column: 'organiser',
        },
        {
          name: 'deliverymode',
          column: 'deliverymode',
        },
        {
          name: 'startdate',
          column: 'startdate',
        },
        {
          name: 'enddate',
          column: 'enddate',
        },
        {
          name: 'participants',
          column: 'participants',
        },
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
    if (ou) {
      let query = 'SELECT level FROM organisationunitlevel';
      let orglevels = await this.connetion.manager.query(query);
      let levelquery = orglevels.map(
        (orglevel) =>
          'ous.uidlevel' + orglevel.level + " IN ('" + ou.join("','") + "')",
      );
    }
    let periodFilter = '';
    if (pe) {
      let rows = await this.connetion.manager.query(
        `SELECT * FROM _periodstructure WHERE iso IN ('${pe.join("','")}')`,
      );
      if (rows.length > 0) {
        //console.log('rows :::: ', rows);
        periodFilter = `WHERE (${rows
          .map((row) => {
            return `ts.startdate BETWEEN '${row.startdate.toISOString()}' AND '${row.enddate.toISOString()}' 
          OR ts.enddate BETWEEN '${row.startdate.toISOString()}' AND '${row.enddate.toISOString()}'`;
          })
          .join(' OR ')} )`;
      }
    } else if (otherDimensions['startDate'] && otherDimensions['endDate']) {
      let startdate = new Date(otherDimensions['startDate']);
      let enddate = new Date(otherDimensions['endDate']);

      //console.log('end date ::: ', enddate);
      periodFilter = `WHERE (ts.startdate BETWEEN '${enddate.toISOString()}' AND '${enddate.toISOString()}' 
        OR ts.enddate BETWEEN '${startdate.toISOString()}' AND '${enddate.toISOString()}')`;
    }

    //console.log('other dimensions :: ', otherDimensions);
    if (otherDimensions) {
      _.each(_.keys(otherDimensions), (key) => {
        if (key != 'startDate' && key != 'endDate') {
          otherDimensions[key] = otherDimensions[key]
            .split(':')[1]
            .split(',')
            .join("','");
        }
      });

      curriculumnFilter = otherDimensions['curriculumn']
        ? otherDimensions['curriculumn']
        : '';
      unitFilter = otherDimensions['unit'] ? otherDimensions['unit'] : '';
      sectionFilter = otherDimensions['sections']
        ? otherDimensions['sections']
        : '';
      organiserFilter = otherDimensions['organiser']
        ? otherDimensions['organiser']
        : '';
      sponsorFilter = otherDimensions['sponsor']
        ? otherDimensions['sponsor']
        : '';
    }

    let query = 'SELECT level FROM organisationunitlevel';
    let orglevels = await this.connetion.manager.query(query);
    let levelquery = orglevels.map(
      (orglevel) =>
        'ous.uidlevel' + orglevel.level + " IN ('" + ou.join("','") + "')",
    );

    //AND curriculum.uid IN('uodfidh','difgod)

    query = `
    SELECT ts.uid as id,section.name section,unit.name unit,
        curriculum.name curriculum,region.name region,
        district.name district,
        venuename venue,sponsor.name sponsor,organiser.name organiser,
        ts.deliverymode,ts.startdate,ts.enddate,COUNT(sp) participants 
    FROM trainingsession ts
    INNER JOIN _organisationunitstructure ous ON(ous.organisationunitid = ts.organisationunit AND (${levelquery.join(
      ' OR ',
    )}))
        INNER JOIN organisationunit district ON(district.id=ts.organisationunit ${ouFilter})
        INNER JOIN organisationunit region ON(district.parentid=region.id)
  
    INNER JOIN trainingcurriculum curriculum ON(ts.curriculumid=curriculum.id${
      curriculumnFilter != ''
        ? ` AND curriculum.uid IN('${curriculumnFilter}')`
        : ''
    })
         INNER JOIN trainingunit unit ON(unit.id=curriculum.unitid${
           unitFilter != '' ? ` AND unit.uid IN('${unitFilter}')` : ''
         })
         INNER JOIN trainingsections section ON(section.id=unit.sectionid${
           sectionFilter != '' ? ` AND section.uid IN('${sectionFilter}')` : ''
         })
         INNER JOIN trainingsponsor sponsor ON(sponsor.id=ts.sponsor${
           sponsorFilter != '' ? ` AND sponsor.uid IN('${sponsorFilter}')` : ''
         })
         INNER JOIN trainingsponsor organiser ON(organiser.id=ts.organiser${
           organiserFilter != ''
             ? ` AND organiser.uid IN('${organiserFilter}')`
             : ''
         })
         LEFT JOIN sessionparticipant sp ON(sp."trainingsessionId" = ts.id)
        ${periodFilter}
        GROUP BY ts.uid,section.name,unit.name,curriculum.name,region.name,district.name,
        venuename,sponsor.name,organiser.name,ts.deliverymode,ts.startdate,ts.enddate
    `;

    // `;
    // let keys = Object.keys(otherDimensions);

    // console.log('keys ::: ', keys);

    // _.each(keys, (key) => {
    //   console.log('key :: ', key);

    //   if (key == 'curriculumn') {
    //     query += `INNER JOIN trainingcurriculum curriculum ON(ts.curriculumid=curriculum.id AND curriculum.uid IN('${otherDimensions[key]}'))
    //     `;
    //   } else if (key == 'unit') {
    //     query += `INNER JOIN trainingunit unit ON(unit.id=curriculum.unitid AND unit.uid IN('${otherDimensions[key]}'))
    //     `;
    //   } else if (key == 'sections') {
    //     query += `INNER JOIN trainingsections section ON(section.id=unit.sectionid AND section.uid IN('${otherDimensions[key]}'))
    //     `;
    //   } else if (key == 'sponsor') {
    //     query += `INNER JOIN trainingsponsor sponsor ON(sponsor.id=ts.sponsor AND sponsor.uid IN('${otherDimensions[key]}'))
    //     `;
    //   } else if (key == 'organiser') {
    //     query += `INNER JOIN trainingsponsor organiser ON(organiser.id=ts.organiser AND organiser.uid IN('${otherDimensions[key]}'))
    //     `;
    //   }
    // });
    //console.log('logged query :: ', query);
    let rows = await this.connetion.manager.query(query);
    analytics.height = rows.length;
    analytics.rows = rows.map((row) => {
      let newRow = [];
      analytics.headers.forEach((header, index) => {
        newRow[index] = row[header.column];
      });
      return newRow;
    });
    query =
      'SELECT ou.uid,ou.name FROM  organisationunit ou WHERE (' +
      ou.map((o) => "ou.uid = '" + o + "'").join(' OR ') +
      ') ';
    let organisationunits = await this.connetion.manager.query(query);
    organisationunits.forEach((orgUnit) => {
      analytics.metaData.items[orgUnit.uid] = orgUnit.name;
      analytics.metaData.dimensions.ou.push(orgUnit.uid);
    });
    return analytics;
  }
  getGenericType(type) {
    if (type === 'timestamp without time zone') {
      return 'DATETIME';
    } else if (type === 'character varying') {
      return 'TEXT';
    } else if (type === 'integer') {
      return 'INTEGER';
    } else {
      return type;
    }
  }
}
