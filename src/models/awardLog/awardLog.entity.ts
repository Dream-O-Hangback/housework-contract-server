import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '../group/group.entity';
import HouseworkLog from '../houseworkLog/houseworkLog.entity';
import Award from '../award/award.entity';

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

    @Column('uuid', { name: 'award_worker_id', nullable: true })
    awardWorkerId: string;

    @Column('uuid', { name: 'penalty_worker_id', nullable: true })
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
