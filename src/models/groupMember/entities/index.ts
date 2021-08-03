import { Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import Group from '@models/group/entities';
import Award from '@models/award/entities';

@Entity('group_member')
export default class GroupMember {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({ name: 'group_id' })
    groupId: string;

    @OneToOne(type => Award, award => award.id)
    @JoinColumn({ name: 'select_award_id' })
    selectAwardId: string;

    @Column({ type: 'varchar', length: 20 })
    nickname: string;

    @Column({ default: false, name: 'is_manager' })
    isManager: boolean;

    @Column({ default: true })
    active: boolean;

    @UpdateDateColumn({ name: 'update_date' })
    updateDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
