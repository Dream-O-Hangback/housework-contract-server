import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import Account from './entities';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account) private accountRepository: Repository<Account>,
    ) {
        this.accountRepository = accountRepository;
    }
    async createItem({
        email,
        name,
        password,
        nickname,
        profile,
        type,
        notificationOpen,
        emailOpen,
    }) {
        const hashedPassword = await bcrypt.hash(password, (await bcrypt.genSalt()));
        const currentDate = new Date();

        return this.accountRepository.save({
            email,
            name,
            password: hashedPassword,
            nickname,
            profile,
            type,
            notificationOpen,
            emailOpen,
            notificationOpenDate: currentDate,
            emailOpenDate: currentDate,
            lastUpdateDate: currentDate,
        });
    }
    async getList({ searchWord, skip, take }) {
        const [list, count] = await this.accountRepository.findAndCount({
            where: [
                { email: Like(`%${searchWord}%`), active: true },
                { name: Like(`%${searchWord}%`), active: true },
                { nickname: Like(`%${searchWord}%`), active: true },
            ],
            select: ['id', 'email', 'name', 'nickname', 'profileImageUrl', 'profile'],
            skip,
            take,
        });

        return { list, count };
    }
    getActiveItem({ id }) {
        return this.accountRepository.findOne({ id, active: true });
    }
    getActiveItemByEmail({ email }) {
        return this.accountRepository.findOne({ email, active: true });
    }
    getItemByEmail({ email }) {
        return this.accountRepository.findOne({ email });
    }
    getItemByNickname({ nickname }) {
        return this.accountRepository.findOne({ nickname });
    }
    getInfo({ id }) {
        return this.accountRepository.findOne(
            { id, active: true },
            { select: ['id', 'email', 'name', 'nickname', 'profileImageUrl', 'profile', 'type', 'notificationOpen', 'notificationOpenDate', 'emailOpen', 'emailOpenDate', 'createDate'] },
        );
    }
    updateItemActive({ id }) {
        return this.accountRepository.update({ id }, { active: true, lastUpdateDate: new Date() });
    }
    updateItemNickname({ id, nickname }) {
        return this.accountRepository.update({ id }, { nickname, lastUpdateDate: new Date() });
    }
    updateItemProfile({ id, profile }) {
        return this.accountRepository.update({ id }, { profile, lastUpdateDate: new Date() });
    }
    updateItemProfileImage({ id, profileImageUrl }) {
        return this.accountRepository.update({ id }, { profileImageUrl, lastUpdateDate: new Date() });
    }
    deleteItemProfileImage({ id }) {
        return this.accountRepository.update({ id }, { profileImageUrl: null, lastUpdateDate: new Date() });
    }
    async updateItemPassword({ id, password }) {
        const hashedPassword = await bcrypt.hash(password, (await bcrypt.genSalt()));

        return this.accountRepository.update({ id }, { password: hashedPassword, lastUpdateDate: new Date() });
    }
    updateItemNotificationOpen({ id, value }) {
        const currentDate = new Date();

        return this.accountRepository.update(
            { id },
            { notificationOpen: value, notificationOpenDate: currentDate, lastUpdateDate: currentDate },
        );
    }
    updateItemEmailOpen({ id, value }) {
        const currentDate = new Date();

        return this.accountRepository.update(
            { id },
            { emailOpen: value, emailOpenDate: currentDate, lastUpdateDate: currentDate },
        );
    }
    updateItemEmailOpenByEmail({ email, value }) {
        const currentDate = new Date();

        return this.accountRepository.update(
            { email },
            { emailOpen: value, emailOpenDate: currentDate, lastUpdateDate: currentDate },
        );
    }
    deleteItem({ id }) {
        return this.accountRepository.delete({ id, active: true });
    }
}
