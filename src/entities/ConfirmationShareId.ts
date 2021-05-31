import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, JoinColumn, OneToOne, JoinTable } from 'typeorm';
import Confirmation from './Confirmation';

@Entity('confirmation_share_id')
export default class ConfirmationShareId {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 30, name: 'share_id' })
    shareId: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @OneToOne(type => Confirmation)
    confirmationId: Confirmation;
}
