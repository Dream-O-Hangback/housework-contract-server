import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';

abstract class DefaultContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column({ type: 'varchar', length: 40 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @Column({ default: true })
    active: boolean;
}

abstract class DefaultTypeContent {
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

@Entity('default_housework')
export class DefaultHousework extends DefaultContent {
}

@Entity('default_award')
export class DefaultAward extends DefaultContent {
}

@Entity('default_alternative_payment_type')
export class DefaultAlternativePaymentType extends DefaultTypeContent {
}

@Entity('default_group_type')
export class DefaultGroupType extends DefaultTypeContent {
}
