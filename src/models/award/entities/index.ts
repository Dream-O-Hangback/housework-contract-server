import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import { DefaultAward } from '@models/default/entities';

@Entity('award')
export default class Award {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @Column({ name: 'group_id', nullable: true })
    groupId: string;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column({ type: 'varchar', length: 40 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @ManyToOne(type => DefaultAward, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'default_award_id' })
    defaultAward: number;

    @Column({ name: 'default_award_id', nullable: true })
    defaultAwardId: string;

    @Column({ default: false, name: 'include_content' })
    includeContent: boolean;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @Column({ default: true })
    active: boolean;
}
