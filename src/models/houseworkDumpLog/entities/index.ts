import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';
import HouseworkLog from '@models/houseworkLog/entities';
import Award from '@models/award/entities';

@Entity('housework_dump_log')
export default class HouseworkDumpLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({ name: 'group_id' })
    groupId: string;

    @ManyToOne(type => GroupMember, groupMember => groupMember.id)
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: string;

    @OneToOne(type => HouseworkLog, houseworkLog => houseworkLog.id)
    @JoinColumn({ name: 'housework_log_id' })
    houseworkLogId: string;

    @ManyToOne(type => Award, award => award.id)
    @JoinColumn({ name: 'award_id' })
    awardId: string;

    @Column({ type: 'varchar', length: 36, name: 'target_id' })
    targetId: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
