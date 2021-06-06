import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';

abstract class DefaultContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 40 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @Column({ default: true })
    active: boolean;
}

@Entity('default_housework')
export class DefaultHousework extends DefaultContent {
}

@Entity('default_award')
export class DefaultAward extends DefaultContent {
    @Column({ type: 'varchar', length: 30 })
    type: string;
}

@Entity('default_group_type')
export class DefaultGroupType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 40 })
    title: string;

    @Column({ type: 'varchar', length: 30, name: 'display_title' })
    displayTitle: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @Column({ default: true })
    active: boolean;
}
