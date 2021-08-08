import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';

@Entity('confirmation_share_id')
export default class ConfirmationShareId {
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

    @Column({ type: 'varchar', length: 30, name: 'share_id' })
    shareId: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
