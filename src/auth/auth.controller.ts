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
import { AccountService } from '../models/account/account.service';
import { CertificationCodeService } from '../models/certificationCode/certificationCode.service';
import { RefreshTokenService } from '../models/refreshToken/refreshToken.service';
import { MailService } from '../mails/mails.service';

@Controller('auth')
export class AuthController {
    constructor(
        private accountService: AccountService,
        private certificationCodeService: CertificationCodeService,
        private refreshTokenService: RefreshTokenService,
        private mailService: MailService
    ) {
        this.accountService = accountService;
        this.certificationCodeService = certificationCodeService;
        this.refreshTokenService = refreshTokenService;
        this.mailService = mailService;
    }

    @Post('/sign-up')
    async signUp(@Body() accountData: AccountDto): Promise<object> {
        try {
            const { email } = accountData;

            const account = await this.accountService.getActiveItemByEmail({ email });
            if (account) {
                throw new HttpException({
                    message: 'fail',
                    errorCode: 'ERR_ALREADY_EXISTS',
                    description: '...'
                }, HttpStatus.BAD_REQUEST);
            }

            await this.accountService.createItem(accountData);
            
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

            const account = await this.accountService.getItemByEmail({ email });
            if (!account) {
                throw new HttpException({
                    message: 'fail',
                    errorCode: 'ERR_NOT_FOUND',
                    description: '...'
                }, HttpStatus.NOT_FOUND);
            }

            const { id: accountId } = account;
            const certificationCode = await this.certificationCodeService.upsertItem({ accountId, email });
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
            const certificationCode = await this.certificationCodeService.getItem(codeDto);
            if (!certificationCode) {
                throw new HttpException({
                    message: 'fail',
                    errorCode: 'ERR_NOT_FOUND',
                    description: '...'
                }, HttpStatus.NOT_FOUND);
            }

            const { accountId } = certificationCode;

            const account = await this.accountService.updateItemActive({ id: accountId });
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
            const isDuplicated = !!(await this.accountService.getItemByEmail(emailDto));
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
