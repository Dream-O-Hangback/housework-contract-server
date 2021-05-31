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

@Entity('defualt_award')
export class DefaultAward extends DefaultContent {
    @Column({ type: 'varchar', length: 30 })
    type: string;
}

@Entity('default_penalty')
export class DefaultPenalty extends DefaultContent {
    @Column({ type: 'varchar', length: 30 })
    type: string;
}

