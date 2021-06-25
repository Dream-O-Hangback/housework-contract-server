import {
    Body,
    Controller,
    Post,
    HttpException,
    HttpStatus,
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
        try {
            if (!accountDto.password) {
                throw new HttpException({
                    success: false,
                    message: 'ERR_INVALID_PARAM',
                }, HttpStatus.BAD_REQUEST);
            }

            await this.authService.save(accountDto);
            
            return {
                success: true,
                message: 'SUCCESS',
            };
        } catch (err) {
            console.log(err);

            throw new HttpException({
                success: false,
                message: 'ERR_INTERVER_SERVER',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
