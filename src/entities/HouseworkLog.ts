import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from './Group';
import GroupMember from './GroupMember';
import Housework from './Housework';

@Entity('housework_log')
export default class HouseworkLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({ name: 'group_id' })
    groupId: string;

    @ManyToOne(type => GroupMember, groupMember => groupMember.id)
    @JoinColumn({ name: 'worker_id' })
    workerId: string;

    @ManyToOne(type => Housework, housework => housework.id)
    @JoinColumn({ name: 'housework_id' })
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
