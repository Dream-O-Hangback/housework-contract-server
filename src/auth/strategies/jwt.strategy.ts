import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import SignInDto from '../dto/signIn.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(signInDto: SignInDto): Promise<any> {
        const account = await this.authService.validateAccount(signInDto);
            if (!account) {
            throw new UnauthorizedException();
        }
        return account;
    }
}