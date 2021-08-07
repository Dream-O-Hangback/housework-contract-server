import { Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import Account from '@models/account/entities';

@Entity('refresh_token')
export default class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => Account)
    @JoinColumn({ name: 'account_id' })
    accountId: Account;
    
    @Column({ type: 'varchar', length: 255 })
    token: string;

    @Column({ name: 'expire_date' })
    expireDate: Date;

    @UpdateDateColumn({ name: 'update_date' })
    updateDate: Date;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;
}
