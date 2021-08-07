import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Group from '@models/group/entities';

@Entity('alternative_payment')
export default class AlternativePayment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group)
    @JoinColumn({ name: 'group_id' })
    groupId: Group;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    reason: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
