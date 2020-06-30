import { MigrationInterface, QueryRunner } from 'typeorm';

export class fix1574916252058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let fixes = `
    ALTER TABLE public."user" OWNER TO postgres;
    CREATE SEQUENCE user_id_seq AS BIGINT OWNED BY "user".id;
    ALTER TABLE public."user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq');
    ALTER TABLE public."user" ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "userrole" OWNER TO "postgres";
    CREATE SEQUENCE userrole_id_seq AS BIGINT OWNED BY userrole.id;
    ALTER TABLE userrole ALTER COLUMN id SET DEFAULT nextval('userrole_id_seq');
    ALTER TABLE userrole ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE form OWNER TO "postgres";
    CREATE SEQUENCE form_id_seq AS BIGINT OWNED BY form.id;
    ALTER TABLE form ALTER COLUMN  id SET DEFAULT nextval('form_id_seq');
    ALTER TABLE form ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "fieldoption" OWNER TO "postgres";
    CREATE SEQUENCE fieldoption_id_seq AS BIGINT OWNED BY fieldoption.id;
    ALTER TABLE fieldoption ALTER COLUMN  id SET DEFAULT nextval('fieldoption_id_seq');
    ALTER TABLE fieldoption ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "fieldoptionmerge" OWNER TO "postgres";
    CREATE SEQUENCE fieldoptionmerge_id_seq AS BIGINT OWNED BY fieldoptionmerge.id;
    ALTER TABLE fieldoptionmerge ALTER COLUMN  id SET DEFAULT nextval('fieldoptionmerge_id_seq');
    ALTER TABLE fieldoptionmerge ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;
    
    ALTER TABLE "fieldoptiongroupset" OWNER TO "postgres";
    CREATE SEQUENCE fieldoptiongroupset_id_seq AS BIGINT OWNED BY fieldoptiongroupset.id;
    ALTER TABLE fieldoptiongroupset ALTER COLUMN  id SET DEFAULT nextval('fieldoptiongroupset_id_seq');
    ALTER TABLE fieldoptiongroupset ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;
    
    ALTER TABLE "fielddatatype" OWNER TO "postgres";
    CREATE SEQUENCE fielddatatype_id_seq AS BIGINT OWNED BY fielddatatype.id;
    ALTER TABLE fielddatatype ALTER COLUMN  id SET DEFAULT nextval('fielddatatype_id_seq');
    ALTER TABLE fielddatatype ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "fieldgroup" OWNER TO "postgres";
    CREATE SEQUENCE fieldgroup_id_seq AS BIGINT OWNED BY fieldgroup.id;
    ALTER TABLE fieldgroup ALTER COLUMN  id SET DEFAULT nextval('fieldgroup_id_seq');
    ALTER TABLE fieldgroup ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;


    ALTER TABLE "field" OWNER TO "postgres";
    CREATE SEQUENCE field_id_seq AS BIGINT OWNED BY field.id;
    ALTER TABLE field ALTER COLUMN  id SET DEFAULT nextval('field_id_seq');
    ALTER TABLE field ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "fieldinputtype" OWNER TO "postgres";
    CREATE SEQUENCE fieldinputtype_id_seq AS BIGINT OWNED BY fieldinputtype.id;
    ALTER TABLE fieldinputtype ALTER COLUMN  id SET DEFAULT nextval('fieldinputtype_id_seq');
    ALTER TABLE fieldinputtype ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "fieldoptionchildren" OWNER TO "postgres";
    CREATE SEQUENCE fieldoptionchildren_id_seq AS BIGINT OWNED BY fieldoptionchildren.id;
    ALTER TABLE fieldoptionchildren ALTER COLUMN  id SET DEFAULT nextval('fieldoptionchildren_id_seq');
    ALTER TABLE fieldoptionchildren ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "fieldoptiongroup" OWNER TO "postgres";
    CREATE SEQUENCE fieldoptiongroup_id_seq AS BIGINT OWNED BY fieldoptiongroup.id;
    ALTER TABLE fieldoptiongroup ALTER COLUMN  id SET DEFAULT nextval('fieldoptiongroup_id_seq');
    ALTER TABLE fieldoptiongroup ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "friendlyreport" OWNER TO "postgres";
    CREATE SEQUENCE friendlyreport_id_seq AS BIGINT OWNED BY friendlyreport.id;
    ALTER TABLE friendlyreport ALTER COLUMN  id SET DEFAULT nextval('friendlyreport_id_seq');
    ALTER TABLE friendlyreport ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "sessionfacilitator" OWNER TO "postgres";
    CREATE SEQUENCE sessionfacilitator_id_seq AS BIGINT OWNED BY sessionfacilitator.id;
    ALTER TABLE sessionfacilitator ALTER COLUMN  id SET DEFAULT nextval('sessionfacilitator_id_seq');
    ALTER TABLE sessionfacilitator ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "sessionparticipant" OWNER TO "postgres";
    CREATE SEQUENCE sessionparticipant_id_seq AS BIGINT OWNED BY sessionparticipant.id;
    ALTER TABLE sessionparticipant ALTER COLUMN  id SET DEFAULT nextval('sessionparticipant_id_seq');

    ALTER TABLE "instancetrainer" OWNER TO "postgres";
    CREATE SEQUENCE instancetrainer_id_seq AS BIGINT OWNED BY instancetrainer.id;
    ALTER TABLE instancetrainer ALTER COLUMN  id SET DEFAULT nextval('instancetrainer_id_seq');
    ALTER TABLE instancetrainer ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "intergrationdhisdataconnection" OWNER TO "postgres";
    CREATE SEQUENCE intergrationdhisdataconnection_id_seq AS BIGINT OWNED BY intergrationdhisdataconnection.id;
    ALTER TABLE intergrationdhisdataconnection ALTER COLUMN  id SET DEFAULT nextval('intergrationdhisdataconnection_id_seq');
    ALTER TABLE intergrationdhisdataconnection ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "intergrationtiisdataconnection" OWNER TO "postgres";
    CREATE SEQUENCE intergrationtiisdataconnection_id_seq AS BIGINT OWNED BY intergrationtiisdataconnection.id;
    ALTER TABLE intergrationtiisdataconnection ALTER COLUMN  id SET DEFAULT nextval('intergrationtiisdataconnection_id_seq');
    ALTER TABLE intergrationtiisdataconnection ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "message" OWNER TO "postgres";
    CREATE SEQUENCE message_id_seq AS BIGINT OWNED BY message.id;
    ALTER TABLE message ALTER COLUMN  id SET DEFAULT nextval('message_id_seq');
    ALTER TABLE message ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "messagemetadata" OWNER TO "postgres";
    CREATE SEQUENCE messagemetadata_id_seq AS BIGINT OWNED BY messagemetadata.id;
    ALTER TABLE messagemetadata ALTER COLUMN  id SET DEFAULT nextval('messagemetadata_id_seq');
    ALTER TABLE messagemetadata ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "messagethreadmetadata" OWNER TO "postgres";
    CREATE SEQUENCE messagethreadmetadata_id_seq AS BIGINT OWNED BY messagethreadmetadata.id;
    ALTER TABLE messagethreadmetadata ALTER COLUMN  id SET DEFAULT nextval('messagethreadmetadata_id_seq');
    ALTER TABLE messagethreadmetadata ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "messagethread" OWNER TO "postgres";
    CREATE SEQUENCE messagethread_id_seq AS BIGINT OWNED BY messagethread.id;
    ALTER TABLE messagethread ALTER COLUMN  id SET DEFAULT nextval('messagethread_id_seq');
    ALTER TABLE messagethread ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "organisationunit" OWNER TO "postgres";
    CREATE SEQUENCE organisationunit_id_seq AS BIGINT OWNED BY organisationunit.id;
    ALTER TABLE organisationunit ALTER COLUMN  id SET DEFAULT nextval('organisationunit_id_seq');
    ALTER TABLE organisationunit ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "organisationunitcompleteness" OWNER TO "postgres";
    CREATE SEQUENCE organisationunitcompleteness_id_seq AS BIGINT OWNED BY organisationunitcompleteness.id;
    ALTER TABLE organisationunitcompleteness ALTER COLUMN  id SET DEFAULT nextval('organisationunitcompleteness_id_seq');
    ALTER TABLE organisationunitcompleteness ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "organisationunitgroup" OWNER TO "postgres";
    CREATE SEQUENCE organisationunitgroup_id_seq AS BIGINT OWNED BY organisationunitgroup.id;
    ALTER TABLE organisationunitgroup ALTER COLUMN  id SET DEFAULT nextval('organisationunitgroup_id_seq');
    ALTER TABLE organisationunitgroup ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "organisationunitgroupset" OWNER TO "postgres";
    CREATE SEQUENCE organisationunitgroupset_id_seq AS BIGINT OWNED BY organisationunitgroupset.id;
    ALTER TABLE organisationunitgroupset ALTER COLUMN  id SET DEFAULT nextval('organisationunitgroupset_id_seq');
    ALTER TABLE organisationunitgroupset ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "organisationunitlevel" OWNER TO "postgres";
    CREATE SEQUENCE organisationunitlevel_id_seq AS BIGINT OWNED BY organisationunitlevel.id;
    ALTER TABLE organisationunitlevel ALTER COLUMN  id SET DEFAULT nextval('organisationunitlevel_id_seq');
    ALTER TABLE organisationunitlevel ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "record" OWNER TO "postgres";
    CREATE SEQUENCE record_id_seq AS BIGINT OWNED BY record.id;
    ALTER TABLE record ALTER COLUMN  id SET DEFAULT nextval('record_id_seq');
    ALTER TABLE record ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "sqlview" OWNER TO "postgres";
    ALTER TABLE sqlview ALTER COLUMN  id SET DEFAULT nextval('sqlview_id_seq');
    ALTER TABLE sqlview ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "training" OWNER TO "postgres";
    CREATE SEQUENCE training_id_seq AS BIGINT OWNED BY training.id;
    ALTER TABLE training ALTER COLUMN  id SET DEFAULT nextval('training_id_seq');
    ALTER TABLE training ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "trainingcurriculum" OWNER TO "postgres";
    CREATE SEQUENCE trainingcurriculum_id_seq AS BIGINT OWNED BY trainingcurriculum.id;
    ALTER TABLE trainingcurriculum ALTER COLUMN  id SET DEFAULT nextval('trainingcurriculum_id_seq');
    ALTER TABLE trainingcurriculum ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "traininginstance" OWNER TO "postgres";
    CREATE SEQUENCE traininginstance_id_seq AS BIGINT OWNED BY traininginstance.id;
    ALTER TABLE traininginstance ALTER COLUMN  id SET DEFAULT nextval('traininginstance_id_seq');
    ALTER TABLE traininginstance ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "trainingtopic" OWNER TO "postgres";
    CREATE SEQUENCE trainingtopic_id_seq AS BIGINT OWNED BY trainingtopic.id;
    ALTER TABLE trainingtopic ALTER COLUMN  id SET DEFAULT nextval('trainingtopic_id_seq');
    ALTER TABLE trainingtopic ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "trainingsections" OWNER TO "postgres";
    CREATE SEQUENCE trainingsections_id_seq AS BIGINT OWNED BY trainingsections.id;
    ALTER TABLE trainingsections ALTER COLUMN  id SET DEFAULT nextval('trainingsections_id_seq');
    ALTER TABLE trainingsections ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "trainingsponsor" OWNER TO "postgres";
    CREATE SEQUENCE trainingsponsor_id_seq AS BIGINT OWNED BY trainingsponsor.id;
    ALTER TABLE trainingsponsor ALTER COLUMN  id SET DEFAULT nextval('trainingsponsor_id_seq');
    ALTER TABLE trainingsponsor ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "trainingtrainer" OWNER TO "postgres";
    CREATE SEQUENCE trainingtrainer_id_seq AS BIGINT OWNED BY trainingtrainer.id;
    ALTER TABLE trainingtrainer ALTER COLUMN  id SET DEFAULT nextval('trainingtrainer_id_seq');
    ALTER TABLE trainingtrainer ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "trainingunit" OWNER TO "postgres";
    CREATE SEQUENCE trainingunit_id_seq AS BIGINT OWNED BY trainingunit.id;
    ALTER TABLE trainingunit ALTER COLUMN  id SET DEFAULT nextval('trainingunit_id_seq');
    ALTER TABLE trainingunit ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "trainingvenue" OWNER TO "postgres";
    CREATE SEQUENCE trainingvenue_id_seq AS BIGINT OWNED BY trainingvenue.id;
    ALTER TABLE trainingvenue ALTER COLUMN  id SET DEFAULT nextval('trainingvenue_id_seq');
    ALTER TABLE trainingvenue ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    CREATE SEQUENCE trainingsession_id_seq AS BIGINT OWNED BY trainingsession.id;
    ALTER TABLE trainingsession ALTER COLUMN id SET DEFAULT nextval('trainingsession_id_seq');
    ALTER TABLE trainingsession ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "userauthority" OWNER TO "postgres";
    ALTER TABLE userauthority ALTER COLUMN  id SET DEFAULT nextval('userauthority_id_seq');
    ALTER TABLE userauthority ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE "fieldgroupmembers" OWNER TO "postgres";
    ALTER TABLE "fieldgroupset" OWNER TO "postgres";
    ALTER TABLE "fieldgroupsetmembers" OWNER TO "postgres";
    ALTER TABLE "fieldoptiongroupmembers" OWNER TO "postgres";
    ALTER TABLE "fieldoptiongroupsetmembers" OWNER TO "postgres";   
    ALTER TABLE "fieldrelation" OWNER TO "postgres";
    ALTER TABLE "formfieldmember" OWNER TO "postgres";
    ALTER TABLE "formsectionfieldmember" OWNER TO "postgres";
    ALTER TABLE "formuniquerecordfields" OWNER TO "postgres"; 
    ALTER TABLE "formvisiblefield" OWNER TO "postgres";
    ALTER TABLE "friendlyreportarithmeticfilter" OWNER TO "postgres";
    ALTER TABLE "friendlyreportcategory" OWNER TO "postgres";
    ALTER TABLE "friendlyreportrelationalfilter" OWNER TO "postgres";
    ALTER TABLE "intergrationdhisdataelementfieldoptionrelation" OWNER TO "postgres";
    ALTER TABLE "intergrationdhisfieldoptiongroupsetmember" OWNER TO "postgres";
    ALTER TABLE "intergrationtiisemployeefieldrelation" OWNER TO "postgres";
    ALTER TABLE "leave" OWNER TO "postgres";
    ALTER TABLE "organisationunitgroupmembers" OWNER TO "postgres";
    ALTER TABLE "relationalfiltermember" OWNER TO "postgres";
    ALTER TABLE "userrolemembers" OWNER TO "postgres";
    ALTER TABLE "validation" OWNER TO "postgres";
    CREATE SEQUENCE validation_id_seq AS BIGINT OWNED BY validation.id;
    ALTER TABLE validation ALTER COLUMN  id SET DEFAULT nextval('validation_id_seq');
    ALTER TABLE validation ALTER COLUMN created SET DEFAULT LOCALTIMESTAMP;

    ALTER TABLE public."user" DROP COLUMN email_canonical;

    ALTER TABLE field ADD COLUMN recordvalueid BIGINT;

    `;
    await queryRunner.query(fixes);

    await queryRunner.query(
      'ALTER TABLE "user" RENAME COLUMN "organisationunit_id" TO "organisationunitid"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
