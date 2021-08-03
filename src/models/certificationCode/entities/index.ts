import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import Account from '@models/account/entities';

@Entity('certification_code')
export default class CertificationCode {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'account_id', nullable: true })
    accountId: string;

    @ManyToOne(type => Account)
    @JoinColumn()
    account: Account;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    code: string;

    @Column({ name: 'expire_date' })
    expireDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
