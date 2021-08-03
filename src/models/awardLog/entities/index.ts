import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import HouseworkLog from '@models/houseworkLog/entities';
import Award from '@models/award/entities';

@Entity('award_log')
export default class AwardLog {
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

    @Column('uuid', { nullable: true, name: 'award_worker_id' })
    awardWorkerId: string;

    @Column('uuid', { nullable: true, name: 'penalty_worker_id' })
    penaltyWorkerId: string;

    @Column({ type: 'varchar', length: 255 })
    content: string;

    @Column({ default: false, name: 'is_receive' })
    isReceive: boolean;

    @Column({ nullable: true, name: 'receive_date' })
    receiveDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
