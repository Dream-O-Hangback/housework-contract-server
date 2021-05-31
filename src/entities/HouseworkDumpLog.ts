import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import GroupMember from './GroupMember';
import Housework from './Housework';

@Entity('housework_dump_log')
export default class HouseworkDumpLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => GroupMember, groupMember => groupMember.id)
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: string;

    @OneToOne(type => Housework, housework => housework.id)
    @JoinColumn({ name: 'housework_id' })
    houseworkId: string;

    @Column({ type: 'varchar', length: 36, name: 'target_id' })
    targetId: string;

    @Column({ type: 'varchar', length: 20 })
    type: string;

    @Column({ type: 'varchar', length: 36, name: 'award_penalty_id' })
    awardPenaltyId: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
