import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from './Group';
import GroupMember from './GroupMember';
import Housework from './Housework';

@Entity('routine_rotation')
export default class RoutineRotation {
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

    @Column({ name: 'cycle' })
    cycle:  number;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
