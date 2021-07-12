import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'id' });
    }

    async validate(id: string, password: string) {
        const account = await this.authService.validateAccount({ id, password });
            if (!account) {
            throw new UnauthorizedException();
        }
        return account;
    }
}
