import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from './Group';

@Entity('penalty')
export default class Penalty {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({ name: 'group_id' })
    groupId: string;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column({ type: 'varchar', length: 40 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ nullable: true, type: 'bigint', name: 'default_penalty_id' })
    defaultPenaltyId: number;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @Column({ default: true })
    active: boolean;

    @Column({ type: 'varchar', length: 20, name: 'input_title' })
    inputTitle: string;

    @Column({ type: 'varchar', length: 255, name: 'input_content' })
    inputContent: string;
}
