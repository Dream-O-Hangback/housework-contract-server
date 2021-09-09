import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Rule from '@models/rule/entities';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';

@Entity('rule_log')
export default class RuleLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @Column({ name: 'group_id', nullable: true })
    groupId: string;

    @ManyToOne(type => Rule, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'rule_id' })
    rule: Rule;

    @Column({ name: 'rule_id', nullable: true })
    ruleId: string;

    @ManyToOne(type => GroupMember, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'target_id' })
    target: GroupMember;

    @Column({ name: 'target_id', nullable: true })
    targetId: string;
    
    @ManyToOne(type => GroupMember, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'accuser_id' })
    accuser: GroupMember;

    @Column({ name: 'accuser_id', nullable: true })
    accuserId: string;

    @Column({ type: 'varchar', length: 255 })
    reason: string;

    @Column({ default: false, name: 'is_confirm' })
    isConfirm: boolean;

    @Column({ default: false, name: 'is_cancel' })
    isCancel: boolean;

    @Column({ nullable: true,  name: 'confirm_date' })
    confirmDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
