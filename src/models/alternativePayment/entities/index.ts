import { Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';

@Entity('alternative_payment')
export default class AlternativePayment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @Column({ name: 'group_id', nullable: true })
    groupId: string;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    reason: string;

    @UpdateDateColumn({ name: 'update_date' })
    updateDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @Column({ default: true })
    active: boolean;
}
