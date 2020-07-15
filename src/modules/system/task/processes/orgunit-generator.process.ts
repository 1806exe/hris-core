import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TaskService } from '../services/task.service';
import { BackgroundProcess } from './base.process';

@Injectable()
export class OrgUnitGenerator extends BackgroundProcess {
  constructor(taskService: TaskService, private connection: Connection) {
    super(taskService);
  }
  async run() {
    await this.connection.manager.query(
      'DROP TABLE IF EXISTS _organisationunitstructure',
    );
    await this.connection.manager.query(
      `CREATE TABLE _organisationunitstructure(
                organisationunitid bigserial NOT NULL,
                uid character(30) COLLATE pg_catalog."default",
                level integer,
                CONSTRAINT _organisationunitstructure_temp_pkey PRIMARY KEY(organisationunitid)
              )`,
    );
    let level = 1;
    let count: any;
    let countstructure: any;
    const groups = await this.connection.manager.query(
      'SELECT id,uid FROM organisationunitgroup',
    );
    let groupHeaders = '';
    for (const group of groups) {
      Logger.debug(`[HRIS OrgUnit Generator] ${JSON.stringify(group)}`);
      await this.connection.manager.query(
        `ALTER TABLE _organisationunitstructure ADD COLUMN "${group.uid}" boolean`,
      );
      groupHeaders += `,"${group.uid}"`;
    }
    let indexQuery = '';
    do {
      let INSERTFIELD = '';
      let FIELD = '';
      let WHERE = `oulevel${level} `;
      await this.connection.manager.query(
        'ALTER TABLE _organisationunitstructure ADD COLUMN idlevel' +
          level +
          ' integer',
      );
      await this.connection.manager.query(
        'ALTER TABLE _organisationunitstructure ADD COLUMN uidlevel' +
          level +
          ' character(30) COLLATE pg_catalog."default"',
      );
      await this.connection.manager.query(
        'ALTER TABLE _organisationunitstructure ADD COLUMN namelevel' +
          level +
          ' text COLLATE pg_catalog."default"',
      );
      for (let i = 1; i <= level; i++) {
        INSERTFIELD += `, idlevel${i},uidlevel${i},namelevel${i}`;
        FIELD += `, oulevel${i}.id as organisationunitid,oulevel${i}.uid,oulevel${i}.name`;
        if (i === 1) {
          if (i === level) {
            WHERE += ' WHERE parentid IS NULL';
          } else {
            WHERE += ` INNER JOIN organisationunit oulevel${
              level - 1
            } ON(oulevel${level - (i - 1)}.parentid =oulevel${
              level - 1
            }.id AND oulevel${
              level - 1
            }.id IN (SELECT organisationunitid FROM _organisationunitstructure WHERE level = ${
              level - 1
            }))`;
          }
        } else if (i !== level) {
          WHERE += ` INNER JOIN organisationunit oulevel${
            level - i
          } ON(oulevel${level - (i - 1)}.parentid =oulevel${level - i}.id)`;
        }
      }
      let groupSelect = groups
        .map(
          (group) => `(SELECT COUNT(*) > 0 FROM organisationunitgroupmembers
              WHERE oulevel${level}.id=organisationunitgroupmembers."organisationunitId" AND
              organisationunitgroupmembers."organisationunitgroupId" = ${group.id})
              `,
        )
        .join(',');
      if (groups.length > 0) {
        groupSelect = ',' + groupSelect;
      }
      const query = `INSERT INTO _organisationunitstructure(organisationunitid, uid, level${INSERTFIELD} ${groupHeaders})
              SELECT oulevel${level}.id as organisationunitid, oulevel${level}.uid,${
        level + FIELD
      }
              ${groupSelect}
              FROM organisationunit ${WHERE};`;
      await this.connection.manager.query(query);
      countstructure = await this.connection.manager.query(
        'SELECT COUNT(*) FROM _organisationunitstructure',
      );
      count = await this.connection.manager.query(
        'SELECT COUNT(*) FROM organisationunit',
      );
      indexQuery += ',uidlevel' + level;
      level++;
    } while (count[0].count !== countstructure[0].count);
    const creatIndex = `CREATE INDEX orgunitindex ON _organisationunitstructure(
      uid${indexQuery});`;
    await this.connection.manager.query(creatIndex);
    await this.connection.manager.query(`
    UPDATE organisationunit o SET path='/' || s.uidlevel1 ||
    (CASE
        WHEN s.uidlevel2 IS NULL  THEN ''
        ELSE '/' || s.uidlevel2 
    END) ||
    (CASE
        WHEN s.uidlevel3 IS NULL  THEN ''
        ELSE '/' || s.uidlevel3 
    END) ||
    (CASE
        WHEN s.uidlevel4 IS NULL  THEN ''
        ELSE '/' || s.uidlevel5 
    END) || 
    (CASE
        WHEN s.uidlevel5 IS NULL  THEN ''
        ELSE '/' || s.uidlevel5 
    END)
      
      FROM  _organisationunitstructure s
      WHERE o.id = s.organisationunitid;
    
    UPDATE organisationunit o SET "level" = s.level
    FROM  _organisationunitstructure s
    WHERE o.id = s.organisationunitid`);
  }
  async getProcessName() {
    return 'Orgunit Structure Table';
  }
}
