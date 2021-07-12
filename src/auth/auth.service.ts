import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountService } from '../models/account/account.service';

@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService,
    ) {}

    async validateAccount({ id: email, password }) {
        const account = await this.accountService.getActiveItemByEmail({ email });
        if (account && (await bcrypt.compare(password, account.password))) {
            const { id } = account;
            return { id };
        }
        return null;
    }

    async login({ id }) {
        const payload = { id };
        return { accessToken: this.jwtService.sign(payload) };
    }
}
