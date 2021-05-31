import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import Group from './Group';
import Award from './Award';
import Penalty from './Penalty';

@Entity('group_member')
export default class GroupMember {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({ name: 'group_id' })
    groupId: string;

    @OneToOne(type => Award, award => award.id)
    @JoinColumn({ name: 'select_award_id' })
    selectAwardId: string;

    @OneToOne(type => Penalty, penalty => penalty.id)
    @JoinColumn({ name: 'select_penalty_id' })
    selectPernaltyId: string;

    @Column({ type: 'varchar', length: 20 })
    nickname: string;

    @Column({ name: 'is_manager' })
    isManager: boolean;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
