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
                    message: 'fail',
                    errorCode: 'ERR_INVALID_PARAM',
                    description: '...'
                }, HttpStatus.BAD_REQUEST);
            }

            await this.authService.save(accountDto);
            
            return {
                message: 'success',
            };
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException({
                message: 'fail',
                errorCode: 'ERR_INTERVER_SERVER',
                description: '...'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
