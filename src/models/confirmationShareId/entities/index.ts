import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';

@Entity('confirmation_share_id')
export default class ConfirmationShareId {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @ManyToOne(type => GroupMember, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: GroupMember;

    @Column({ type: 'varchar', length: 30, name: 'share_id' })
    shareId: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
