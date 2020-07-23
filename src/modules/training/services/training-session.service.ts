import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, In, Repository } from 'typeorm';
import { BaseService } from '../../../core/services/base.service';
import { OrganisationUnit } from '../../organisation-unit/entities/organisation-unit.entity';
import { Record } from '../../record/entities/record.entity';
import { User } from '../../system/user/entities/user.entity';
import { TrainingCurriculum } from '../entities/training-curriculum.entity';
import { TrainingSection } from '../entities/training-section.entity';
import { TrainingSessionAccess } from '../entities/training-session-access.entity';
import { SessionFacilitator } from '../entities/training-session-facilitatory.entity';
import { SessionParticipant } from '../entities/training-session-participant.entity';
import { TrainingSession } from '../entities/training-session.entity';
import { TrainingSponsor } from '../entities/training-sponsor.entity';
import { TrainingTopic } from '../entities/training-topic.entity';
import { TrainingUnit } from '../entities/training-unit.entity';
import { TrainingVenue } from '../entities/training-venue.entity';

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
        { id: 'On Job Training (OJT)', name: 'On Job Training (OJT)' },
        { id: 'Mentorship', name: 'Mentorship' },
        { id: 'Online', name: 'Online' },
      ],
    });
  }
  async getParticipants(uid: string) {
    let participants = await this.participantRepository.find({
      where: {
        trainingsessionId: (
          await this.trainingSessionRepository.findOne({ uid })
        ).id,
      },
    });
    if (participants[0] == undefined) {
      return { participants: [] };
    }
    return {
      participants: await this.recordRepository.find({
        relations: [
          'recordValues',
          'recordValues.field',
          'organisationUnit',
          'organisationUnit.parent',
        ],
        where: {
          id: In(participants.map((participant) => participant.recordId)),
        },
      }),
    };
  }

  async getFacilitators(uid: string) {
    let facilitators = await this.facilitatorRepository.find({
      where: {
        trainingsessionId: (
          await this.trainingSessionRepository.findOne({ uid })
        ).id,
      },
    });
    if (facilitators[0] == undefined) {
      return { facilitators: [] };
    }
    return {
      facilitators: await this.recordRepository.find({
        relations: [
          'recordValues',
          'recordValues.field',
          'organisationUnit',
          'organisationUnit.parent',
        ],
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
    facilitator.trainingsessionId = trainingsession;
    facilitator.recordId = recordid;
    return await this.facilitatorRepository.save(facilitator);
  }

  async deleteFacilitator(uid: string, record: any) {
    const facilitators = await this.facilitatorRepository.findOne({
      where: [
        {
          recordId: (
            await this.recordRepository.findOne({
              where: { uid: record },
            })
          ).id,
          trainingsessionId: (
            await this.trainingSessionRepository.findOne({ uid })
          ).id,
        },
      ],
    });
    if (facilitators == undefined || Object.keys(facilitators).length < 2) {
      throw new NotFoundException(`Facilitator is not available `);
    }

    let deletedFacilitator = await this.facilitatorRepository.delete(
      facilitators,
    );
    return deletedFacilitator;
  }

  async deleteParticipant(uid: string, record: any) {
    const participants = await this.participantRepository.findOne({
      where: [
        {
          recordId: (
            await this.recordRepository.findOne({
              where: { uid: record },
            })
          ).id,
          trainingsessionId: (
            await this.trainingSessionRepository.findOne({ uid })
          ).id,
        },
      ],
    });
    if (participants == undefined || Object.keys(participants).length < 2) {
      throw new NotFoundException(`Participant is not available `);
    }

    let deletedParticipants = await this.participantRepository.delete(
      participants,
    );
    return deletedParticipants;
  }
  async createSession(createSessionDTO: any) {
    const {
      curriculum,
      deliveryMode,
      topics,
      orgunit,
      venue,
      sponsor,
      organiser,
      facilitators,
      participants,
    } = createSessionDTO;
    const session = new TrainingSession();
    Object.keys(createSessionDTO).forEach((key) => {
      session[key] = createSessionDTO[key];
    });

    session.organiser = await this.trainingSponsorRepository.findOne({
      where: { uid: organiser },
    });
    session.venue = await this.trainingVenueRepository.findOne({
      where: { uid: venue },
    });
    session.deliverymode = deliveryMode;
    session.sponsor = await this.trainingSponsorRepository.findOne({
      where: { uid: sponsor },
    });
    session.curriculum = await this.trainingCurriculumRepository.findOne({
      where: { uid: curriculum },
    });
    session.organisationUnit = await this.organisationunitRepository.findOne({
      where: { uid: orgunit },
    });
    await this.trainingSessionRepository.save(session);

    const savedsession = await this.trainingSessionRepository.findOne({
      uid: session.uid,
    });
    /*
     * TODO: ADD CHECKS FOR WHEN TOICS CONTAIN AN EMPTY ARRAY
     */
    if (
      topics &&
      typeof topics !== undefined &&
      topics !== null &&
      topics.length !== null &&
      topics.length > 0
    ) {
      const topic = await this.trainingTopicRepository.find({
        where: { uid: In(topics ? topics.map((topic) => topic) : '') },
      });
      for (let topics of topic) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into('trainingsessiontopics')
          .values([
            {
              trainingsessionId: savedsession.id,
              trainingtopicId: topics.id,
            },
          ])
          .execute();
      }
    }
    /*
     * TODO: ADD CHECKS FOR WHEN FACILITATORS CONTAIN AN EMPTY ARRAY
     */
    if (
      facilitators &&
      typeof facilitators !== undefined &&
      facilitators !== null &&
      facilitators.length !== null &&
      facilitators.length > 0
    ) {
      const facilitator = await this.recordRepository.find({
        where: { uid: In(facilitators.map((facilitator) => facilitator)) },
      });
      for (let facilitators of facilitator) {
        await this.facilitatorRepository.save({
          recordId: facilitators.id,
          trainingsessionId: savedsession.id,
        });
      }
    }
    /*
     * TODO: ADD CHECKS FOR WHEN PARTICIPANTS CONTAIN AN EMPTY ARRAY
     */
    if (
      participants &&
      typeof participants !== undefined &&
      participants !== null &&
      participants.length !== null &&
      participants.length > 0
    ) {
      const participant = await this.recordRepository.find({
        where: {
          uid: In(participants.map((participant: string) => participant)),
        },
      });

      for (let participants of participant) {
        await this.participantRepository.save({
          recordId: participants.id,
          trainingsessionId: savedsession.id,
        });
      }
    }

    return savedsession;
  }
  async findOneParticipant(uid: string) {
    return await this.recordRepository.findOne({ uid: uid });
  }
  async updateParticipants(
    session: string,
    record: string,
    updateParticipantDTO: any,
  ) {
    const recordid = (
      await this.recordRepository.findOne({
        where: { uid: record },
      })
    ).id;
    const sessionid = (
      await this.trainingSessionRepository.findOne({
        where: { uid: session },
      })
    ).id;
    const {
      certified,
      assessed,
      certifiedby,
      certificationdate,
      assessedby,
      assessmentdate,
    } = updateParticipantDTO;

    await this.participantRepository.update(
      { recordId: recordid, trainingsessionId: sessionid },
      {
        certified: certified,
        assessed: assessed,
        certifiedby:
          certifiedby && certifiedby != ''
            ? await this.userRepository.findOne({
                uid: certifiedby,
              })
            : null,
        certificationdate:
          certificationdate && certificationdate != ''
            ? certificationdate
            : null,
        assessmentdate:
          assessmentdate && assessmentdate != null ? assessmentdate : null,
        assessedby:
          assessedby && assessedby != ''
            ? await this.userRepository.findOne({
                uid: assessedby,
              })
            : null,
      },
    );
    return await this.participantRepository.findOne({
      where: { recordId: recordid, trainingsessionId: sessionid },
    });
  }
  async sessionSharingCreation(uid: String, sessionsharingDTO) {
    const shareduser = await this.userRepository.findOne({
      where: { uid: sessionsharingDTO.user },
    });
    const sessionaccess = new TrainingSessionAccess();
    const session = await this.trainingSessionRepository.findOne({
      where: { uid: uid },
    });
    sessionaccess.userid = (
      await this.userRepository.findOne({
        where: { uid: sessionsharingDTO.user },
      })
    ).id;

    sessionaccess.access = sessionsharingDTO.access;

    const sharedsession = await this.trainingSessionAccess.save(sessionaccess);

    if (sharedsession !== undefined) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('sessionuseraccess')
        .values([
          {
            trainingsessionId: session.id,
            trainingsessionaccessId: sharedsession.id,
          },
        ])
        .execute();
    }
    return {
      message: `Session with ID ${uid} shared with ${shareduser.firstName}`,
      session: sharedsession,
    };
  }
  async sessionSharingEdit(uid: string, editSessionDTO) {
    const { user, access } = editSessionDTO;
    const shareduser = await this.userRepository.findOne({
      where: { uid: editSessionDTO.user },
    });
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
    return {
      message: `Session with ID ${uid} shared with ${shareduser.firstName}`,
      sessionaccess: accessId,
    };
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
