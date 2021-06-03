import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('account')
export default class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    password: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 20 })
    nickname: string;

    @Column({ type: 'text', nullable: true, name: 'profile_image_url' })
    profileImageUrl: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profile: string;

    @Column({ type: 'varchar', length: 15 })
    type: string;

    @Column({ name: 'notification_open' })
    notificationOpen: boolean;

    @Column({ name: 'notification_open_date' })
    notificationOpenDate: Date;

    @Column({ name: 'email_open' })
    emailOpen: boolean;
    
    @Column({ name: 'email_open_date' })
    emailOpenDate: Date;

    @UpdateDateColumn({ name: 'last_update_date' })
    lastUpdateDate: Date;

    @Column({ type: 'varbinary', length: 16, name: 'last_update_ip' })
    lastUpdateIp: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @Column({ type: 'varbinary', length: 16, name: 'create_ip' })
    createIp: string;

    @Column({ default: true })
    active: boolean;
}
