import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Rule from '@models/rule/entities';
import GroupMember from '@models/groupMember/entities';

@Entity('rule_log')
export default class RuleLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Rule, rule => rule.id)
    @JoinColumn({ name: 'rule_id' })
    ruleId: string;

    @ManyToOne(type => GroupMember, groupMember => groupMember.id)
    @JoinColumn({ name: 'target_id' })
    targetId: string;

    @Column({ type: 'varchar', length: 36, name: 'accuser_id' })
    accuserId: string;

    @Column({ type: 'varchar', length: 255 })
    reason: string;

    @Column({ default: false, name: 'is_confirm' })
    isConfirm: boolean;

    @Column({ default: false, name: 'is_cancel' })
    isCancel: boolean;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
