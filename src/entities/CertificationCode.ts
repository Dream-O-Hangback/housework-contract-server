import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Account from './Account';

@Entity('certification_code')
export default class CertificationCode {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Account, account => account.id)
    @JoinColumn({ name: 'account_id' })
    accountId: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    key: string;

    @Column({ name: 'expire_date' })
    expireDate: Date;
}
