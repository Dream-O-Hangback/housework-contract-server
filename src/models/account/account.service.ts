import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import Account from '../account/entities';

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
    getItem({ id }) {
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
    updateItemActive({ id }) {
        return this.accountRepository.update({ id }, { active: true });
    }
    deleteItem({ id }) {
        return this.accountRepository.delete({ id: id, active: true });
    }
}
