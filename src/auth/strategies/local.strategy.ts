
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'id' });
    }

    async validate(id: string, password: string) {
        const account = await this.authService.validateAccount(id, password);

        if (!account) {
            throw new UnauthorizedException();
        } else if (account === true) {
            return null;
        }

        return account;
    }
}
