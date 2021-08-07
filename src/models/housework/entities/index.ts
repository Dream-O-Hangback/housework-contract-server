import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';

@Entity('housework')
export default class Housework {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group)
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @Column({ type: 'varchar', length: 40 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'tinyint', name: 'deploy_count' })
    deployCount: number;

    @Column({ type: 'int' })
    frequency: string;

    @Column({ name: 'expire_date' })
    expireDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @Column({ default: true })
    active: boolean;
}
