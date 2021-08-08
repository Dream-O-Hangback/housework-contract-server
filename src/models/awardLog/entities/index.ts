import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import HouseworkLog from '@models/houseworkLog/entities';
import Award from '@models/award/entities';
import GroupMember from '@models/groupMember/entities';

@Entity('award_log')
export default class AwardLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @Column({ name: 'group_id', nullable: true })
    groupId: string;

    @OneToOne(type => HouseworkLog, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'housework_log_id' })
    houseworkLog: HouseworkLog;

    @Column({ name: 'housework_log_id', nullable: true })
    houseworkLogId: string;

    @ManyToOne(type => Award, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'award_id' })
    award: Award;

    @Column({ name: 'award_id', nullable: true })
    awardId: string;

    @ManyToOne(type => GroupMember, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'award_worker_id' })
    awardWorker: GroupMember;

    @Column({ name: 'award_worker_id', nullable: true })
    awardWorkerId: string;

    @ManyToOne(type => GroupMember, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'penalty_worker_id' })
    penaltyWorker: GroupMember;

    @Column({ name: 'penalty_worker_id', nullable: true })
    penaltyWorkerId: string;
    
    @Column({ type: 'varchar', length: 255 })
    content: string;

    @Column({ default: false, name: 'is_receive' })
    isReceive: boolean;

    @Column({ nullable: true, name: 'receive_date' })
    receiveDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
