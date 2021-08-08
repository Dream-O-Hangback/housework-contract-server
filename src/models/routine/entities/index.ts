import { Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import GroupMember from '@models/groupMember/entities';
import Housework from '@models/housework/entities';

@Entity('routine')
export class Routine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @Column({ name: 'group_id', nullable: true })
    groupId: string;

    @Column({ type: 'tinyint', name: 'start_day' })
    startDay: number;

    @Column({ type: 'varchar', length: 40, name: 'share_method' })
    shareMethod: string;

    @Column({ nullable: true, type: 'tinyint', name: 'start_day_last_value' })
    startDayLastValue: number;

    @Column({ nullable: true, type: 'varchar', length: 40, name: 'share_method_last_value' })
    shareMethodLastValue: string;

    @UpdateDateColumn({ name: 'update_date' })
    updateDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}

@Entity('routine_full_charge')
export class RoutineFullCharge {
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

    @ManyToOne(type => Housework, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'housework_id' })
    housework: Housework;

    @Column({ name: 'housework_id', nullable: true })
    houseworkId: string;

    @Column({ name: 'start_date' })
    startDate: Date;

    @Column({ name: 'end_date' })
    endDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}

@Entity('routine_rotation')
export class RoutineRotation {
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

    @ManyToOne(type => Housework, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'housework_id' })
    housework: Housework;

    @Column({ name: 'housework_id', nullable: true })
    houseworkId: string;

    @Column({ name: 'cycle' })
    cycle:  number;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}

