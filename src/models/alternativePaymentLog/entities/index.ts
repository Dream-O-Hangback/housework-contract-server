import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import HouseworkLog from '@models/houseworkLog/entities';
import Award from '@models/award/entities';
import AlternativePayment from '@models/alternativePayment/entities';
import GroupMember from '@models/groupMember/entities';

@Entity('alternative_payment_log')
export default class AlternativePaymentLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group)
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @OneToOne(type => HouseworkLog)
    @JoinColumn({ name: 'housework_log_id' })
    houseworkLogId: HouseworkLog;

    @ManyToOne(type => Award)
    @JoinColumn({ name: 'award_id' })
    awardId: Award;

    @ManyToOne(type => AlternativePayment)
    @JoinColumn({ name: 'alternative_payment_id' })
    alternativePaymentId: AlternativePayment;

    @ManyToOne(type => GroupMember, { nullable: true })
    @JoinColumn({ name: 'award_worker_id' })
    awardWorkerId: GroupMember;

    @ManyToOne(type => GroupMember, { nullable: true })
    @JoinColumn({ name: 'penalty_worker_id' })
    penaltyWorkerId: GroupMember;

    @Column({ default: false, name: 'is_receive' })
    isReceive: boolean;

    @Column({ nullable: true, name: 'receive_date' })
    receiveDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
