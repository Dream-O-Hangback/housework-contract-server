import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import ConfirmationLog from '@models/confirmationLog/entities';

@Entity('confirmation')
export default class Confirmation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @Column({ name: 'group_id', nullable: true })
    groupId: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_id' })
    target: Group;

    @Column({ name: 'group_id', nullable: true })
    targetId: string;

    @Column({ type: 'varchar', length: 30 })
    type: string;
    
    @Column('uuid', { name: 'confirmation_process_id' })
    confirmationProcessId: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
