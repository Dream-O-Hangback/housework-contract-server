import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import JwtPayload from './interfaces/jwt-payload.interface';
import { AccountService } from '../models/account/account.service';
import { RefreshTokenService } from '../models/refreshToken/refreshToken.service';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private accountService: AccountService,
        private refreshTokenService: RefreshTokenService,
    ) {}

    async validateAccount(email: string, password: string) {
        const account = await this.accountService.getActiveItemByEmail({ email });
        if (account && (await bcrypt.compare(password, account.password))) {
            const { id } = account;
            return { id };
        }
        return null;
    }

    async issueToken({ id }: JwtPayload) {
        const payload = { id };

        const accessToken = this.jwtService.sign(payload, { issuer: this.configService.get<string>('JWT_ISSUER') });
        const refreshToken = this.jwtService.sign(payload, {
            issuer: this.configService.get<string>('JWT_ISSUER'),
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
        });

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 15);

        await this.refreshTokenService.upsertItem({ accountId: id, token: refreshToken, expireDate: currentDate });

        return { accessToken };
    }

    async logout({ id: accountId }: JwtPayload) {
        await this.refreshTokenService.deleteItem({ accountId });
    }

    verifyAccessToken(accessToken: string) {
        return this.jwtService.verify(accessToken, { issuer: this.configService.get<string>('JWT_ISSUER') });
    }
}
