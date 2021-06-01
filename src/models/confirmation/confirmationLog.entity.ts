import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Confirmation from './confirmation.entity';
import GroupMember from '../groupMember/groupMember.entity';

@Entity('confirmation_log')
export default class ConfirmationLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Confirmation, confirmation => confirmation.id)
    @JoinColumn({ name: 'confirmation_id' })
    confirmationId: string;    

    @ManyToOne(type => GroupMember, groupMember => groupMember.id)
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: string;

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
