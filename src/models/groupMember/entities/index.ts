import { Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, OneToOne, RelationId } from 'typeorm';
import Account from '@models/account/entities';
import Group from '@models/group/entities';
import Award from '@models/award/entities';

@Entity('group_member')
export default class GroupMember {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Account, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @Column({ name: 'account_id', nullable: true })
    accountId: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @Column({ name: 'group_id', nullable: true })
    groupId: string;

    @OneToOne(type => Award, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'select_award_id' })
    selectAward: Award;

    @Column({ name: 'select_award_id', nullable: true })
    selectAwardId: string;

    @Column({ type: 'varchar', length: 20 })
    nickname: string;

    @Column({ default: false, name: 'is_manager' })
    isManager: boolean;

    @Column({ default: true })
    active: boolean;

    @UpdateDateColumn({ name: 'update_date' })
    updateDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
