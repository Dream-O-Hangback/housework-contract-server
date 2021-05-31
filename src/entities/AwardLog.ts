import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from './Group';
import GroupMember from './GroupMember';
import Housework from './Housework';
import Award from './Award';

@Entity('award_log')
export default class AwardLog {
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

    @ManyToOne(type => Award, award => award.id)
    @JoinColumn({ name: 'award_id' })
    awardId: string;

    @Column({ default: false, name: 'is_receive' })
    isReceive: boolean;

    @Column({ nullable: true, name: 'receive_date' })
    receiveDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
