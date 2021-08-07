import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Confirmation from '@models/confirmation/entities';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';

@Entity('confirmation_log')
export default class ConfirmationLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Confirmation)
    @JoinColumn({ name: 'confirmation_id' })
    confirmationId: Confirmation;

    @ManyToOne(type => Group)
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @ManyToOne(type => GroupMember)
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: GroupMember;

    @Column({ default: false,  name: 'is_confirm' })
    isConfirm: boolean;

    @Column({ default: false,  name: 'is_refuse' })
    isRefuse: boolean;

    @Column({ nullable: true, type: 'varchar', length: 255,  name: 'refuse_reason' })
    refuseReason: string;

    @Column({ nullable: true,  name: 'confirm_date' })
    confirmDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
