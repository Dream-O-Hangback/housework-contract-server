import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import HouseworkLog from '@models/houseworkLog/entities';
import Award from '@models/award/entities';
import AlternativePayment from '@models/alternativePayment/entities';

@Entity('alternative_payment_log')
export default class AlternativePaymentLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({ name: 'group_id' })
    groupId: string;

    @OneToOne(type => HouseworkLog, houseworkLog => houseworkLog.id)
    @JoinColumn({ name: 'housework_log_id' })
    houseworkLogId: string;

    @ManyToOne(type => Award, award => award.id)
    @JoinColumn({ name: 'award_id' })
    awardId: string;

    @ManyToOne(type => AlternativePayment, alternativePayment => alternativePayment.id)
    @JoinColumn({ name: 'alternative_payment_id' })
    alternativePaymentId: string;

    @Column('uuid', { name: 'award_worker_id', nullable: true })
    awardWorkerId: string;

    @Column('uuid', { name: 'penalty_worker_id', nullable: true })
    penaltyWorkerId: string;

    @Column({ default: false, name: 'is_receive' })
    isReceive: boolean;

    @Column({ nullable: true, name: 'receive_date' })
    receiveDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
