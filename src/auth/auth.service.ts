import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountService } from '../models/account/account.service';

@Injectable()
export class AuthService {
    constructor(private accountService: AccountService) {}

    async validateAccount({ id: email, password }) {
        const account = await this.accountService.getActiveItemByEmail({ email });
        if (account && (await bcrypt.compare(account.password, password))) {
            const { password, ...result } = account;
            return result;
        }
        return null;
    }
}
