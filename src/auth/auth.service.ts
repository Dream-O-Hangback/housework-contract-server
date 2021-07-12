import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountService } from '../models/account/account.service';
import { RefreshTokenService } from '../models/refreshToken/refreshToken.service';

@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private refreshTokenService: RefreshTokenService,
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

        const token = this.jwtService.sign(payload, {

        });
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 15);

        await this.refreshTokenService.upsertItem({ accountId: id, token, expireDate: currentDate });

        return { accessToken: this.jwtService.sign(payload) };
    }

    async logout({ id: accountId }) {
        await this.refreshTokenService.deleteItem({ accountId });
    }
}
