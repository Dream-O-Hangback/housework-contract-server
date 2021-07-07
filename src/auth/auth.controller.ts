import {
    Body,
    Controller,
    Post,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import AccountDto from './dto/account.dto';
import EmailDto from './dto/email.dto';
import CodeDto from './dto/code.dto';
import { AuthService } from './auth.service';
import { MailService } from '../mails/mails.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private mailService: MailService
    ) {
        this.authService = authService;
        this.mailService = mailService;
    }

    @Post('/sign-up')
    async signUp(@Body() accountData: AccountDto): Promise<object> {
        try {
            const { email } = accountData;

            const account = await this.authService.getActiveAccountByEmail({ email });
            if (account) {
                throw new HttpException({
                    message: 'fail',
                    errorCode: 'ERR_ALREADY_EXISTS',
                    description: '...'
                }, HttpStatus.BAD_REQUEST);
            }

            await this.authService.createAccount(accountData);
            
            return { message: 'success' };
        } catch (err) {
            console.log(err);
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
    async sendEmailCode(@Body() emailData: EmailDto): Promise<object> {
        try {
            const { email } = emailData;

            const account = await this.authService.getAccountByEmail({ email });
            if (!account) {
                throw new HttpException({
                    message: 'fail',
                    errorCode: 'ERR_NOT_FOUND',
                    description: '...'
                }, HttpStatus.NOT_FOUND);
            }

            const { id: accountId } = account;
            const certificationCode = await this.authService.upsertCertificationCode({ accountId, email });
            const { code, createDate } = certificationCode;

            this.mailService.sendEmailCodeEmail({ email: emailData.email, code, generateDate: createDate }).catch((err) => console.log(err));
            
            return { message: 'success' };
        } catch (err) {
            console.log(err);
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

    @Post('/email-verify')
    async verifyEmailCode(@Body() codeDto: CodeDto): Promise<object> {
        try {
            const certificationCode = await this.authService.getCeritificationCode(codeDto);
            if (!certificationCode) {
                throw new HttpException({
                    message: 'fail',
                    errorCode: 'ERR_NOT_FOUND',
                    description: '...'
                }, HttpStatus.NOT_FOUND);
            }

            const { accountId } = certificationCode;

            const account = await this.authService.updateAccountActive({ id: accountId });
            if (account.affected === 0) {
                throw new HttpException({
                    message: 'fail',
                    errorCode: 'ERR_NOT_FOUND',
                    description: '...'
                }, HttpStatus.NOT_FOUND);
            }

            return { message: 'success' }; 
        } catch (err) {
            console.log(err);
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

    @Post('/email/exists')
    async CheckEmailDuplication(@Body() emailDto: EmailDto): Promise<object> {
        try {
            const isDuplicated = !!(await this.authService.getAccountByEmail(emailDto));
            if (isDuplicated) {
                throw new HttpException({
                    message: 'fail',
                    errorCode: 'ERR_ALREADY_EXISTS',
                    description: '...'
                }, HttpStatus.CONFLICT);
            }

            return { message: 'success' }; 
        } catch (err) {
            console.log(err);
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
