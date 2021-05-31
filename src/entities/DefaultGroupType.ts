import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('confirmation')
export default class Confirmation {
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
