import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import HouseworkLog from '@models/houseworkLog/entities';
import Award from '@models/award/entities';
import GroupMember from '@models/groupMember/entities';

@Entity('award_log')
export default class AwardLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group)
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @OneToOne(type => HouseworkLog)
    @JoinColumn({ name: 'housework_log_id' })
    houseworkLogId: HouseworkLog;

    @ManyToOne(type => Award)
    @JoinColumn({ name: 'award_id' })
    awardId: Award;

    @ManyToOne(type => GroupMember, { nullable: true })
    @JoinColumn({ name: 'award_worker_id' })
    awardWorkerId: GroupMember;

    @ManyToOne(type => GroupMember, { nullable: true })
    @JoinColumn({ name: 'penalty_worker_id' })
    penaltyWorkerId: GroupMember;
    
    @Column({ type: 'varchar', length: 255 })
    content: string;

    @Column({ default: false, name: 'is_receive' })
    isReceive: boolean;

    @Column({ nullable: true, name: 'receive_date' })
    receiveDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
