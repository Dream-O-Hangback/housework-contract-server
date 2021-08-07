import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';
import { DefaultAward } from '@models/default/entities';

@Entity('award')
export default class Award {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group)
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column({ type: 'varchar', length: 40 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @ManyToOne(type => DefaultAward, { nullable: true })
    @JoinColumn({ name: 'default_award_id' })
    defaultAwardId: number;

    @Column({ default: false, name: 'include_content' })
    includeContent: boolean;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @Column({ default: true })
    active: boolean;
}
