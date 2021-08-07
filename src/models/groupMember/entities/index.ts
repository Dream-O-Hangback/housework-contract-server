import { Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import Account from '@models/account/entities';
import Group from '@models/group/entities';
import Award from '@models/award/entities';

@Entity('group_member')
export default class GroupMember {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Account, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'account_id' })
    accountId: Account;

    @ManyToOne(type => Group, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @OneToOne(type => Award, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'select_award_id' })
    selectAwardId: Award;

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
