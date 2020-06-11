import { MigrationInterface, QueryRunner } from 'typeorm';

export class sequential1585499925311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userid = await queryRunner.query(
        `SELECT id FROM "user" ORDER BY id DESC LIMIT 1`,
      );
      const nextUser = userid[0]
        ? parseInt(userid[0].id) + parseInt('1')
        : parseInt('1');
      await queryRunner.query(
        `ALTER SEQUENCE user_id_seq RESTART WITH ${nextUser};`,
      );

    const usersettingid = await queryRunner.query(
      `SELECT id FROM usersetting ORDER BY id DESC LIMIT 1`,
    );
    const nextusersetting = usersettingid[0]
      ? parseInt(usersettingid[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE usersetting_id_seq RESTART WITH ${nextusersetting}`,
    );

    const appid = await queryRunner.query(
      `SELECT id FROM app ORDER BY id DESC LIMIT 1`,
    );
    const nextapp = appid[0]
      ? parseInt(appid[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE app_id_seq RESTART WITH ${nextapp}`,
    );

    const usergroup_id_seq = await queryRunner.query(
      `SELECT id FROM usergroup ORDER BY id DESC LIMIT 1`,
    );
    const nextusergroup = usergroup_id_seq[0]
      ? parseInt(usergroup_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE usergroup_id_seq RESTART WITH ${nextusergroup}`,
    );

    const reporttable_id_seq = await queryRunner.query(
      `SELECT id FROM reporttable ORDER BY id DESC LIMIT 1`,
    );
    const nextreporttable = reporttable_id_seq[0]
      ? parseInt(reporttable_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE reporttable_id_seq RESTART WITH ${nextreporttable}`,
    );

    const reporttabledimension_id_seq = await queryRunner.query(
      `SELECT id FROM reporttabledimension ORDER BY id DESC LIMIT 1`,
    );
    const nextreporttabledimension = reporttabledimension_id_seq[0]
      ? parseInt(reporttabledimension_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE reporttabledimension_id_seq RESTART WITH ${nextreporttabledimension}`,
    );

    const reporttabledimensionitem_id_seq = await queryRunner.query(
      `SELECT id FROM reporttabledimensionitem ORDER BY id DESC LIMIT 1`,
    );
    const nextreporttabledimensionitem = reporttabledimensionitem_id_seq[0]
      ? parseInt(reporttabledimensionitem_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE reporttabledimensionitem_id_seq RESTART WITH ${nextreporttabledimensionitem}`,
    );

    const chart_id_seq = await queryRunner.query(
      `SELECT id FROM chart ORDER BY id DESC LIMIT 1`,
    );
    const nextchart = chart_id_seq[0]
      ? parseInt(chart_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE chart_id_seq RESTART WITH ${nextchart}`,
    );

    const chartdimension_id_seq = await queryRunner.query(
      `SELECT id FROM chartdimension ORDER BY id DESC LIMIT 1`,
    );
    const nextchartdimension = chartdimension_id_seq[0]
      ? parseInt(chartdimension_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE chartdimension_id_seq RESTART WITH ${nextchartdimension}`,
    );

    const chartdimensionitem_id_seq = await queryRunner.query(
      `SELECT id FROM chartdimensionitem ORDER BY id DESC LIMIT 1`,
    );
    const nextchartdimensionitem = chartdimensionitem_id_seq[0]
      ? parseInt(chartdimensionitem_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE chartdimensionitem_id_seq RESTART WITH ${nextchartdimensionitem}`,
    );

    const map_id_seq = await queryRunner.query(
      `SELECT id FROM map ORDER BY id DESC LIMIT 1`,
    );
    const nextmap = map_id_seq[0]
      ? parseInt(map_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE map_id_seq RESTART WITH ${nextmap}`,
    );

    const mapview_id_seq = await queryRunner.query(
      `SELECT id FROM mapview ORDER BY id DESC LIMIT 1`,
    );
    const nextmapview = mapview_id_seq[0]
      ? parseInt(mapview_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE mapview_id_seq RESTART WITH ${nextmapview}`,
    );

    const mapviewdimension_id_seq = await queryRunner.query(
      `SELECT id FROM mapviewdimension ORDER BY id DESC LIMIT 1`,
    );
    const nextmapviewdimension = mapviewdimension_id_seq[0]
      ? parseInt(mapviewdimension_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE mapviewdimension_id_seq RESTART WITH ${nextmapviewdimension}`,
    );

    const mapviewdimensionitem_id_seq = await queryRunner.query(
      `SELECT id FROM mapviewdimensionitem ORDER BY id DESC LIMIT 1`,
    );
    const nextmapviewdimensionitem = mapviewdimensionitem_id_seq[0]
      ? parseInt(mapviewdimensionitem_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE mapviewdimensionitem_id_seq RESTART WITH ${nextmapviewdimensionitem}`,
    );

    const dashboard_id_seq = await queryRunner.query(
      `SELECT id FROM dashboard ORDER BY id DESC LIMIT 1`,
    );
    const nextdashboard = dashboard_id_seq[0]
      ? parseInt(dashboard_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE dashboard_id_seq RESTART WITH ${nextdashboard}`,
    );

    const dashboarditem_id_seq = await queryRunner.query(
      `SELECT id FROM dashboarditem ORDER BY id DESC LIMIT 1`,
    );
    const nextdashboarditem = dashboarditem_id_seq[0]
      ? parseInt(dashboarditem_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE dashboarditem_id_seq RESTART WITH ${nextdashboarditem}`,
    );

    const report_id_seq = await queryRunner.query(
      `SELECT id FROM report ORDER BY id DESC LIMIT 1`,
    );
    const nextreport = report_id_seq[0]
      ? parseInt(report_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE report_id_seq RESTART WITH ${nextreport}`,
    );

    const reportgroup_id_seq = await queryRunner.query(
      `SELECT id FROM reportgroup ORDER BY id DESC LIMIT 1`,
    );
    const nextreportgroup = reportgroup_id_seq[0]
      ? parseInt(reportgroup_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE reportgroup_id_seq RESTART WITH ${nextreportgroup}`,
    );

    const trainingsession_id_seq = await queryRunner.query(
      `SELECT id FROM trainingsession ORDER BY id DESC LIMIT 1`,
    );
    const nexttrainingsession = trainingsession_id_seq[0]
      ? parseInt(trainingsession_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE trainingsession_id_seq RESTART WITH ${nexttrainingsession}`,
    );

    const systeminfo_id_seq = await queryRunner.query(
      `SELECT id FROM systeminfo ORDER BY id DESC LIMIT 1`,
    );
    const nextsysteminfo = systeminfo_id_seq[0]
      ? parseInt(systeminfo_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE systeminfo_id_seq RESTART WITH ${nextsysteminfo}`,
    );

    const datastore_id_seq = await queryRunner.query(
      `SELECT id FROM datastore ORDER BY id DESC LIMIT 1`,
    );
    const nextdatastore = datastore_id_seq[0]
      ? parseInt(datastore_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE datastore_id_seq RESTART WITH ${nextdatastore}`,
    );

    const systemsetting_id_seq = await queryRunner.query(
      `SELECT id FROM systemsetting ORDER BY id DESC LIMIT 1`,
    );
    const nextsystemsetting = systemsetting_id_seq[0]
      ? parseInt(systemsetting_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE systemsetting_id_seq RESTART WITH ${nextsystemsetting}`,
    );

    const userrole_id_seq = await queryRunner.query(
      `SELECT id FROM userrole ORDER BY id DESC LIMIT 1`,
    );
    const nextuserrole = userrole_id_seq[0]
      ? parseInt(userrole_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE userrole_id_seq RESTART WITH ${nextuserrole}`,
    );

    const form_id_seq = await queryRunner.query(
      `SELECT id FROM form ORDER BY id DESC LIMIT 1`,
    );
    const nextform = form_id_seq[0]
      ? parseInt(form_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE form_id_seq RESTART WITH ${nextform}`,
    );

    const fieldoption_id_seq = await queryRunner.query(
      `SELECT id FROM fieldoption ORDER BY id DESC LIMIT 1`,
    );
    const nextfieldoption = fieldoption_id_seq[0]
      ? parseInt(fieldoption_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE fieldoption_id_seq RESTART WITH ${nextfieldoption}`,
    );

    const fieldoptionmerge_id_seq = await queryRunner.query(
      `SELECT id FROM fieldoptionmerge ORDER BY id DESC LIMIT 1`,
    );
    const nextfieldoptionmerge = fieldoptionmerge_id_seq[0]
      ? parseInt(fieldoptionmerge_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE fieldoptionmerge_id_seq RESTART WITH ${nextfieldoptionmerge}`,
    );

    const fieldoptiongroupset_id_seq = await queryRunner.query(
      `SELECT id FROM fieldoptiongroupset ORDER BY id DESC LIMIT 1`,
    );
    const nextfieldoptiongroupset = fieldoptiongroupset_id_seq[0]
      ? parseInt(fieldoptiongroupset_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE fieldoptiongroupset_id_seq RESTART WITH ${nextfieldoptiongroupset}`,
    );

    const field_id_seq = await queryRunner.query(
      `SELECT id FROM field ORDER BY id DESC LIMIT 1`,
    );
    const nextfield = field_id_seq[0]
      ? parseInt(field_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE field_id_seq RESTART WITH ${nextfield}`,
    );

    const fielddatatype_id_seq = await queryRunner.query(
      `SELECT id FROM fielddatatype ORDER BY id DESC LIMIT 1`,
    );
    const nextfielddatatype = fielddatatype_id_seq[0]
      ? parseInt(fielddatatype_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE fielddatatype_id_seq RESTART WITH ${nextfielddatatype}`,
    );

    const fieldgroup_id_seq = await queryRunner.query(
      `SELECT id FROM fieldgroup ORDER BY id DESC LIMIT 1`,
    );
    const nextfieldgroup = fieldgroup_id_seq[0]
      ? parseInt(fieldgroup_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE fieldgroup_id_seq RESTART WITH ${nextfieldgroup}`,
    );

    const fieldinputtype_id_seq = await queryRunner.query(
      `SELECT id FROM fieldinputtype ORDER BY id DESC LIMIT 1`,
    );
    const nextfieldinputtype = fieldinputtype_id_seq[0]
      ? parseInt(fieldinputtype_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE fieldinputtype_id_seq RESTART WITH ${nextfieldinputtype}`,
    );

    const fieldoptiongroup_id_seq = await queryRunner.query(
      `SELECT id FROM fieldoptiongroup ORDER BY id DESC LIMIT 1`,
    );
    const nextfieldoptiongroup = fieldoptiongroup_id_seq[0]
      ? parseInt(fieldoptiongroup_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE fieldoptiongroup_id_seq RESTART WITH ${nextfieldoptiongroup}`,
    );

    const friendlyreport_id_seq = await queryRunner.query(
      `SELECT id FROM friendlyreport ORDER BY id DESC LIMIT 1`,
    );
    const nextfriendlyreport = friendlyreport_id_seq[0]
      ? parseInt(friendlyreport_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE friendlyreport_id_seq RESTART WITH ${nextfriendlyreport}`,
    );

    const indicator_id_seq = await queryRunner.query(
      `SELECT id FROM indicator ORDER BY id DESC LIMIT 1`,
    );
    const nextindicator = indicator_id_seq[0]
      ? parseInt(indicator_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE indicator_id_seq RESTART WITH ${nextindicator}`,
    );

    const indicatortarget_id_seq = await queryRunner.query(
      `SELECT id FROM indicatortarget ORDER BY id DESC LIMIT 1`,
    );
    const nextindicatortarget = indicatortarget_id_seq[0]
      ? parseInt(indicatortarget_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE indicatortarget_id_seq RESTART WITH ${nextindicatortarget}`,
    );

    const sessionfacilitator_id_seq = await queryRunner.query(
      `SELECT id FROM sessionfacilitator ORDER BY id DESC LIMIT 1`,
    );
    const nextsessionfacilitator = sessionfacilitator_id_seq[0]
      ? parseInt(sessionfacilitator_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE sessionfacilitator_id_seq RESTART WITH ${nextsessionfacilitator}`,
    );

    const sessionparticipant_id_seq = await queryRunner.query(
      `SELECT id FROM sessionparticipant ORDER BY id DESC LIMIT 1`,
    );
    const nextsessionparticipant = sessionparticipant_id_seq[0]
      ? parseInt(sessionparticipant_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE sessionparticipant_id_seq RESTART WITH ${nextsessionparticipant}`,
    );

    const instancetrainer_id_seq = await queryRunner.query(
      `SELECT id FROM instancetrainer ORDER BY id DESC LIMIT 1`,
    );
    const nextinstancetrainer = instancetrainer_id_seq[0]
      ? parseInt(instancetrainer_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE instancetrainer_id_seq RESTART WITH ${nextinstancetrainer}`,
    );

    const intergrationdhisdataconnection_id_seq = await queryRunner.query(
      `SELECT id FROM intergrationdhisdataconnection ORDER BY id DESC LIMIT 1`,
    );
    const nextintergrationdhisdataconnection = intergrationdhisdataconnection_id_seq[0]
      ? parseInt(intergrationdhisdataconnection_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE intergrationdhisdataconnection_id_seq RESTART WITH ${nextintergrationdhisdataconnection}`,
    );

    const intergrationtiisdataconnection_id_seq = await queryRunner.query(
      `SELECT id FROM intergrationtiisdataconnection ORDER BY id DESC LIMIT 1`,
    );
    const nextintergrationtiisdataconnection = intergrationtiisdataconnection_id_seq[0]
      ? parseInt(intergrationtiisdataconnection_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE intergrationtiisdataconnection_id_seq RESTART WITH ${nextintergrationtiisdataconnection}`,
    );

    const message_id_seq = await queryRunner.query(
      `SELECT id FROM message ORDER BY id DESC LIMIT 1`,
    );
    const nextmessage = message_id_seq[0]
      ? parseInt(message_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE message_id_seq RESTART WITH ${nextmessage}`,
    );

    const messagemetadata_id_seq = await queryRunner.query(
      `SELECT id FROM messagemetadata ORDER BY id DESC LIMIT 1`,
    );
    const nextmessagemetadata = messagemetadata_id_seq[0]
      ? parseInt(messagemetadata_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE messagemetadata_id_seq RESTART WITH ${nextmessagemetadata}`,
    );

    const messagethreadmetadata_id_seq = await queryRunner.query(
      `SELECT id FROM messagethreadmetadata ORDER BY id DESC LIMIT 1`,
    );
    const nextmessagethreadmetadata = messagethreadmetadata_id_seq[0]
      ? parseInt(messagethreadmetadata_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE messagethreadmetadata_id_seq RESTART WITH ${nextmessagethreadmetadata}`,
    );

    const messagethread_id_seq = await queryRunner.query(
      `SELECT id FROM messagethread ORDER BY id DESC LIMIT 1`,
    );
    const nextmessagethread = messagethread_id_seq[0]
      ? parseInt(messagethread_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE messagethread_id_seq RESTART WITH ${nextmessagethread}`,
    );

    const organisationunit_id_seq = await queryRunner.query(
      `SELECT id FROM organisationunit ORDER BY id DESC LIMIT 1`,
    );
    const nextorganisationunit = organisationunit_id_seq[0]
      ? parseInt(organisationunit_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE organisationunit_id_seq RESTART WITH ${nextorganisationunit}`,
    );

    const organisationunitcompleteness_id_seq = await queryRunner.query(
      `SELECT id FROM organisationunitcompleteness ORDER BY id DESC LIMIT 1`,
    );
    const nextorganisationunitcompleteness = organisationunitcompleteness_id_seq[0]
      ? parseInt(organisationunitcompleteness_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE organisationunitcompleteness_id_seq RESTART WITH ${nextorganisationunitcompleteness}`,
    );

    const organisationunitgroup_id_seq = await queryRunner.query(
      `SELECT id FROM organisationunitgroup ORDER BY id DESC LIMIT 1`,
    );
    const nextorganisationunitgroup = organisationunitgroup_id_seq[0]
      ? parseInt(organisationunitgroup_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE organisationunitgroup_id_seq RESTART WITH ${nextorganisationunitgroup}`,
    );

    const organisationunitgroupset_id_seq = await queryRunner.query(
      `SELECT id FROM organisationunitgroupset ORDER BY id DESC LIMIT 1`,
    );
    const nextorganisationunitgroupset = organisationunitgroupset_id_seq[0]
      ? parseInt(organisationunitgroupset_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE organisationunitgroupset_id_seq RESTART WITH ${nextorganisationunitgroupset}`,
    );

    const organisationunitlevel_id_seq = await queryRunner.query(
      `SELECT id FROM organisationunitlevel ORDER BY id DESC LIMIT 1`,
    );
    const nextorganisationunitlevel = organisationunitlevel_id_seq[0]
      ? parseInt(organisationunitlevel_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE organisationunitlevel_id_seq RESTART WITH ${nextorganisationunitlevel}`,
    );

    const record_id_seq = await queryRunner.query(
      `SELECT id FROM record ORDER BY id DESC LIMIT 1`,
    );
    const nextrecord = record_id_seq[0]
      ? parseInt(record_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE record_id_seq RESTART WITH ${nextrecord}`,
    );

    const training_id_seq = await queryRunner.query(
      `SELECT id FROM training ORDER BY id DESC LIMIT 1`,
    );
    const nexttraining = training_id_seq[0]
      ? parseInt(training_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE training_id_seq RESTART WITH ${nexttraining}`,
    );

    const trainingcurriculum_id_seq = await queryRunner.query(
      `SELECT id FROM trainingcurriculum ORDER BY id DESC LIMIT 1`,
    );
    const nexttrainingcurriculum = trainingcurriculum_id_seq[0]
      ? parseInt(trainingcurriculum_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE trainingcurriculum_id_seq RESTART WITH ${nexttrainingcurriculum}`,
    );

    const traininginstance_id_seq = await queryRunner.query(
      `SELECT id FROM traininginstance ORDER BY id DESC LIMIT 1`,
    );
    const nexttraininginstance = traininginstance_id_seq[0]
      ? parseInt(traininginstance_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE traininginstance_id_seq RESTART WITH ${nexttraininginstance}`,
    );

    const trainingtopic_id_seq = await queryRunner.query(
      `SELECT id FROM trainingtopic ORDER BY id DESC LIMIT 1`,
    );
    const nexttrainingtopic = trainingtopic_id_seq[0]
      ? parseInt(trainingtopic_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE trainingtopic_id_seq RESTART WITH ${nexttrainingtopic}`,
    );

    const trainingsections_id_seq = await queryRunner.query(
      `SELECT id FROM trainingsections ORDER BY id DESC LIMIT 1`,
    );
    const nexttrainingsections = trainingsections_id_seq[0]
      ? parseInt(trainingsections_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE trainingsections_id_seq RESTART WITH ${nexttrainingsections}`,
    );

    const trainingsponsor_id_seq = await queryRunner.query(
      `SELECT id FROM trainingsponsor ORDER BY id DESC LIMIT 1`,
    );
    const nexttrainingsponsor = trainingsponsor_id_seq[0]
      ? parseInt(trainingsponsor_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE trainingsponsor_id_seq RESTART WITH ${nexttrainingsponsor}`,
    );

    const trainingtrainer_id_seq = await queryRunner.query(
      `SELECT id FROM trainingtrainer ORDER BY id DESC LIMIT 1`,
    );
    const nexttrainingtrainer = trainingtrainer_id_seq[0]
      ? parseInt(trainingtrainer_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE trainingtrainer_id_seq RESTART WITH ${nexttrainingtrainer}`,
    );

    const trainingunit_id_seq = await queryRunner.query(
      `SELECT id FROM trainingunit ORDER BY id DESC LIMIT 1`,
    );
    const nexttrainingunit = trainingunit_id_seq[0]
      ? parseInt(trainingunit_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE trainingunit_id_seq RESTART WITH ${nexttrainingunit}`,
    );

    const trainingvenue_id_seq = await queryRunner.query(
      `SELECT id FROM trainingvenue ORDER BY id DESC LIMIT 1`,
    );
    const nexttrainingvenue = trainingvenue_id_seq[0]
      ? parseInt(trainingvenue_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE trainingvenue_id_seq RESTART WITH ${nexttrainingvenue}`,
    );

    const validation_id_seq = await queryRunner.query(
      `SELECT id FROM validation ORDER BY id DESC LIMIT 1`,
    );
    const nextvalidation = validation_id_seq[0]
      ? parseInt(validation_id_seq[0].id) + parseInt('1')
      : parseInt('1');
    await queryRunner.query(
      `ALTER SEQUENCE validation_id_seq RESTART WITH ${nextvalidation}`,
    );
    await queryRunner.query(`

    ALTER TABLE "leaverelative" OWNER TO "postgres";
    CREATE SEQUENCE leaverelative_id_seq AS BIGINT OWNED BY leaverelative.id;
    
    ALTER TABLE "leavetype" OWNER TO "postgres";
    CREATE SEQUENCE leavetype_id_seq AS BIGINT OWNED BY leavetype.id;

    ALTER TABLE "indicatorgroup" OWNER TO "postgres";
    CREATE SEQUENCE indicatorgroup_id_seq AS BIGINT OWNED BY indicatorgroup.programindicatorgroupid;

    ALTER TABLE "formsection" OWNER TO "postgres";
    CREATE SEQUENCE formsection_id_seq AS BIGINT OWNED BY formsection.id;

    ALTER TABLE "relationalfilter" OWNER TO "postgres";
    CREATE SEQUENCE relationalfilter_id_seq AS BIGINT OWNED BY relationalfilter.id;
            DROP SEQUENCE ext_log_entries_id_seq;
            DROP SEQUENCE ext_translations_id_seq;
            DROP SEQUENCE hris_arithmeticfilter_id_seq;
            DROP SEQUENCE hris_dashboardchart_id_seq;
            DROP SEQUENCE hris_field_datatype_id_seq;
            DROP SEQUENCE hris_field_id_seq;
            DROP SEQUENCE hris_field_inputtype_id_seq;
            DROP SEQUENCE hris_fieldgroup_id_seq;
            DROP SEQUENCE hris_fieldgroupset_id_seq;
            DROP SEQUENCE hris_fieldoption_id_seq;
            DROP SEQUENCE hris_fieldoptiongroup_id_seq;
            DROP SEQUENCE hris_fieldoptiongroupset_id_seq;
            DROP SEQUENCE hris_fieldoptionmerge_id_seq;
            DROP SEQUENCE hris_form_id_seq;
            DROP SEQUENCE hris_formsection_id_seq;
            DROP SEQUENCE hris_friendlyreport_id_seq;
            DROP SEQUENCE hris_help_chapter_id_seq;
            DROP SEQUENCE hris_help_topic_id_seq;
            DROP SEQUENCE hris_importexport_history_id_seq;
            DROP SEQUENCE hris_indicator_target_id_seq;
            DROP SEQUENCE hris_instance_records_id_seq;
            DROP SEQUENCE hris_instancefacilitator_id_seq;
            DROP SEQUENCE hris_instancetrainer_id_seq;
            DROP SEQUENCE hris_intergration_dhis_data_connection_id_seq;
            DROP SEQUENCE hris_intergration_dhis_dataconnection_id_seq;
            DROP SEQUENCE hris_intergration_tiis_data_connection_id_seq;
            DROP SEQUENCE hris_leave_id_seq;
            DROP SEQUENCE hris_leave_relative_id_seq;
            DROP SEQUENCE hris_leave_type_id_seq;
            DROP SEQUENCE hris_message_id_seq;
            DROP SEQUENCE hris_message_metadata_id_seq;
            DROP SEQUENCE hris_message_thread_id_seq;
            DROP SEQUENCE hris_message_thread_metadata_id_seq;
            DROP SEQUENCE hris_organisationunit_id_seq;
            DROP SEQUENCE hris_organisationunitcompleteness_id_seq;
            DROP SEQUENCE hris_organisationunitgroup_id_seq;
            DROP SEQUENCE hris_organisationunitgroupset_id_seq;
            DROP SEQUENCE hris_organisationunitlevel_id_seq;
            DROP SEQUENCE hris_organisationunitstructure_id_seq;
            DROP SEQUENCE hris_participants_id_seq;
            DROP SEQUENCE hris_record_history_date_id_seq;
            DROP SEQUENCE hris_record_history_id_seq;
            DROP SEQUENCE hris_record_id_seq;
            DROP SEQUENCE hris_record_training_id_seq;
            DROP SEQUENCE hris_relationalfilter_id_seq;
            DROP SEQUENCE hris_resourcetable_id_seq;
            DROP SEQUENCE hris_report_id_seq;
            DROP SEQUENCE hris_trainers_id_seq;
            DROP SEQUENCE hris_training_curriculums_id_seq;
            DROP SEQUENCE hris_training_methods_id_seq;
            DROP SEQUENCE hris_training_sections_id_seq;
            DROP SEQUENCE hris_training_sponsors_id_seq;
            DROP SEQUENCE hris_training_units_id_seq;
            DROP SEQUENCE hris_training_venues_id_seq;
            DROP SEQUENCE hris_traininginstance_id_seq;
            DROP SEQUENCE hris_trainings_id_seq;
            DROP SEQUENCE hris_usersettings_id_seq;
            DROP SEQUENCE hris_user_group_id_seq;
            DROP SEQUENCE hris_user_id_seq;
            DROP SEQUENCE hris_validation_id_seq;
            DROP SEQUENCE sqlview_id_seq CASCADE;
            
            UPDATE formfieldmember SET showinlist=true WHERE formfieldmember.fieldid IN(
              SELECT formfieldmember.fieldid FROM formfieldmember
              INNER JOIN field ON(field.id=formfieldmember.fieldid AND field.name IN(
                'firstname',
                'middlename',
                'surname',
                'sex',
                'dob'
              ))
              INNER JOIN form ON(form.id=formfieldmember.formid AND title='Public Employee Form')
            ) AND
            formfieldmember.formid IN(
              SELECT formfieldmember.formid FROM formfieldmember
              INNER JOIN field ON(field.id=formfieldmember.fieldid AND field.name IN(
                'firstname',
                'middlename',
                'surname',
                'sex',
                'dob'
              ))
              INNER JOIN form ON(form.id=formfieldmember.formid AND title='Public Employee Form')
            );
            update formfieldmember set showinlist = TRUE where fieldid = 140;
            update formfieldmember set showinlist = TRUE where fieldid = 131;
            update formfieldmember set showinlist = TRUE where fieldid = 147;
            update formfieldmember set showinlist = TRUE where fieldid = 157;
            update formfieldmember set showinlist = TRUE where fieldid = 129;
            update formfieldmember set showinlist = TRUE where fieldid = 136;
            update formfieldmember set showinlist = TRUE where fieldid = 162;
            update formfieldmember set ispinned = TRUE where fieldid = 129;
            update formfieldmember set ispinned = TRUE where fieldid = 136;
            ALTER TABLE record ALTER COLUMN instance DROP NOT NULL;
            DROP TABLE sessionparticipant;
            DROP TABLE sessionfacilitator;
            ALTER TABLE participant RENAME TO sessionparticipant;
            ALTER TABLE facilitator RENAME TO sessionfacilitator;
            DROP TABLE traininginstance;
            ALTER TABLE trainingsession RENAME COLUMN venue TO venuename;
            ALTER TABLE trainingsession ADD COLUMN venue BIGINT;
            ALTER TABLE trainingsession
            ADD CONSTRAINT "FK_Venue" FOREIGN KEY (venue) 
            REFERENCES public.trainingvenue (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE;
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
