import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';
import Housework from '@models/housework/entities';

@Entity('housework_log')
export default class HouseworkLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group)
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @ManyToOne(type => GroupMember)
    @JoinColumn({ name: 'worker_id' })
    workerId: GroupMember;

    @ManyToOne(type => Housework)
    @JoinColumn({ name: 'housework_id' })
    houseworkId: Housework;

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
