import {
    Body,
    Controller,
    Post,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import AccountDto from './dto/account.dto';
import EmailCodeDto from './dto/emailCode.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        this.authService = authService;
    }

    @Post('/sign-up')
    async signUp(@Body() accountDto: AccountDto): Promise<object> {
        try {
            await this.authService.saveAccount(accountDto);
            
            return {
                message: 'success'
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

    @Post('/email-code')
    async sendEmailCode(@Body() emailCodeDto: EmailCodeDto): Promise<object> {
        try {
            const certificationCode = await this.authService.upsertCertificationCode(emailCodeDto);
            if (!certificationCode) {
                throw new HttpException({
                    message: 'fail',
                    errorCode: 'ERR_DOES_NOT_EXIST',
                    description: '...'
                }, HttpStatus.BAD_REQUEST);
            }

            const { code } = certificationCode;
            
            return {
                message: 'success',
                code
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
