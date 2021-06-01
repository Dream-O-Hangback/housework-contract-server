import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '../group/group.entity';
import GroupMember from '../groupMember/groupMember.entity';

@Entity('confirmation_share_id')
export default class ConfirmationShareId {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({ name: 'group_id' })
    groupId: string;

    @ManyToOne(type => GroupMember, groupMember => groupMember.id)
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: string;

    @Column({ type: 'varchar', length: 30, name: 'share_id' })
    shareId: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
