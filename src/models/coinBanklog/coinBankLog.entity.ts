import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '../group/group.entity';
import GroupMember from '../groupMember/groupMember.entity';
import HouseworkLog from '../houseworkLog/houseworkLog.entity';
import Award from '../award/award.entity';

@Entity('coin_bank_log')
export default class CoinBankLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({ name: 'group_id' })
    groupId: string;

    @ManyToOne(type => GroupMember, groupMember => groupMember.id)
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: string;

    @OneToOne(type => HouseworkLog, houseworkLog => houseworkLog.id)
    @JoinColumn({ name: 'housework_log_id' })
    houseworkLogId: string;

    @ManyToOne(type => Award, award => award.id)
    @JoinColumn({ name: 'award_id' })
    awardId: string;

    @Column({ type: 'varchar', length: 255, name: 'bank_account_number' })
    bankAccountNumber: string;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column()
    price: number;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
