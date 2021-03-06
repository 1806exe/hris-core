import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import { UserCoreProps } from '../../../../core/entities/user-core-props.entity';
import { generateUid } from '../../../../core/helpers/makeuid';
import {
  passwordCompare,
  passwordHash,
} from '../../../../core/utilities/password-utilities';
import { MessageMetadata } from '../../../message/entities/message-metadata.entity';
import { MessageThreadMetadata } from '../../../message/entities/message-thread-metadata.entity';
import { MessageThread } from '../../../message/entities/message-thread.entity';
import { Message } from '../../../message/entities/message.entity';
import { OrganisationUnit } from '../../../organisation-unit/entities/organisation-unit.entity';
import { RecordRule } from '../../../record-rule/entities/record-rule/record-rule.entity';
import { TrainingSessionAccess } from '../../../training/entities/training-session-access.entity';
import { Dashboard } from '../../../visualization/entities/dashboard.entity';
import { Visualization } from '../../../visualization/entities/visualization.entity';
import { UserGroup } from '../../user-group/entities/user-group.entity';
import { UserRole } from '../../user-role/entities/user-role.entity';
import { UserSettings } from './user-settings.entity';

@Entity('user', { schema: 'public' })
@Unique(['username'])
export class User extends UserCoreProps {
  static plural = 'users';

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({
    type: 'varchar',
    name: 'firstname',
    nullable: true,
    length: 64,
    default: () => 'NULL::varchar',
  })
  firstName: string | null;

  @Column('char', {
    nullable: true,
    length: 13,
    name: 'uid',
  })
  uid: string;

  @Column({
    type: 'varchar',
    name: 'middlename',
    nullable: true,
    length: 64,
    default: () => 'NULL::varchar',
  })
  middleName: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 64,
    default: () => 'NULL::varchar',
  })
  surname: string | null;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    default: () => 'NULL::varchar',
  })
  password: string | null;

  @Column({
    type: 'varchar',
    name: 'phonenumber',
    nullable: true,
    length: 64,
    default: () => 'NULL::varchar',
  })
  phoneNumber: string | null;

  @Column({
    type: 'varchar',
    name: 'jobtitle',
    nullable: true,
    length: 64,
    default: () => 'NULL::varchar',
  })
  jobTitle: string | null;

  @Column({
    type: 'timestamp without time zone',
    name: 'lastlogin',
    nullable: true,
    default: () => 'NULL::timestamp without time zone',
  })
  lastLogin: Date | null;

  @Column({
    type: 'timestamp without time zone',
    name: 'expirydate',
    nullable: true,
    default: () => 'NULL::timestamp without time zone',
  })
  expiryDate: Date | null;

  @Column({
    type: 'timestamp without time zone',
    name: 'deleteddate',
    nullable: true,
    default: () => 'NULL::timestamp without time zone',
  })
  deletedDate: Date | null;

  @Column({ type: 'boolean', nullable: true })
  enabled: boolean;

  /*@Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    default: () => 'NULL::varchar',
  })
  token: string | null;*/

  /**
   * Many To Many Relationship: User and UserRole Entities
   */
  @ManyToMany((type) => UserRole, (userRole) => userRole.users, {
    nullable: false,
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'userrolemembers',
    joinColumn: { referencedColumnName: 'id' },
    inverseJoinColumn: { referencedColumnName: 'id' },
  })
  userRoles: UserRole[];

  /**
   * Many To Many Relationship: User and UserGroup Entities
   */
  @ManyToMany((type) => UserGroup, (userGroup) => userGroup.users, {
    nullable: false,
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'usergroupmembers',
    joinColumn: { referencedColumnName: 'id' },
    inverseJoinColumn: { referencedColumnName: 'id' },
  })
  userGroups: UserGroup[];

  /**
   *
   */
  @OneToMany((type) => RecordRule, (recordRule) => recordRule.form)
  recordRules: RecordRule[];

  // @OneToMany(type => DashboardChart, dashboardChart => dashboardChart.user, {
  //   onDelete: 'CASCADE',
  // })
  // dashboardCharts: DashboardChart[];

  /**
   * Many To Many Relationship: User and DashboardChart Entities
   */
  // @ManyToMany(type => DashboardChart, dashboardChart => dashboardChart.user, {
  //   nullable: false,
  //   eager: true,
  //   cascade: true,
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // @JoinTable({
  //   name: 'userdashboardchartmembers',
  //   joinColumn: { referencedColumnName: 'id' },
  //   inverseJoinColumn: { referencedColumnName: 'id' },
  // })
  // dashboardCharts: DashboardChart[];

  // ! Deprecated
  // @OneToMany(type => Message, message => message.user, {
  //   onDelete: 'CASCADE',
  // })
  // messages: Message[];
  // ! Deprecated

  /**
   * Many To Many Relationship: User and Message Entities
   */
  @ManyToMany((type) => Message, (message) => message.user, {
    nullable: false,
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'usermessagemembers',
  })
  messages: Message[];

  /**
   * One To Many Relationship: User and MessageMetadata Entities
   */
  @OneToMany(
    (type) => MessageMetadata,
    (messageMetadata) => messageMetadata.participant,
    { onDelete: 'CASCADE' },
  )
  messageMetadatas: MessageMetadata[];

  /**
   * One To Many Relationship: User and MessageThread Entities
   */
  @OneToMany(
    (type) => MessageThread,
    (messageThread) => messageThread.createdBy,
    {
      onDelete: 'CASCADE',
    },
  )
  messageThreads: MessageThread[];

  /**
   * One To Many Relationship: User and MessageThreadMetadata Entities
   */
  @OneToMany(
    (type) => MessageThreadMetadata,
    (messageThreadMetadata) => messageThreadMetadata.participant,
    { onDelete: 'CASCADE' },
  )
  messageThreadMetadatas: MessageThreadMetadata[];

  // ! Deprecated
  // @OneToOne(type => UserSettings, userSettings => userSettings.user, {
  //   onDelete: 'CASCADE',
  // })
  // userSettings: UserSettings | null;
  // ! Deprecated

  /**
   * Many To Many Relationship: User and Form Entities
   */
  // @ManyToMany(type => Form, form => form.users, {
  //   nullable: false,
  //   cascade: true,
  //   eager: true,
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // @JoinTable({
  //   name: 'userformmembers',
  //   joinColumn: { referencedColumnName: 'id' },
  //   inverseJoinColumn: { referencedColumnName: 'id' },
  // })
  // forms: Form[];

  /**
   * Many To Many Relationship: User and OrganizationUnit Entities
   */
  @ManyToMany(
    (type) => OrganisationUnit,
    (organisationUnit) => organisationUnit.users,
    {
      nullable: false,
      cascade: true,
      eager: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinTable({
    name: 'organisationunitmembers',
    joinColumn: { name: 'userid', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'organisationunitid',
      referencedColumnName: 'id',
    },
  })
  organisationUnits: OrganisationUnit[];

  /**
   * One To One Relationship: User and UserSettings Entities
   */
  @OneToOne((type) => UserSettings, (userSettings) => userSettings.user, {
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ referencedColumnName: 'id' })
  userSettings: UserSettings;

  @OneToMany(() => Dashboard, (dashboard: Dashboard) => dashboard.user)
  dashboards: Dashboard[];

  @OneToMany(
    () => Visualization,
    (visualization: Visualization) => visualization.user,
  )
  visualizations: Visualization[];

  /*public static async authenticateUser(user: {
    username: string;
    password: string;
  }): Promise<User> {
    return this.authenticateUserByToken(
      User.getBase64(user.username, user.password),
    );
  }*/

  // public static async authenticateUserByToken(token: string): Promise<User> {
  //   const buff = new Buffer(token, 'base64');
  //   const text = buff.toString('ascii');
  //   let u: User;
  //   u = await User.findOne({
  //     where: { token },
  //   });
  //   if (u) {
  //     delete u.token;
  //     return u;
  //   }
  // }
  public static async authenticateUser(username, password): Promise<User> {
    const user: User = await User.findOne({
      where: { username },
    });
    if (user && (await passwordCompare(password, user.password))) {
      delete user.password;
      return user;
    } else {
      return null;
    }
  }

  @BeforeInsert()
  async encrypt() {
    this.password = await passwordHash(this.password);
    this.uid = generateUid();
  }
  @BeforeUpdate()
  async encryptOnUpdate() {
    if (this.password) {
      this.password = await passwordHash(this.password);
    }
  }

  // public static getBase64(username, password) {
  //   return Buffer.from(username + ':' + password).toString('base64');
  // }

  // ToDo: BEGIN: Improve Approach
  // @OneToMany(() => Report, (report: Report) => report.user, {
  //   onDelete: 'CASCADE',
  // })
  // report: Report[];
  // ToDo: END: Improve Approach

  @OneToOne(
    (type) => TrainingSessionAccess,
    (sessionaccess) => sessionaccess.user,
  )
  @JoinColumn({ name: 'sessionaccessid', referencedColumnName: 'id' })
  sessionaccess: TrainingSessionAccess;
}
