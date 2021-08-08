import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';
import HouseworkLog from '@models/houseworkLog/entities';
import Award from '@models/award/entities';

@Entity('coin_bank_log')
export default class CoinBankLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @ManyToOne(type => GroupMember, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: GroupMember;

    @OneToOne(type => HouseworkLog, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'housework_log_id' })
    houseworkLogId: HouseworkLog;

    @ManyToOne(type => Award, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'award_id' })
    awardId: Award;

    @Column({ type: 'varchar', length: 255, name: 'bank_account_number' })
    bankAccountNumber: string;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column()
    price: number;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
