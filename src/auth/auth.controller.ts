import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import AccountDto from './dto/account.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        this.authService = authService;
    }

    @Post('sign-up')
    async signUp(@Body() accountDto: AccountDto): Promise<object> {
        await this.authService.save(accountDto);
        
        return {
            message: 'success'
        };
    }
}
