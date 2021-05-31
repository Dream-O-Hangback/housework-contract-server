import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import GroupMember from './GroupMember';

@Entity('confirmation')
export default class Confirmation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => GroupMember, groupMember => groupMember.id)
    @JoinColumn({ name: 'group_member_id' })
    groupMemberId: string;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column({ default: false })
    isConfirm: boolean;

    @Column({ default: false })
    isRefuse: boolean;

    @Column({ nullable: true, type: 'varchar', length: 255 })
    refuseReason: string
    
    @Column({ nullable: true,  name: 'confirm_date' })
    confirmDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
