import { Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from './Group';

@Entity('routine')
export default class Routine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({ name: 'group_id' })
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
