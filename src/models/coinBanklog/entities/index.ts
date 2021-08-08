import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';
import HouseworkLog from '@models/houseworkLog/entities';
import Award from '@models/award/entities';

@Entity('coin_bank_log')
export default class CoinBankLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @Column({ name: 'group_id', nullable: true })
    groupId: string;

    @ManyToOne(type => GroupMember, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_member_id' })
    groupMember: GroupMember;

    @Column({ name: 'group_member_id', nullable: true })
    groupMemberId: string;

    @OneToOne(type => HouseworkLog, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'housework_log_id' })
    houseworkLog: HouseworkLog;

    @Column({ name: 'housework_log_id', nullable: true })
    houseworkLogId: string;

    @ManyToOne(type => Award, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'award_id' })
    award: Award;

    @Column({ name: 'award_id', nullable: true })
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
