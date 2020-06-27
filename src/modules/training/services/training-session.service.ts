import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/services/base.service';
import { RecordValue } from 'src/modules/record/entities/record-value.entity';
import { In, Repository, getConnection } from 'typeorm';
import { generateUid } from '../../../core/helpers/makeuid';
import { Record } from '../../../modules/record/entities/record.entity';
import { SessionFacilitator } from '../entities/training-session-facilitatory.entity';
import { SessionParticipant } from '../entities/training-session-participant.entity';
import { TrainingSession } from '../entities/training-session.entity';
import { TrainingSection } from '../entities/training-section.entity';
import { Training } from '../entities/training.entity';
import { TrainingUnit } from '../entities/training-unit.entity';
import { TrainingCurriculum } from '../entities/training-curriculum.entity';
import { TrainingTopic } from '../entities/training-topic.entity';
import { TrainingVenue } from '../entities/training-venue.entity';
import { TrainingSponsor } from '../entities/training-sponsor.entity';
import { OrganisationUnit } from 'src/modules/organisation-unit/entities/organisation-unit.entity';
import { User } from 'src/modules/system/user/entities/user.entity';
import { TrainingSessionAccess } from '../entities/training-session-access.entity';

@Injectable()
export class TrainingSessionService extends BaseService<TrainingSession> {
  constructor(
    @InjectRepository(TrainingSession)
    private trainingSessionRepository: Repository<TrainingSession>,
    @InjectRepository(SessionParticipant)
    private participantRepository: Repository<SessionParticipant>,
    @InjectRepository(SessionFacilitator)
    private facilitatorRepository: Repository<SessionFacilitator>,
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
    @InjectRepository(TrainingSection)
    private trainingSectionRepository: Repository<TrainingSection>,
    @InjectRepository(TrainingUnit)
    private trainingUnitRepository: Repository<TrainingUnit>,
    @InjectRepository(TrainingCurriculum)
    private trainingCurriculumRepository: Repository<TrainingCurriculum>,
    @InjectRepository(TrainingTopic)
    private topicRepository: Repository<TrainingTopic>,
    @InjectRepository(TrainingVenue)
    private trainingVenueRepository: Repository<TrainingVenue>,
    @InjectRepository(TrainingSponsor)
    private trainingSponsorRepository: Repository<TrainingSponsor>,
    @InjectRepository(OrganisationUnit)
    private organisationunitRepository: Repository<OrganisationUnit>,
    @InjectRepository(TrainingTopic)
    private trainingTopicRepository: Repository<TrainingTopic>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TrainingSessionAccess)
    private trainingSessionAccess: Repository<TrainingSessionAccess>,
  ) {
    super(trainingSessionRepository, TrainingSession);
  }
  async deliverymode() {
    let deliverymode: {};
    return (deliverymode = {
      deliverymode: [
        { id: 'Classroom Training', name: 'Classroom Training' },
        { id: 'On Job Training', name: 'On Job Training' },
        { id: 'Mentorship', name: 'Mentorship' },
        { id: 'Online', name: 'Online' },
      ],
    });
  }
  async getParticipants(uid: string) {
    const session = (await this.trainingSessionRepository.findOne({ uid })).id;
    let participants = await this.participantRepository.find({
      where: {
        trainingsessionId: session,
      },
    });
    if (participants[0] == undefined) {
      throw new NotFoundException(
        `Participants are not available for this training session `,
      );
    }
    return {
      participants: await this.recordRepository.find({
        relations: ['recordValues', 'recordValues.field'],
        where: {
          id: In(participants.map((participant) => participant.recordId)),
        },
      }),
    };
  }

  async getFacilitators(uid: string) {
    const session = (await this.trainingSessionRepository.findOne({ uid })).id;
    let facilitators = await this.facilitatorRepository.find({
      where: {
        trainingsessionId: session,
      },
    });
    if (facilitators[0] == undefined) {
      throw new NotFoundException(
        `Facilitators are not available for this training session `,
      );
    }
    return {
      facilitators: await this.recordRepository.find({
        relations: ['recordValues', 'recordValues.field'],
        where: {
          id: In(facilitators.map((facilitator) => facilitator.recordId)),
        },
      }),
    };
  }

  async addParticipant(uid: string, createParticipantDto: any) {
    const { record } = createParticipantDto;
    const records = await this.recordRepository.find({
      where: [{ uid: record }],
    });
    const recordid = records[0].id;
    const trainingsession = (
      await this.trainingSessionRepository.findOne({ uid })
    ).id;
    const participant = new SessionParticipant();
    participant.uid = generateUid();
    participant.trainingsessionId = trainingsession;
    participant.recordId = recordid;
    return await this.participantRepository.save(participant);
  }

  async addFacilitator(uid: string, createFacilitatorDto: any) {
    const { record } = createFacilitatorDto;
    const records = await this.recordRepository.find({
      where: [{ uid: record }],
    });
    const recordid = records[0].id;
    const trainingsession = (
      await this.trainingSessionRepository.findOne({ uid })
    ).id;
    const facilitator = new SessionFacilitator();
    facilitator.uid = generateUid();
    facilitator.trainingsessionId = trainingsession;
    facilitator.recordId = recordid;
    return await this.facilitatorRepository.save(facilitator);
  }

  async deleteFacilitator(uid: string, record: any) {
    const records = await this.recordRepository.find({
      where: [{ uid: record }],
    });

    const sessionid = (await this.trainingSessionRepository.findOne({ uid }))
      .id;
    const recordid = records[0].id;
    const facilitators = await this.facilitatorRepository.find({
      select: ['id'],
      where: [{ recordId: recordid, trainingsessionId: sessionid }],
    });
    if (facilitators[0] == undefined) {
      throw new NotFoundException(`Facilitator is not available `);
    }
    const facilitator = facilitators[0].id;
    const id = {
      id: facilitator,
      trainingsessionId: sessionid,
      recordId: recordid,
    };
    let deletedFacilitator = await this.facilitatorRepository.delete(id);
    return deletedFacilitator;
  }

  async deleteParticipant(uid: string, record: any) {
    const records = await this.recordRepository.find({
      where: [{ uid: record }],
    });
    const sessionid = (await this.trainingSessionRepository.findOne({ uid }))
      .id;
    const recordid = records[0].id;
    const participants = await this.participantRepository.find({
      select: ['id'],
      where: [{ recordId: recordid, trainingsessionId: sessionid }],
    });

    if (participants[0] == undefined) {
      throw new NotFoundException(`Participant is not available `);
    }
    const participant = participants[0].id;
    const id = {
      id: participant,
      trainingsessionId: sessionid,
      recordId: recordid,
    };
    let deletedParticipants = await this.participantRepository.delete(id);
    return deletedParticipants;
  }
  async createSession(createSessionDTO: any) {
    const {
      section,
      unit,
      curriculum,
      deliveryMode,
      topics,
      orgunit,
      venue,
      sponsor,
      organiser,
      facilitators,
      participants,
      startDate,
      endDate,
    } = createSessionDTO;

    const session = new TrainingSession();
    const sections = await this.trainingSectionRepository.manager.query(
      `SELECT id FROM trainingsections WHERE uid='${section}'`,
    );

    const sectionid = sections[0].id;
    const units = await this.trainingUnitRepository.manager.query(
      `SELECT id FROM trainingunit WHERE uid='${unit}'`,
    );
    const unitid = units[0].id;
    const organisationunits = await this.organisationunitRepository.manager.query(
      `SELECT id FROM organisationunit WHERE uid='${orgunit}'`,
    );
    const organisationunitid = organisationunits[0].id;
    const curriculums = await this.trainingCurriculumRepository.manager.query(
      `SELECT id FROM trainingcurriculum WHERE uid='${curriculum}'`,
    );
    const curriculumid = curriculums[0].id;
    const sponsors = await this.trainingSponsorRepository.manager.query(
      `SELECT id FROM trainingsponsor WHERE uid='${sponsor}'`,
    );
    const sponsorid = sponsors[0].id;
    const venues = await this.trainingVenueRepository.manager.query(
      ` SELECT id FROM trainingvenue WHERE uid='${venue}'`,
    );
    const venueid = venues[0].id;

    const organizers = await this.trainingSponsorRepository.manager.query(
      `SELECT id FROM trainingsponsor WHERE uid='${organiser}'`,
    );
    const orginiserid = organizers[0].id;

    session.uid = generateUid();
    session.organiser = orginiserid;
    session.venue = venueid;
    session.deliverymode = deliveryMode;
    session.sponsor = sponsorid;
    session.curriculum = curriculumid;
    session.enddate = endDate;
    session.startdate = startDate;
    session.organisationUnit = organisationunitid;
    session.startdate = startDate;
    session.enddate = endDate;
    await this.trainingSessionRepository.save(session);
    return this.trainingSessionRepository.findOne({ uid: session.uid });
  }
  async saveTopics(uid: string, saveTopicsDTO: any) {
    const { topic } = saveTopicsDTO;
    const session = (await this.trainingSessionRepository.findOne({ uid: uid }))
      .id;
    const topics = (
      await this.trainingTopicRepository.findOne({
        select: ['id'],
        where: [{ uid: topic }],
      })
    ).id;
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('trainingsessiontopics')
      .values([{ trainingsessionId: session, trainingtopicId: topics }])
      .execute();
  }

  async findOneParticipant(uid: string) {
    return await this.recordRepository.findOne({ uid: uid });
  }
  async updateParticipant(uid: string, updateParticipantDTO: any) {
    const participant = await this.recordRepository.findOne({ uid: uid });
    const {
      certified,
      assessed,
      certifiedby,
      certificationdate,
      assessedby,
      assessmentdate,
    } = updateParticipantDTO;

    if (assessedby !== undefined && certifiedby === undefined) {
      const assesser = await this.userRepository.manager.query(
        `SELECT ID FROM "user" WHERE uid='${assessedby}'`,
      );
      participant.assessed = assessed;
      participant.assesser = assesser[0].id;
      participant.assessmentdate = assessmentdate;

      await this.recordRepository.save(participant);
      const participants = await this.recordRepository.findOne({
        where: { uid: participant.uid },
        join: {
          alias: 'record',
          leftJoinAndSelect: {
            assessedby: 'record.assesser',
          },
        },
      });
      return participants;
    }
    if (certifiedby !== undefined && assessedby === undefined) {
      const certifier = await this.userRepository.manager.query(
        `SELECT ID FROM "user" WHERE uid='${certifiedby}'`,
      );
      participant.certified = certified;
      participant.certifier = certifier[0].id;
      participant.certificationdate = certificationdate;

      await this.recordRepository.save(participant);
      const participants = await this.recordRepository.findOne({
        where: { uid: participant.uid },
        join: {
          alias: 'record',
          leftJoinAndSelect: {
            certifiedby: 'record.certifier',
          },
        },
      });
      return participants;
    }
    if (assessedby !== undefined && certifiedby !== undefined) {
      const certifier = await this.userRepository.manager.query(
        `SELECT ID FROM "user" WHERE uid='${certifiedby}'`,
      );
      const assesser = await this.userRepository.manager.query(
        `SELECT ID FROM "user" WHERE uid='${assessedby}'`,
      );
      participant.assessed = assessed;
      participant.certified = certified;
      participant.assesser = assesser[0].id;
      participant.certificationdate = certifier[0].id;
      participant.assessmentdate = assessmentdate;
      participant.certificationdate = certificationdate;

      await this.recordRepository.save(participant);
      const participants = await this.recordRepository.findOne({
        where: { uid: participant.uid },
        join: {
          alias: 'record',
          leftJoinAndSelect: {
            assessedby: 'record.assesser',
            certifiedby: 'record.certifier',
          },
        },
      });
      return participants;
    }
  }
  async sessionSharingCreation(uid: String, sessionsharingDTO) {
    const session = (
      await this.trainingSessionRepository.findOne({ where: { uid: uid } })
    ).id;
    const { user, access } = sessionsharingDTO;
    const userId = (await this.userRepository.findOne({ where: { uid: user } }))
      .id;

    const useraccess = await getConnection()
      .createQueryBuilder()
      .insert()
      .into('trainingsessionaccess')
      .values([
        {
          userid: userId,
          access: access,
          uid: generateUid(),
        },
      ])
      .execute();
    if (useraccess !== undefined) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('sessionuseraccess')
        .values([
          {
            trainingsessionId: session,
            trainingsessionaccessId: useraccess.identifiers[0].id,
          },
        ])
        .execute();
    }
  }
  async sessionSharingEdit(uid: string, editSessionDTO) {
    const { user, access } = editSessionDTO;
    const userId = (
      await this.userRepository.findOne({
        where: { uid: user },
      })
    ).id;
    const accessId = await this.trainingSessionAccess.findOne({
      where: { userid: userId },
    });
    accessId.access = access;
    await this.trainingSessionAccess.save(accessId);
  }
  async SharedUser(uid: string) {
    const user = (await this.userRepository.findOne({ where: { uid: uid } }))
      .id;

    const sessionaccessuser = await this.trainingSessionAccess.findOne({
      where: { userid: user },
    });
    return sessionaccessuser;
  }
}
