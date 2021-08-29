import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import Account from '@models/account/entities';

@Entity('certification_code')
export default class CertificationCode {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Account, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @Column({ name: 'account_id', nullable: true })
    accountId: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    code: string;

    @Column({ name: 'expire_date' })
    expireDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
