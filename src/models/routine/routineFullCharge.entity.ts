import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '../group/group.entity';
import GroupMember from '../groupMember/groupMember.entity';
import Housework from '../housework/housework.entity';

@Entity('routine_full_charge')
export default class RoutineFullCharge {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({ name: 'group_id' })
    groupId: string;

    @ManyToOne(type => GroupMember, groupMember => groupMember.id)
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: string;

    @ManyToOne(type => Housework, housework => housework.id)
    @JoinColumn({ name: 'housework_id' })
    houseworkId: string;

    @Column({ name: 'start_date' })
    startDate: Date;

    @Column({ name: 'end_date' })
    endDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
