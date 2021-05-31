import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import GroupMember from './GroupMember';
import AlternativePayment from './AlternativePayment';

@Entity('alternative_payment_log')
export default class AlternativePaymentLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => GroupMember, groupMember => groupMember.id)
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: string;

    @ManyToOne(type => AlternativePayment, alternativePayment => alternativePayment.id)
    @JoinColumn({ name: 'alternative_payment_id' })
    alternativePaymentId: string;

    @Column({ type: 'varchar', length: 36, name: 'target_id' })
    targetId: string;

    @Column({ type: 'varchar', length: 20 })
    type: string;

    @Column({ type: 'varchar', length: 36, name: 'award_penalty_id' })
    awardPenaltyId: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
