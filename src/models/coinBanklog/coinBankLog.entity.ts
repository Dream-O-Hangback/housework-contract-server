import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '../group/group.entity';
import GroupMember from '../groupMember/groupMember.entity';

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

    @Column({ name: 'bank_account_number' })
    bankAccountNumber: number;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column()
    price: number;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
