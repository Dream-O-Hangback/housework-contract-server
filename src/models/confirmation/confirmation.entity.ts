import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('confirmation')
export default class Confirmation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 30 })
    type: string;
    
    @Column('uuid', { name: 'confirmation_process_id' })
    confirmationProcessId: string;

    @Column({ nullable: true,  name: 'confirm_date' })
    confirmDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
