import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';
import HouseworkLog from '@models/houseworkLog/entities';
import Award from '@models/award/entities';

@Entity('housework_dump_log')
export default class HouseworkDumpLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group)
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @ManyToOne(type => GroupMember)
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: GroupMember;

    @OneToOne(type => HouseworkLog)
    @JoinColumn({ name: 'housework_log_id' })
    houseworkLogId: HouseworkLog;

    @ManyToOne(type => Award)
    @JoinColumn({ name: 'award_id' })
    awardId: Award;

    @Column({ type: 'varchar', length: 36, name: 'target_id' })
    targetId: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
