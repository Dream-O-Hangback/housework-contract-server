import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountService } from '@models/account/account.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    accountService: AccountService;

    constructor(
        configService: ConfigService,
        accountService: AccountService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });

        this.accountService = accountService;
    }

    async validate(payload: any) {
        const { id } = payload;

        const account = await this.accountService.getActiveItem({ id });
        if (!account) {
            throw new UnauthorizedException();
        }

        return { id };
    }
}
