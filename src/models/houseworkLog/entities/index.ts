import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';
import Housework from '@models/housework/entities';

@Entity('housework_log')
export default class HouseworkLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @Column({ name: 'group_id', nullable: true })
    groupId: string;

    @ManyToOne(type => GroupMember, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'worker_id' })
    worker: GroupMember;

    @Column({ name: 'worker_id', nullable: true })
    workerId: string;

    @ManyToOne(type => Housework, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'housework_id' })
    housework: Housework;

    @Column({ name: 'housework_id', nullable: true })
    houseworkId: string;

    @Column({ name: 'is_complete' })
    isComplete: boolean;

    @Column({ name: 'is_fail' })
    isFail: boolean;

    @Column({ name: 'is_skip' })
    isSkip: boolean;

    @Column({ name: 'target_date' })
    targetDate: Date;

    @Column({ name: 'complete_time' })
    completeTime: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
